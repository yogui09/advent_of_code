import {readFileSync} from 'fs';

const file = readFileSync('./input.txt').toString().trim();
// file = file.replaceAll(/^(\.*)$/gm, '$1\n$1');
let universe = file.split('\n').map(line => line.split(''));
const emptyColumns = [];


const galaxies = getGalaxies(universe);
const driftedGalaxies = getDriftedCoordinates(galaxies, 1000000);
const res = driftedGalaxies.reduce((sum, fromGalaxy, i) => {
    return sum + driftedGalaxies.slice(i).reduce((galaxyDistance, toGalaxy) => galaxyDistance + getDistance(fromGalaxy, toGalaxy), 0)
}, 0);

console.log(res);

function getGalaxies(universe) {
    return universe.reduce((rowAcc, row, y) => [
        ...rowAcc,
        ...row.reduce((acc, c, x) => [...acc, ...(c === '#' ? [{x, y}] : [])], [])
    ], []);
}

function getDriftedCoordinates(galaxies, size) {
    const emptyColumns = getEmptyColumns(universe);
    const emptyRows = getEmptyRows(universe);

    return galaxies.map(({y, x}) => {
        const emptyRowsBefore = emptyRows.filter(row => row < y).length;
        const emptyColumnsBefore = emptyColumns.filter(column => column < x).length;
        return {
            x: x + (emptyColumnsBefore * (size - 1)),
            y: y + (emptyRowsBefore * (size - 1))
        }
    });
}

function getEmptyColumns(universe) {
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
    return emptyColumns;
}

function getEmptyRows(universe) {
    return universe.reduce((acc, row, i) => {
        if (row.every(c => c === '.')) {
            return [...acc, i];
        }
        return acc;
    }, [])
}

function getDistance(start, end) {
    const xDif = Math.abs(start.x - end.x);
    const yDif = Math.abs(start.y - end.y);
    return xDif + yDif;
}
