import {readFileSync} from 'fs';

const file = readFileSync('./input.txt').toString().trim();
const fullOverlaps = file.split('\n')
    .filter(isFullyOverlapping)

const partialOverlaps = file.split('\n')
    .filter(isOverlapping);

console.log(fullOverlaps.length);
console.log(partialOverlaps.length);

function isFullyOverlapping(pair) {
    const [axxx, xaxx, xxax, xxxa] = parsePair(pair);
    if (
        (axxx >= xxax && axxx <= xxxa && xaxx >= xxax && xaxx <= xxxa) ||
        (xxax >= axxx && xxax <= xaxx && xxxa >= axxx && xxxa <= xaxx)
    ) {
        return true;
    }
    return false;
}

function isOverlapping(pair) {
    const [axxx, xaxx, xxax, xxxa] = parsePair(pair);
    if (xaxx < xxax || xxxa < axxx) {
        return false;
    }
    return true;
}

function parsePair(pair) {
    const [, ...assignments] = pair.match(/^(\d+)-(\d+),(\d+)-(\d+)/);
    return assignments.map(assignment => parseInt(assignment, 10));
}

