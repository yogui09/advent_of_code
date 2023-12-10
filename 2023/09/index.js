import {readFileSync} from 'fs';

const file = readFileSync('./input.txt').toString().trim();
const lines = file.split('\n');

const res1 = lines.reduce((sum, line) => {
    const numbers = line.split(' ').map(n => parseInt(n));
    const [, extrapolation] = extrapolate(numbers);
    return sum + extrapolation[extrapolation.length - 1];
}, 0);

const res2 = lines.reduce((sum, line) => {
    const numbers = line.split(' ').map(n => parseInt(n));
    const [, extrapolation] = extrapolateLeft(numbers);
    return sum + extrapolation[0];
}, 0);

console.log(res1);
console.log(res2);

function extrapolate(numbers) {
    const diff = numbers.reduce((acc, n, i) => {
        if (i > 0) {
            acc.push(n - numbers[i - 1])
        }
        return acc;
    }, []);
    if (!isAllZero(diff)) {
        const [previous, extrapolatedDiff] = extrapolate(diff);
        return [
            [...extrapolatedDiff, extrapolatedDiff[extrapolatedDiff.length - 1] + previous[previous.length - 1]],
            [...numbers, extrapolatedDiff[extrapolatedDiff.length - 1] + numbers[numbers.length - 1]]
        ];
    } else {
        return [[...diff, 0], [...numbers, numbers[numbers.length - 1]]];
    }
}

function extrapolateLeft(numbers) {
    const diff = numbers.reduce((acc, n, i) => {
        if (i > 0) {
            acc.push(n - numbers[i - 1])
        }
        return acc;
    }, []);
    if (!isAllZero(diff)) {
        const [previous, extrapolatedDiff] = extrapolateLeft(diff);
        return [
            [extrapolatedDiff[0] - previous[0], ...extrapolatedDiff],
            [numbers[0] - extrapolatedDiff[0], ...numbers]
        ];
    } else {
        return [[...diff, 0], [numbers[0], ...numbers]];
    }
}

function isAllZero(arr) {
    return arr[0] === 0 ? arr.every(n => n === 0) : false;
}
