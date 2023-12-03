export function getNumberCoordinates(x, y, matrix) {
    const coordinates = [];
    // find coordinates around given coordinates
    // ignore coordinates which do not contain numbers
    for (let i = y === 0 ? y : y - 1; i <= y + 1 && i < matrix.length; i++) {
        for (let j = x === 0 ? x : x - 1; j <= x + 1 && j < matrix[y].length; j++) {
            (i !== y || j !== x) && !isNaN(parseInt(matrix[i][j])) && coordinates.push({y: i, x: j});
        }
    }
    return coordinates;
}

export function removeDuplicateCoordinates(coordinates) {
    return Array
        .from(
            new Set(coordinates.map(({x, y}) => `${y}-${x}`)),
            c => {
                const [y, x] = c.split('-');
                return {x: parseInt(x), y: parseInt(y)};
            });
}

export function getNumberAndCoordinatesFromMatrix({x, y}, matrix) {
    const c = matrix[y][x];
    // Explore left
    let coordinates = [`${y}-${x}`];
    let before = [];
    for (let i = x === 0 ? x : x - 1, m = matrix[y][i]; i >= 0 && i < x && !isNaN(parseInt(m)); i--, m = matrix[y][i]) {
        coordinates.push(`${y}-${i}`);
        before = [m, ...before];
    }
    // Explore right
    let after = [];
    for (let i = x === matrix[y].length ? x : x + 1, m = matrix[y][i]; i < matrix[y].length && i > x && !isNaN(parseInt(m)); i++, m = matrix[y][i]) {
        coordinates.push(`${y}-${i}`);
        after = [...after, m];
    }
    return [parseInt([...before, c, ...after].join(''), 10), coordinates];
}

export function getNumbersAroundSymbol(y, x, existing) {
    const coordinates = getNumberCoordinates(x, y);
}

export function isCoordinateInExisting(coordinate, existing) {
    return existing.includes(`${coordinate.y}-${coordinate.x}`);
}
