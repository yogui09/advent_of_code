import {readFileSync} from 'fs';

const bags = {
    red: 12, green: 13, blue: 14
}

const file = readFileSync('./input.txt').toString().trim();
const possibleGameIdsSum = file.split('\n')
    .map(parseGame)
    .filter(gameInfo => isGamePossible(bags, gameInfo))
    .reduce((sum, gameInfo) => sum + gameInfo.id, 0);


const gamePowers = file.split('\n')
    .map(line => getGamePower(parseGame(line)))
    .reduce((sum, power) => sum + power, 0);

console.log(possibleGameIdsSum);
console.log(gamePowers);

function parseGame(line) {
    const [gameInfo, rounds] = line.split(': ');
    const [id] = Array.from(gameInfo.matchAll(/^Game (\d+)/gm), ([, match]) => parseInt(match));
    const roundsInfo = rounds.split(';')
        .map(roundInfo => Array.from(roundInfo.matchAll(/((\d+) (red|green|blue))/gm), ([, , number, color]) => ({[color]: parseInt(number)})))
    return {id, roundsInfo};
}

function isGamePossible(bags, gameInfo) {
    return gameInfo.roundsInfo.flat().every(info => {
        const color = Object.keys(info);
        return info[color] <= bags[color];
    })
}

function getGamePower(gameInfo) {
    const minCubes = gameInfo.roundsInfo.flat().reduce((colors, round) => {
        const color = Object.keys(round);
        return {...colors, [color]: colors[color] < round[color] ? round[color] : colors[color]};
    }, {red: 0, green: 0, blue: 0})
    return minCubes.red * minCubes.blue * minCubes.green;
}
