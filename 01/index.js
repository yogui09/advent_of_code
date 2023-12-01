import {readFileSync} from 'fs';

const file = readFileSync('./input.txt').toString().trim();
const calories = file.split('\n\n')
    .map(c => c.split("\n"))
    .map(cals => cals.reduce((acc, c) => acc + parseInt(c, 10), 0));

console.log(Math.max(...calories));

let sum = 0;
for (let i=0; i<3; i++) {
    const index = calories.findIndex(c => c === Math.max(...calories));
    const [cals] = calories.splice(index, 1);
    sum += cals;
}
console.log(sum);
