import { readFileSync } from 'fs';
import { getNumberAndCoordinatesFromMatrix, getNumberCoordinates, removeDuplicateCoordinates } from './utils.js';

const buffer = readFileSync('./input.txt').toString().trim();
const matrix = buffer.split('\n').map(line => line.split(''));
const numberCoordinates = matrix
    .flatMap((line, y) => line
        .reduce((acc, c, x) => {
            if (c !== '.' && isNaN(parseInt(c))) {
                return [...acc, ...getNumberCoordinates(x, y, matrix)];
            }
            return acc;
        }, []));

const uniqueCoordinate = removeDuplicateCoordinates(numberCoordinates);

const {sum} = uniqueCoordinate.reduce((acc, coordinate) => {
    if (acc.existing.indexOf(`${coordinate.y}-${coordinate.x}`) < 0) {
        const [number, coordinates] = getNumberAndCoordinatesFromMatrix(coordinate, matrix);
        return {
            sum: acc.sum + number,
            existing: [...acc.existing, ...coordinates],
        };
    }
    return acc;
}, {sum: 0, existing: []});

console.log(sum);




