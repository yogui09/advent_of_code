import {readFileSync} from 'fs';

const file = readFileSync('./input.txt').toString().trim();
const rounds = file.split('\n');
const score1 = rounds.map(getScore1).reduce((acc, s) => acc + s, 0);
const score2 = rounds.map(getScore2).reduce((acc, s) => acc + s, 0);

function getScore1(round) {
    switch (round) {
        case 'A X':
            return 1 + 3;
        case 'A Y':
            return 2 + 6;
        case 'A Z':
            return 3 + 0;
        case 'B X':
            return 1 + 0;
        case 'B Y':
            return 2 + 3;
        case 'B Z':
            return 3 + 6;
        case 'C X':
            return 1 + 6;
        case 'C Y':
            return 2 + 0;
        case 'C Z':
            return 3 + 3;
    }
}

function getScore2(round) {
    /**
     * X => loose => 0
     * Y => draw => 3
     * Z => win => 6
     * A => rock
     * B => paper
     * C => scissors
     * rock => 1
     * paper => 2
     * scissors => 3
     */
    switch (round) {
        case 'A X':
            return 3 + 0;
        case 'A Y':
            return 1 + 3;
        case 'A Z':
            return 2 + 6;
        case 'B X':
            return 1 + 0;
        case 'B Y':
            return 2 + 3;
        case 'B Z':
            return 3 + 6;
        case 'C X':
            return 2 + 0;
        case 'C Y':
            return 3 + 3;
        case 'C Z':
            return 1 + 6;
    }
}

console.log(score1, score2);
