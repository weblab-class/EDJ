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
      return true;
    }
  }
  return false;
};

const createMirrors = (mirrorsNum) => {
  let possibleMirrors = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (!invalidLoc(i, j)) {
        possibleMirrors.push({ x: i + 1, y: j + 1 });
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

module.exports = {
  invalidLoc,
  containsObj,
  createMirrors,
};
