import { getNumberAndCoordinatesFromMatrix, getNumberCoordinates, isCoordinateInExisting } from './utils.js';
import { readFileSync } from 'fs';

const buffer = readFileSync('./input.txt').toString().trim();
const matrix = buffer.split('\n').map(line => line.split(''));
const matrixTotal = matrix.reduce((matrixSum, line, y) => {
    const lineTotal = line.reduce((lineSum, el, x) => {
        if (el !== '.' && isNaN(parseInt(el))) {
            const numberCoordinates = getNumberCoordinates(x, y, matrix);
            let symbolSum = 0;
            const {numbers} = numberCoordinates.reduce((elAcc, coordinate) => {
                if (!isCoordinateInExisting(coordinate, elAcc.existing)) {
                    const [number, existing] = getNumberAndCoordinatesFromMatrix(coordinate, matrix);
                    // console.log(number, existing);
                    return {
                        existing: [...elAcc.existing, ...existing],
                        numbers: [...elAcc.numbers, number],
                    };
                }
                return elAcc;
            }, {existing: [], numbers: []});
            if (el === '*' && numbers.length === 2) {
                return lineSum + numbers[0] * numbers[1];
            }
            return lineSum;
        }
        return lineSum;
    }, 0);
    return matrixSum + lineTotal;
}, 0);

console.log(matrixTotal);
