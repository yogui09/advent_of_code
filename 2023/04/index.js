import {readFileSync} from 'fs';

const file = readFileSync('./input.txt').toString().trim();

const info = file.split('\n')
    .reduce((acc, line, card) => {
        acc.cardsCount[card] = acc.cardsCount[card] ?? 1;
        const [winningNumbers, betNumbers] = line
            .split(':')[1]
            .split(' | ')
            .map(numbers => numbers.trim().match((/(\d+)/g)));
        const matchingNumbers = winningNumbers.reduce((numbers, winningNumber) => {
            return betNumbers.includes(winningNumber) ? [...numbers, winningNumber] : numbers;
        }, []);
        const newCardsCount = [...acc.cardsCount];
        matchingNumbers.forEach((_, i) => {
            newCardsCount[card + i + 1] = newCardsCount[card + i + 1] ?? 1;
            newCardsCount[card + i + 1] += acc.cardsCount[card];
        });
        return {
            totalScore: acc.totalScore + (matchingNumbers.reduce((cardScore) => (cardScore || 1) * 2, 0) / 2),
            cardsCount: newCardsCount
        };
    }, {totalScore: 0, cardsCount: []});

console.log(info.totalScore, info.cardsCount.reduce((acc, c) => acc + c, 0));
