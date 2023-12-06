import {readFileSync} from 'fs';

const file = readFileSync('./input.txt').toString().trim();

const [seedsInfo, seedToSoilInfo, soilToFertilizerInfo, fertilizerToWaterInfo, waterToLightInfo, lightToTemperatureInfo, temperatureToHumidityInfo, humidityToLocationInfo] = file.split('\n\n');
// const seedRanges = seedsInfo.match(/(\d+)/g).map(s => ({start: parseInt(s, 10), length: 1}));
const seedRanges = Array.from(seedsInfo.matchAll(/((\d+) (\d+))/g), ([, , start, length]) => ({
    start: parseInt(start, 10),
    length: parseInt(length, 10)
}));

const ranges = [
    strToRanges(seedToSoilInfo),
    strToRanges(soilToFertilizerInfo),
    strToRanges(fertilizerToWaterInfo),
    strToRanges(waterToLightInfo),
    strToRanges(lightToTemperatureInfo),
    strToRanges(temperatureToHumidityInfo),
    strToRanges(humidityToLocationInfo)
]

const res = seedRanges.reduce((minLocation, {start, length}) => {
    for (const seed of seedRangeToGenerator(start, length)()) {
        const location = ranges.reduce((previous, ranges) => getMapping(previous, ranges), seed);
        minLocation = minLocation < location ? minLocation : location;
    }
    return minLocation;
}, undefined);

console.log(res);

function strToRanges(str) {
    const range = [];
    str.split('\n').slice(1).map(line => {
        const [dest, source, length] = line.split(' ').map(n => parseInt(n, 10));
        range.push({dest, source, length})
    });
    return range;
}

function getMapping(val, ranges) {
    let mapping = val;
    let i = 0;
    while (mapping === val && i < ranges.length) {
        const {source, dest, length} = ranges[i];
        if (val >= source && val < source + length) {
            mapping = dest + val - source;
        }
        i++;
    }
    return mapping;
}

function seedRangeToGenerator(start, length) {
    return function* () {
        for (let i = 0; i < length; i++) {
            yield (parseInt(start) + i);
        }
    }
}

