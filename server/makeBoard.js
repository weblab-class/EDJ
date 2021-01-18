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

const containsObj = (mirrors, { x, y }) => {
  for (let i = 0; i < mirrors.length; i++) {
    if (mirrors[i].location.x === x && mirrors[i].location.y === y) {
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
    for (let i of [-1, 1, 0]) {
      for (let j of [-1, 1, 0]) {
        if (containsObj(mirrorsArray, { x: randomLoc.x + i, y: randomLoc.y + j })) {
          mirrorNearby = true;
          break;
        }
      }
      if (mirrorNearby) {
        break;
      }
    }
    if (mirrorNearby) {
      continue;
    }
    // x coordinate modulo 2 (divisible by 2 --> left-facing mirror)
    const leftMirror = ((mirrorsArray.length % 2) + 2) % 2 === 0;
    mirrorsArray.push({ location: randomLoc, leftMirror: leftMirror });
  }
  return mirrorsArray;
};

const updateBoard = (board, value, { x, y }) => {
  board[x][y] = value;
  return board;
};

const checkClass = (mirrorsArray) => {
  const board = [];
  for (let i = 0; i < 9; i++) {
    const innerBoard = [];
    for (let j = 0; j < 9; j++) {
      let inMirror = containsObj(mirrorsArray, { x: i, y: j });
      if ((i === 4 && j === 0) || (i === 4 && j === 8)) {
        innerBoard.push("Hor-wall");
      } else if ((i === 0 && j === 4) || (i === 8 && j === 4)) {
        innerBoard.push("Vert-wall");
      } else if (inMirror) {
        const leftMirror = inMirror.leftMirror;
        if (leftMirror) {
          innerBoard.push("Left-mirror");
        } else {
          innerBoard.push("Right-mirror");
        }
      } else {
        innerBoard.push("");
      }
    }
    board.push(innerBoard);
  }
  return board;
};

module.exports = {
  invalidLoc,
  containsObj,
  createMirrors,
  checkClass,
  updateBoard,
};
