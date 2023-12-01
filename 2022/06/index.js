import {readFileSync} from 'fs';

const buffer = readFileSync('./input.txt').toString().trim();
const stream = buffer.split('');

let sequence = [];
let index = 0;
stream.some((char, i) => {
    // if (i<4) { <== first part
    if (i<14) { // <== second part
        sequence = [...sequence, char];
    } else {
        const [_, ...seq] = sequence;
        sequence = [...seq, char]
        if (!hasDuplicates(sequence)) {
            index = i + 1;
            return true;
        }
    }
    return false;
})

console.log(sequence, index);

function hasDuplicates(sequence) {
    const set = new Set(sequence);
    return set.size !== sequence.length;
}
