import {readFileSync} from 'fs';

const file = readFileSync('./input.txt').toString().trim();

// const [times, distances] = file.split('\n').map(line => line.match(/(\d+)+/g).map(n => parseInt(n, 10)));
const [times, distances] = file.split('\n').map(line => line.match(/(\d+)+/g).join('')).map(n => [parseInt(n, 10)]);

const res = times.reduce((acc, raceLength, i) => {
    const record = distances[i];
    let count = 0;
    for (const time of toGenerator(raceLength)()) {
        const distance = time * (raceLength - time);
        if (distance > record) {
            count++;
        }
    }
    return count * acc;
}, 1);

console.log(res);

function toGenerator(count) {
    return function* () {
        for (let i = 0; i < count; i++) {
            yield i;
        }
    }
}
