import {readFileSync} from 'fs';

const numberMapping = new Map([
    ['one', '1'],
    ['two', '2'],
    ['three', '3'],
    ['four', '4'],
    ['five', '5'],
    ['six', '6'],
    ['seven', '7'],
    ['eight', '8'],
    ['nine', '9'],
]);

const file = readFileSync('./input.txt').toString().trim();
const calibrationSum1 = file.split('\n')
    .map(getCalibration1)
    .reduce((sum, calibration) => sum + calibration, 0);

const calibrationSum2 = file.split('\n')
    .map(getCalibration2)
    .reduce((sum, calibration) => sum + calibration, 0);

console.log(calibrationSum1);
console.log(calibrationSum2);

function getCalibration1(line) {
    const numbers = line.split('').filter((num) => !isNaN(parseInt(num, 10)))
    return parseInt(numbers[0] + numbers[numbers.length - 1], 10);
}

function getCalibration2(line) {
    const groups = Array.from(line.matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g), match => match[1]);
    const [first, second] = [groups[0], groups[groups.length - 1]];
    return parseInt(
        (isNaN(parseInt(first, 10)) ? numberMapping.get(first) : first)
        + (isNaN(parseInt(second, 10)) ? numberMapping.get(second) : second),
        10
    );
}
