const fs = require('fs');
let data = fs.readFileSync('.\\input.txt', 'utf8').split('\r\n')
    .map(line => line.split('').map(Number));

function findStartPoints(data)
{
    let startCoords = [];

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] === 0)
                startCoords.push({ y: i , x: j });
        }
    }

    return startCoords;
}

let nines = new Set();
let ninesArr = [];
function traversePath(map, coords)
{
    console.log(coords);
    let thisNumber = map[coords.y][coords.x];

    if (thisNumber === 9)
    {
        console.log("FOUND 9")
        nines.add(JSON.stringify(coords));
        return 1;
    }


    // Top
    let topCoords = { y: coords.y - 1, x: coords.x };
    let rightCoords = { y: coords.y, x: coords.x + 1 };
    let bottomCoords = { y: coords.y + 1, x: coords.x };
    let leftCoords = { y: coords.y , x: coords.x - 1 };

    let top = map?.[topCoords.y]?.[topCoords.x];
    let right = map?.[rightCoords.y]?.[rightCoords.x];
    let bottom = map?.[bottomCoords.y]?.[bottomCoords.x];
    let left = map?.[leftCoords.y]?.[leftCoords.x];

    let sum = 0;
    if (top && thisNumber + 1 === top)
    {
        sum += traversePath(map, topCoords)
    }

    if (right && thisNumber + 1 === right)
    {
        sum += traversePath(map, rightCoords)
    }

    if (bottom && thisNumber + 1 === bottom)
    {
        sum += traversePath(map, bottomCoords)
    }

    if (left && thisNumber + 1 === left)
    {
        sum += traversePath(map, leftCoords)
    }
    //
    // let topCount =
    // let rightCount = (right && thisNumber + 1 === right) ? traversePath(map, rightCoords) : 0;
    // let bottomCount = (bottom && thisNumber + 1 === bottom) ? traversePath(map, bottomCoords) : 0;
    // let leftCount = (left && thisNumber + 1 === left) ? traversePath(map, leftCoords) : 0;
    //
    //
    //
    // let sum = topCount + rightCount + bottomCount + leftCount;

    return sum;

    // console.warn(nines)

    // Right
    // Bottom
    // Left


}

let task1 = () => {
    let startPoints = findStartPoints(data);
    console.log('startPoints', startPoints)

    let pathsCount = 0;
    for (let coords of startPoints)
    {
        traversePath(data, coords);

        pathsCount += [...nines].length;
        nines.clear();
    }

    // return
    return pathsCount;

}
console.log('Day 10 - Task 01 Answer: ', task1());


let task2 = () => {
    let startPoints = findStartPoints(data);
    console.log('startPoints', startPoints)

    let pathsCount = 0;
    for (let coords of startPoints)
    {
        pathsCount += traversePath(data, coords);
    }

    // return
    return pathsCount;
}
console.log('Day 10 - Task 02 Answer: ', task2());