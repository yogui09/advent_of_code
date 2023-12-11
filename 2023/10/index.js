import {readFileSync} from 'fs';

const file = readFileSync('./input.txt').toString().trim();

const maze = file.split('\n').map(line => line.split(''));
const moveCount = JSON.parse(JSON.stringify(maze)).map(line => line.map(() => null));

let start;
for (let y = 0; y < maze.length && !start; y++) {
    for (let x = 0; x < maze[y].length && !start; x++) {
        if (maze[y][x] === 'S') {
            start = [y, x];
        }
    }
}


// toExplore.forEach(coord => explore(coord), 1);
explore(start, 0);
console.log(moveCount);

function findAdjacentPipes([y, x]) {
    const current = maze[y, x];
    const toExplore = [];
    const iMin = y === 0 ? y : y - 1;
    const iMax = y === maze.length - 1 ? y : y + 1;
    for (let i = iMin; i <= iMax; i++) {
        const jMin = x === 0 ? x : x - 1;
        const jMax = y === maze[i].length - 1 ? y : y + 1;
        for (let j = jMin; j <= jMax; j++) {
            if (i === y ^ j === x && maze[i][j] !== '.') {
                toExplore.push([i, j])
            }
        }
    }
    return toExplore;
}

function getAdjacent([y, x]) {
    const current = maze[y][x];
    const adjacent = [];
    switch (current) {
        case 'S':
            if (moveCount[y + 1][x] === null && y !== 0 && maze[y + 1][x] !== '.') {
                adjacent.push([y + 1, x]);
            }
            if (moveCount[y - 1][x] === null && y < maze.length - 1 && maze[y - 1][x] !== '.') {
                adjacent.push([y - 1, x]);
            }
            if (moveCount[y][x + 1] === null && x !== 0 && maze[y][x + 1] !== '.') {
                adjacent.push([y, x + 1]);
            }
            if (moveCount[y][x - 1] === null && x < maze[y].length - 1 && maze[y][x - 1] !== '.') {
                adjacent.push([y, x - 1]);
            }
            break;
        // | is a vertical pipe connecting north and south.
        case '|':
            if (moveCount[y + 1][x] === null && y !== 0) {
                adjacent.push([y + 1, x]);
            }
            if (moveCount[y - 1][x] === null && y < maze.length - 1) {
                adjacent.push([y - 1, x]);
            }
            break;
        // - is a horizontal pipe connecting east and west.
        case '-':
            if (moveCount[y][x + 1] === null && x !== 0) {
                adjacent.push([y, x + 1]);
            }
            if (moveCount[y][x - 1] === null && x < maze[y].length - 1) {
                adjacent.push([y, x - 1]);
            }
            break;
        // L is a 90-degree bend connecting north and east.
        case 'L':
            if (moveCount[y - 1][x] === null && y === 0) {
                adjacent.push([y - 1, x]);
            }
            if (moveCount[y][x + 1] === null && x < maze[y].length - 1) {
                adjacent.push([y, x + 1]);
            }
            break;
        // J is a 90-degree bend connecting north and west.
        case 'J':
            if (moveCount[y - 1][x] === null && y !== 0) {
                adjacent.push([y - 1, x]);
            }
            if (moveCount[y][x - 1] === null && x !== 0) {
                adjacent.push([y, x - 1]);
            }
            break;
        // 7 is a 90-degree bend connecting south and west.
        case '7' :
            if (moveCount[y + 1][x] === null && y < maze.length - 1) {
                adjacent.push([y + 1, x]);
            }
            if (moveCount[y][x - 1] === null && x !== 0) {
                adjacent.push([y, x - 1]);
            }
            break;
        // F is a 90-degree bend connecting south and east.
        case 'F' :
            if (moveCount[y + 1][x] === null && y < maze.length - 1) {
                adjacent.push([y + 1, x]);
            }
            if (moveCount[y][x + 1] === null && x < maze[y].length - 1) {
                adjacent.push([y, x + 1]);
            }
            break;
    }
    return adjacent;
}

function explore([y, x], count) {
    moveCount[y][x] = count;
    const adjacent = getAdjacent([y, x]);
    adjacent.forEach(a => explore(a, count + 1));
}
