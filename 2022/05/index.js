/*
[T]             [P]     [J]
[F]     [S]     [T]     [R]     [B]
[V]     [M] [H] [S]     [F]     [R]
[Z]     [P] [Q] [B]     [S] [W] [P]
[C]     [Q] [R] [D] [Z] [N] [H] [Q]
[W] [B] [T] [F] [L] [T] [M] [F] [T]
[S] [R] [Z] [V] [G] [R] [Q] [N] [Z]
[Q] [Q] [B] [D] [J] [W] [H] [R] [J]
 1   2   3   4   5   6   7   8   9
*/
import {readFileSync} from 'fs';

const stacks = {
    1: ['Q', 'S', 'W', 'C', 'Z', 'V', 'F', 'T'],
    2: ['B', 'R', 'Q'],
    3: ['B', 'Z', 'T', 'Q', 'P', 'M', 'Z'],
    4: ['D', 'V', 'F', 'R', 'Q', 'H'],
    5: ['J', 'G', 'L', 'D', 'B', 'S', 'T', 'P'],
    6: ['W', 'R', 'T', 'Z'],
    7: ['H', 'Q', 'M', 'N', 'S', 'F', 'R', 'J'],
    8: ['R', 'N', 'F', 'H', 'W'],
    9: ['J', 'Z', 'T', 'Q', 'P', 'R', 'B'],
}

const file = readFileSync('./input.txt').toString().trim();
// file.split('\n')
//     .map(parseMove)
//     .forEach(moveFIFO);

file.split('\n')
    .map(parseMove)
    .forEach(moveLIFO);

console.log(Object.values(stacks).map(stack => stack[stack.length - 1]).join(''));

function parseMove(line) {
    const [match, count, from, to] = line.match(/move (\d+) from (\d+) to (\d+)/);
    return [count, from, to];
}

function moveFIFO([count, from, to]) {
    for (let i = 0; i < count; i++) {
        stacks[to].push(stacks[from].pop());
    }
}

function moveLIFO([count, from, to]) {
    stacks[to].push(...stacks[from].splice(count * -1, count));
}
