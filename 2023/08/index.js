import {readFileSync} from 'fs';

const file = readFileSync('./input.txt').toString().trim();

const [instructionLine, mapLines] = file.split('\n\n');
const instructions = instructionLine.split('').map(i => i === 'R' ? 1 : 0);
const mapping = new Map();
mapLines.split('\n').map(line => {
    const [key, left, right] = line.match(/(\w{3})/gm);
    mapping.set(key, [left, right]);
});

let current = 'AAA';
let res1;
const instructionsLength = instructions.length;

const destination = 'ZZZ';
for (res1 = 0; current !== destination; res1++) {
    current = mapping.get(current)[instructions[res1 % instructionsLength]];
}

const multipliers =
    Array.from(mapping.keys())
        .filter(key => key.endsWith('A'))
        .map(starter => {
            let endCount, next = starter;
            for (endCount = 0; !next.endsWith('Z'); endCount++) {
                next = mapping.get(next)[instructions[endCount % instructionsLength]];
            }
            return getPrimes(i);
        })
        .reduce((acc, primes) => {
            for (const prime in primes) {
                if (!acc[prime] || acc[prime] < primes[prime]) {
                    acc[prime] = primes[prime];
                }
            }
            return acc;
        }, {});

const res2 = Object.entries(multipliers).reduce((acc, [m, power]) => acc * Math.pow(m, power), 1)

console.log(res2);

function getPrimes(number) {
    let rest = number;
    const primes = {};
    while (rest !== 1 && !isNaN(rest)) {
        const divider = getShortestPrimeDivider(rest);
        rest = rest / divider;
        primes[divider] = primes[divider] ? primes[divider] + 1 : 1;
    }
    return primes;
}

function getShortestPrimeDivider(number) {
    let prime;
    for (let i = 2; i < number && prime === undefined; i++) {
        if (isPrime(i) && number % i === 0) {
            prime = i;
        }
    }
    return prime ?? number;
}

function isPrime(number) {
    if (number === 2 || number === 3) {
        return true;
    }
    for (let i = 3; i < number / 2; i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return true;
}
