/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

const makeBoard = require("./makeBoard");

// import models so we can interact with the database
const User = require("./models/user");
const Game = require("./models/game");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();
router.get("/user", (req, res) => {
  const id = req.query.userId;
  User.findById(id).then((user) => res.send(user));
});
//initialize socket
const socketManager = require("./server-socket");
//const { make } = require("nicknamecore-js/fn/object");

const locations = [
  { x: 0, y: 0 },
  { x: 0, y: 8 },
  { x: 8, y: 8 },
  { x: 8, y: 0 },
];

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  } else {
    res.send(req.user);
  }
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.post("/newGame", auth.ensureLoggedIn, (req, res) => {
  const mirrors = makeBoard.createMirrors(req.body.mirrors);
  let board = makeBoard.checkClass(mirrors);
  board = makeBoard.updateBoard(board, "Player0", locations[0], { x: 0, y: -1 });
  const name = req.user.name;
  console.log("api user: ");
  console.log(req.user);
  const newGame = new Game({
    roomName: req.body.roomName,
    roomCode: req.body.roomCode,
    board: board,
    isActive: false,
    mirrors: req.body.mirrors, // number of mirrors
    players: [{ name: req.user.name, id: req.user._id, score: 0, location: locations[0] }],
    currentTurn: 0,
  });

  newGame
    .save()
    .then((game) => res.send(game))
    .catch(console.log);
});

router.get("/checkGame", auth.ensureLoggedIn, (req, res) => {
  Game.findById(req.query._id).then((game) => res.send(game));
});

router.post("/joinGame", auth.ensureLoggedIn, (req, res) => {
  Game.findOne({ roomCode: req.body.code })
    .then((game) => {
      if (game) {
        const playerNum = game.players.length;
        const p = game.players.filter((l) => l.id == req.user._id);
        if (p.length !== 0) {
          res.send(game);
        } else {
          const location = locations[playerNum];
          const name = req.user.name;

          game.players = [
            ...game.players,
            {
              name: req.user.name,
              id: req.user._id,
              score: 0,
              location: location,
            },
          ];
          let direction;
          if (location.x < 4) {
            direction = { x: 0, y: -1 };
          } else {
            direction = { x: 0, y: 1 };
          }
          game.board = makeBoard.updateBoard(
            game.board,
            "Player" + playerNum.toString(),
            location,
            direction
          );
          game
            .save()
            .then((game) => {
              game.players.map((player) => {
                if (player.id != req.user._id) {
                  socketManager.getSocketFromUserID(player.id).emit("updateBoard", game);
                }
              });
              res.send(game);
            })
            .catch(console.log);
        }
      } else {
        res.send({});
      }
    })
    .catch(console.log);
});

router.post("/startGame", auth.ensureLoggedIn, (req, res) => {
  Game.findById(req.body.id)
    .then((game) => {
      if (game) {
        game.isActive = true;
        game.currentTurn = Math.floor(Math.random() * game.players.length);
        game.save().then((data) => {
          data.players.map((player) => {
            socketManager.getSocketFromUserID(player.id).emit("updateBoard", data);
          });
          res.send(data);
        });
      } else {
        res.send({});
      }
    })
    .catch((err) => res.send(err));
});

router.post("/laser", auth.ensureLoggedIn, (req, res) => {
  Game.findOne({ isActive: true, _id: req.body.id })
    .then((game) => {
      if (game) {
        let player = game.players.filter((player) => player.id === req.user._id)[0];
        if (player !== game.players[game.currentTurn]) {
          res.send({});
        }
        let beam = makeBoard.fire(player.location, req.body.dir, game.board);
        let emit = () => {
          game.players.map((player) => {
            socketManager.getSocketFromUserID(player.id).emit("updateBoard", game);
          });
        };
        game.board = makeBoard.setLight(game.board, beam[0]);
        game.board[player.location.x][player.location.y].inputDirection = req.body.dir;
        emit();
        game.currentTurn = (game.currentTurn + 1) % game.players.length;
        let playersHit = game.players.filter(
          (player) => player.location.x === beam[1].x && player.location.y === beam[1].y
        );
        if (playersHit.length > 0) {
          let att = game.board[playersHit[0].location.x][playersHit[0].location.y].inputDirection;
          let loc = locations[game.players.indexOf(playersHit[0])];
          game.board = makeBoard.updateBoard(
            game.board,
            "Player" + String(game.players.indexOf(playersHit[0])),
            loc,
            att
          );
          game.board = makeBoard.updateBoard(game.board, "", beam[1], att);
          game.players[game.players.indexOf(playersHit[0])].location = loc;
        }
        game.save().then((data) => {
          data.players.map((player) => {
            socketManager.getSocketFromUserID(player.id).emit("updateBoard", data);
          });
        });
      }
      game.board = makeBoard.resetLight(game.board);
      setTimeout(emit, 500);
      //Placeholder
      game.save().then((game) => res.send(game));
    })
    .catch(console.log);
});

router.post("/movePlayer", auth.ensureLoggedIn, (req, res) => {
  Game.findOne({ roomCode: req.body.roomCode })
    .then((game) => {
      if (game) {
        if (!game.isActive) {
          res.send({ message: "Not active yet." });
        } else {
          player = game.players.filter((player) => player.id === req.user._id)[0];
          const playerNum = game.players.indexOf(player);
          if (player !== game.players[game.currentTurn]) {
            res.send({ message: "Not your turn!" });
          } else {
            const prev_x = player.location.x;
            const prev_y = player.location.y;
            const direction_x = req.body.direction.x;
            const direction_y = req.body.direction.y;
            const new_x = prev_x - direction_y;
            const new_y = prev_y + direction_x;
            if (
              new_x < 0 ||
              new_x > 8 ||
              new_y < 0 ||
              new_y > 8 ||
              game.board[new_x][new_y].tileType === "Left-mirror" ||
              game.board[new_x][new_y].tileType === "Right-mirror" ||
              game.board[new_x][new_y].tileType === "Hor-wall" ||
              game.board[new_x][new_y].tileType === "Vert-wall"
            ) {
              res.send({ message: "Not a valid move." });
            } else {
              game.board = makeBoard.updateBoard(
                game.board,
                "Player" + String(playerNum),
                { x: new_x, y: new_y },
                { x: direction_x, y: direction_y }
              );
              game.board = makeBoard.updateBoard(
                game.board,
                "",
                { x: prev_x, y: prev_y },
                { x: direction_x, y: direction_y }
              );
              game.players[game.currentTurn].location = {
                x: new_x,
                y: new_y,
              };
              if (new_x === 4 && new_y === 4) {
                // game won
                let newPlayers = [];
                const mirrorsArr = makeBoard.createMirrors(game.mirrors);
                let board = makeBoard.checkClass(mirrorsArr);
                game.players[game.currentTurn].score += 1;
                for (player of game.players) {
                  const location = locations[game.players.indexOf(player)];
                  newPlayers.push({
                    name: player.name,
                    id: player.id,
                    score: player.score,
                    location: location,
                  });
                  let direction;
                  if (location.x < 4) {
                    direction = { x: 0, y: -1 };
                  } else {
                    direction = { x: 0, y: 1 };
                  }
                  board = makeBoard.updateBoard(
                    board,
                    "Player" + String(game.players.indexOf(player)),
                    location,
                    direction
                  );
                }
                game.board = board;
                game.players = newPlayers;
                res.send({ message: "Game won." });
              } else {
                res.send({});
              }
              game.currentTurn = (game.currentTurn + 1) % game.players.length;
              game.save().then((data) => {
                data.players.map((player) => {
                  socketManager.getSocketFromUserID(player.id).emit("updateBoard", data);
                });
              });
            }
          }
        }
      } else {
        res.send({ message: "No games found." });
      }
    })
    .catch((err) => console.log(err));
});

router.post("/changeName", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      console.log(user);
      user.name = req.body.newName;
      user.save().then((data) => res.send(data));
    })
    .catch(console.log);
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
