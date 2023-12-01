import {readFileSync} from 'fs';

const file = readFileSync('./input.txt').toString().trim();
let letterValues = {};
for (let i = 0; i < 26; i++) {
    letterValues[String.fromCharCode(97 + i)] = i + 1;
    letterValues[String.fromCharCode(65 + i)] = i + 27;
}

const sacks = file.split('\n');
const res = sacks
    .map(sack => {
        const firstHalf = sack.slice(0, sack.length / 2);
        const secondHalf = sack.slice(sack.length / 2, sack.length);

        const common = firstHalf.split('')
            .reduce((acc, letter) => {
                if (secondHalf.indexOf(letter) >= 0 && acc.indexOf(letter) < 0) {
                    return [...acc, letter];
                }
                return acc;
            }, []);
        return common;
    })
    .reduce((acc, common) => acc + common.reduce((commonAcc, letter) => commonAcc + letterValues[letter], 0), 0);


const groups = file.match(/\w+\n\w+\n\w+/gm)
const res2 = groups.map(findBadge).reduce((acc, letter) => acc + letterValues[letter], 0);
console.log(res, res2);


function findBadge(group) {
    const [first, second, third] = group.split('\n').sort((a, b) => b.length - a.length);
    return first.split('').reduce((acc, letter) => {
        if (second.indexOf(letter) >= 0 && third.indexOf(letter) >= 0) {
            return letter;
        }
        return acc;
    });
}
