const invalidLoc = (x, y) => {
  return (
    (x === 0 && y === 4) ||
    (x === 4 && y === 0) ||
    (x === 4 && y === 8) ||
    (x === 8 && y === 4) ||
    (x === 4 && y === 4) ||
    (x === 0 && y === 0) ||
    (x === 0 && y === 8) ||
    (x === 8 && y === 0) ||
    (x === 8 && y === 8)
  );
};

const containsObj = (mirrors, location) => {
  for (let i = 0; i < mirrors.length; i++) {
    if (mirrors[i].location.x === location.x && mirrors[i].location.y === location.y) {
      return mirrors[i];
    }
  }
  return false;
};

const createMirrors = (mirrorsNum) => {
  let possibleMirrors = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (!invalidLoc(i, j)) {
        possibleMirrors.push({ x: i, y: j });
      }
    }
  }
  let mirrorsArray = [];
  while (true) {
    let mirrorNearby = false;
    if (mirrorsArray.length === mirrorsNum) {
      break;
    }
    let randomLoc = possibleMirrors[Math.floor(Math.random() * possibleMirrors.length)];

    // check for neighbors
    for (i of [-1, 0, 1]) {
      for (j of [-1, 0, 1]) {
        if (containsObj(mirrorsArray, { x: randomLoc.x + i, y: randomLoc.y + j })) {
          mirrorNearby = true;
          break;
        }
      }
    }
    if (mirrorNearby) {
      continue;
    }

    // check for self
    // if (containsObj(mirrorsArray, randomLoc)) {
    //   continue;
    // }

    // x coordinate modulo 2 (divisible by 2 --> left-facing mirror)
    const leftMirror = mirrorsArray.length % 2 === 0;
    mirrorsArray.push({ location: randomLoc, leftMirror: leftMirror });
  }
  return mirrorsArray;
};

const updateBoard = (board, value, location, direction) => {
  const x = location.x;
  const y = location.y;
  if (value.includes("Player")) {
    board[x][y].inputDirection = direction;
  }
  if (value === "") {
    board[x][y].inputDirection = undefined;
  }
  board[x][y].tileType = value;
  return board;
};

const validate = (board) => {
  return true;
};

const checkClass = (mirrorsArray) => {
  const board = [];
  for (let i = 0; i < 9; i++) {
    const innerBoard = [];
    for (let j = 0; j < 9; j++) {
      let inMirror = containsObj(mirrorsArray, { x: i, y: j });
      if ((i === 4 && j === 0) || (i === 4 && j === 8)) {
        innerBoard.push({ tileType: "Hor-wall" });
      } else if ((i === 0 && j === 4) || (i === 8 && j === 4)) {
        innerBoard.push({ tileType: "Vert-wall" });
      } else if (i === 4 && j === 4) {
        innerBoard.push({ tileType: "goal" });
      } else if (inMirror) {
        const leftMirror = inMirror.leftMirror;
        if (leftMirror) {
          innerBoard.push({ tileType: "Left-mirror" });
        } else {
          innerBoard.push({ tileType: "Right-mirror" });
        }
      } else {
        innerBoard.push({ tileType: "" });
      }
    }
    board.push(innerBoard);
  }
  return board;
};

const makeFromTemplate = (board) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      switch (board[i][j]) {
        case "-2":
          board[i][j] = { tileType: "Vert-wall" };
          break;
        case "-1":
          board[i][j] = { tileType: "Hor-wall" };
          break;
        case "0":
          if (i === 4 && j === 4) {
            board[i][j] = { tileType: "goal" };
          } else {
            board[i][j] = { tileType: "" };
          }
          break;
        case "1":
          board[i][j] = { tileType: "Left-mirror" };
          break;
        case "2":
          board[i][j] = { tileType: "Right-mirror" };
          break;
        default:
          break;
      }
    }
  }
  return board;
};

const isValid = (space, board) => {
  let bounds = space.x >= 0 && space.x <= 8 && space.y >= 0 && space.y <= 8;
  if (!bounds) {
    return false;
  }
  let wall =
    board[space.x][space.y].tileType !== "Vert-wall" &&
    board[space.x][space.y].tileType !== "Hor-wall";
  let player = !board[space.x][space.y].tileType.includes("Player");
  return bounds && wall && player;
};

const fire = (pos, dir, board) => {
  let sum = (p, d) => {
    return { x: p.x - d.y, y: p.y + d.x };
  };
  let leftMirror = (v) => {
    return { x: v.y, y: v.x };
  };
  let rightMirror = (v) => {
    return { x: -v.y, y: -v.x };
  };
  let path = [pos];
  let newSpace = sum(path[0], dir);
  //console.log(pos, dir, newSpace);
  while (isValid(newSpace, board)) {
    if (board[newSpace.x][newSpace.y].tileType === "Right-mirror") {
      dir = rightMirror(dir);
    } else if (board[newSpace.x][newSpace.y].tileType === "Left-mirror") {
      dir = leftMirror(dir);
    }
    path.push(newSpace);
    newSpace = sum(newSpace, dir);
  }
  return [path, newSpace];
};

const setLight = (board, beam) => {
  for (let i = 0; i < beam.length; i++) {
    board[beam[i].x][beam[i].y].isLit = true;
  }
  return board;
};

const resetLight = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j].isLit = false;
    }
  }
  return board;
};

module.exports = {
  makeFromTemplate,
  validate,
  fire,
  setLight,
  resetLight,
  isValid,
  invalidLoc,
  containsObj,
  createMirrors,
  checkClass,
  updateBoard,
};
