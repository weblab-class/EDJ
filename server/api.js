/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Game = require("./models/game");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
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
  const newGame = new Game({
    roomName: req.body.roomName,
    roomCode: req.body.roomCode,
    board: new Array(9).fill(new Array(9).fill(0)),
    mirrors: req.body.mirrors,
    players: [{ name: req.user.name, id: req.user._id, score: 0 }],
    currentTurn: 0,
  });

  newGame
    .save()
    .then((game) => res.send(game))
    .catch(console.log);
});

router.get("/checkGame", auth.ensureLoggedIn, (req, res) => {
  Game.findOne(req.query).then((game) => res.send(game));
});

router.post("/joinGame", auth.ensureLoggedIn, (req, res) => {
  Game.findOne({ roomCode: req.body.code })
    .then((game) => {
      if (game) {
        const p = game.players.filter((l) => l.id == req.user._id);
        if (p.length !== 0) {
          res.send(game);
        } else {
          game.players = [...game.players, { name: req.user.name, id: req.user._id, score: 0 }];
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

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
