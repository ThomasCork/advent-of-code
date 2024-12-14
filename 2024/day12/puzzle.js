const fs = require('fs');
let data = fs.readFileSync('.\\input.txt', 'utf8');


function createRandomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}


let task1 = () => {

    let map = data.split('\r\n');

    let visited = new Set();

    // Returns [ perimeter, area ]
    function getPlotStats(character, row, col)
    {
        if (map?.[row]?.[col] !== character) {
            return [1, 0];
        }

        if (visited.has(`row=${row}&col=${col}`))
        {
            return [0, 0];
        }

        visited.add(`row=${row}&col=${col}`);

        let neighbourPositions = [
            [row+1, col],
            [row-1, col],
            [row, col+1],
            [row, col-1],
        ]

        let totalPerimeter = 0;
        let totalArea = 0;

        for (let i = 0; i < neighbourPositions.length; i++)
        {
            let [ nextRow, newCol ] = neighbourPositions[i];
            let [ perimeter, area] = getPlotStats(character, nextRow, newCol);

            totalPerimeter += perimeter;
            totalArea += area;
        }

        return [ totalPerimeter, totalArea + 1 ];
    }

    let perimeters = {};
    let areas = {};
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            let character = map[row][col];

            if (visited.has(`row=${row}&col=${col}`)) continue;

            let [perimeter, area] = getPlotStats(character, row, col);

            character = createRandomString(4);
            areas[character] = area;
            perimeters[character] = perimeter;
        }
    }

    let result = 0;
    for (let char in perimeters)
    {
        let perimeter = perimeters[char];
        let area = areas[char];

        result += (perimeter * area);
    }

    return result;

}
let t1_1 = performance.now();
console.log('Day 12 - Task 01 Answer: ', task1());
let t1_2 = performance.now();
console.log('Day 12 - Task 01 Performance: ',  t1_2 - t1_1);


let task2 = () => {

    let map = data.split('\r\n');

    let visited = new Set();

    // Returns [ perimeter, area ]
    function getPlotStats(character, row, col)
    {
        if (visited.has(`row=${row}&col=${col}`) || map?.[row]?.[col] !== character)
        {
            return [ 0, 0, 0];
        }

        visited.add(`row=${row}&col=${col}`);

        let neighbourPositions = [
            [row+1, col],
            [row-1, col],
            [row, col+1],
            [row, col-1],
        ]

        let totalArea = 0;
        let totalOuterCorners = 0;
        let totalInnerCorners = 0;

        for (let i = 0; i < neighbourPositions.length; i++)
        {
            let [ nextRow, newCol ] = neighbourPositions[i];
            let [ area, outerCorners, innerCorners ] = getPlotStats(character, nextRow, newCol);

            totalArea += area;
            totalOuterCorners += outerCorners;
            totalInnerCorners += innerCorners;
        }

        // Outer corners are if both of these pairs are not the same group.
        let outerCorners = [
            [[row-1, col], [row, col+1]], // tr
            [[row+1, col], [row, col+1]], // br
            [[row+1, col], [row, col-1]], // bl
            [[row-1, col], [row, col-1]], // tl
        ];

        for (let i = 0; i < outerCorners.length; i++)
        {
            let cornersPos = outerCorners[i];
            let pos1 = cornersPos[0];
            let pos2 = cornersPos[1];

            let pos1Char = map?.[pos1[0]]?.[pos1[1]];
            let pos2Char = map?.[pos2[0]]?.[pos2[1]];

            if (pos1Char !== character && pos2Char !== character)
                totalOuterCorners++;
        }

        // Inner corners are if top and left are the same but diagonal is not.
        // Here first 2 array inputs should match, third should not
        let innerCorners = [
            [[row-1, col], [row, col+1], [row-1, col+1]], // tr
            [[row+1, col], [row, col+1], [row+1, col+1]], // br
            [[row+1, col], [row, col-1], [row+1, col-1]], // bl
            [[row-1, col], [row, col-1], [row-1, col-1]], // tl
        ]

        for (let i = 0; i < innerCorners.length; i++)
        {
            let cornersPos = innerCorners[i];
            let pos1 = cornersPos[0];
            let pos2 = cornersPos[1];
            let pos3 = cornersPos[2];

            let pos1Char = map?.[pos1[0]]?.[pos1[1]];
            let pos2Char = map?.[pos2[0]]?.[pos2[1]];
            let pos3Char = map?.[pos3[0]]?.[pos3[1]];

            if (pos1Char === character && pos2Char === character && pos3Char !== character)
                totalInnerCorners++;
        }

        return [ totalArea + 1, totalInnerCorners, totalOuterCorners ];
    }

    let perimeters = {};
    let areas = {};
    let corners = {};
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            let character = map[row][col];

            if (visited.has(`row=${row}&col=${col}`)) continue;

            let [ area, innerCorners, outerCorners] = getPlotStats(character, row, col);

            character = createRandomString(4);
            areas[character] = area;
            corners[character] = innerCorners + outerCorners;
        }
    }
    console.log('areas', areas)
    console.log('corners', corners)

    let result = 0;
    for (let char in corners)
    {
        let corner = corners[char];
        let area = areas[char];

        result += (corner * area);
    }

    return result;
}
let t2_1 = performance.now();
console.log('Day 12 - Task 02 Answer: ', task2());
let t2_2 = performance.now();
console.log('Day 12 - Task 02 Performance: ', t2_2 - t2_1 );