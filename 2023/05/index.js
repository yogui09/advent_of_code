import {readFileSync} from 'fs';

const file = readFileSync('./input.txt').toString().trim();

const [seedsInfo, seedToSoilInfo, soilToFertilizerInfo, fertilizerToWaterInfo, waterToLightInfo, lightToTemperatureInfo, temperatureToHumidityInfo, humidityToLocationInfo] = file.split('\n\n');
const seeds = seedsInfo.match(/(\d+)/g).map(s => parseInt(s, 10));
// const seedRanges = Array.from(seedsInfo.matchAll(/((\d+) (\d+))/g), ([, , start, length]) => ({start, length}));

const ranges = [
    strToRanges(seedToSoilInfo),
    strToRanges(soilToFertilizerInfo),
    strToRanges(fertilizerToWaterInfo),
    strToRanges(waterToLightInfo),
    strToRanges(lightToTemperatureInfo),
    strToRanges(temperatureToHumidityInfo),
    strToRanges(humidityToLocationInfo)
]


// const res = seedRanges.reduce((resLocation, {start, length}) => {
//     console.log(start, length);
//     const minLocation = Array.from({length}, (_, i) => start + i)
//         .reduce((accLocation, seed) => {
//             const location = ranges.reduce((previous, ranges) => getMapping(previous, ranges), seed);
//             return accLocation < location ? accLocation : location;
//         }, undefined);
//     return resLocation < minLocation ? resLocation : minLocation;
// }, undefined)

const res = seeds.reduce((minLocation, seed) => {
    const location = ranges.reduce((previous, ranges) => getMapping(previous, ranges), seed);
    return minLocation < location ? minLocation : location;
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

