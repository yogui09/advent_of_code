import {readFileSync} from 'fs';

let file = readFileSync('./input.txt').toString().trim();
file = file.replaceAll(/^(\.*)$/gm, '$1\n$1');
let universe = file.split('\n').map(line => line.split(''));
const emptyColumns = [];

for (let x = 0; x < universe[0].length; x++) {
    let isEmpty = true;
    for (let y = 0; y < universe.length && isEmpty; y++) {
        if (universe[y][x] !== '.') {
            isEmpty = false;
        }
    }
    if (isEmpty) {
        emptyColumns.push(x);
    }
}

// universe = fillUniverse(universe, emptyColumns, 1);
universe = fillUniverse(universe, emptyColumns, 1000000);
const galaxies = getGalaxies(universe);
const res1 = galaxies.reduce((sum, fromGalaxy, i) => {
    return sum + galaxies.slice(i).reduce((galaxyDistance, toGalaxy) => galaxyDistance + getDistance(fromGalaxy, toGalaxy), 0)
}, 0);

console.log(res1);

function fillUniverse(universe, emptyColumns, size) {
    return universe
        .map(row => emptyColumns
            .reduce((newRow, x, i) => newRow
                .toSpliced(x + i, 0, '.'.repeat(size)), row))
}

function getGalaxies(universe) {
    return universe.reduce((rowAcc, row, y) => [
        ...rowAcc,
        ...row.reduce((acc, c, x) => [...acc, ...(c === '#' ? [{x, y}] : [])], [])
    ], []);
}

function getDistance(start, end) {
    const xDif = Math.abs(start.x - end.x);
    const yDif = Math.abs(start.y - end.y);
    return xDif + yDif;
}

function printUniverse(universe) {
    universe.forEach(row => {
        console.log(row.join(''));
    })
}
