const fs = require('fs');
let data = fs.readFileSync('./input.txt', 'utf8');

function readInput(data) {
    let lines = data.split('\r\n');

    return lines.reduce((acc, line) => {

        let [ positionString, velocityString ] = line.split(' ');

        let [ posX, posY ] = positionString.split('=')[1].split(',').map(Number);
        let [ velX, velY ] = velocityString.split('=')[1].split(',').map(Number);

        acc.push({
            position: {
                row: posY,
                col: posX
            },
            velocity: {
                row: velY,
                col: velX
            }
        });

        return acc;
    }, []);
}

function printMap(positions, height, width)
{
    console.log(positions);
    let map = new Array(height);
    for (let i = 0; i < map.length; i++)
    {
        map[i] = [];
        for (let j = 0; j < width; j++)
        {
            map[i].push(".");
        }
    }

    for (let pos of positions)
    {
        let mapLocation = map[pos.row][pos.col];
        if (mapLocation)
            map[pos.row][pos.col] = isNaN(Number(mapLocation)) ? 1 : Number(mapLocation) + 1;
    }

    map.map(val => console.log(val.join('')))
}

let task1 = () => {
    let robots = readInput(data);
    console.log(robots);

    // let ROOM_WIDTH = 11;
    // let ROOM_HEIGHT = 7;
    // let DURATION = 100;

    let ROOM_WIDTH = 101;
    let ROOM_HEIGHT = 103;
    let DURATION = 100;

    let quadrantsCount = [0,0,0,0];

    let positions = [];
    for (let i = 0; i < robots.length; i++)
    {
        let robot = robots[i];

        // JS can return negative numbers for modulus of negative?!?!
        let endRow = (((robot.position.row + robot.velocity.row * DURATION) % ROOM_HEIGHT) + ROOM_HEIGHT) % ROOM_HEIGHT;
        let endCol = (((robot.position.col + robot.velocity.col * DURATION) % ROOM_WIDTH) + ROOM_WIDTH) % ROOM_WIDTH;

        positions.push({
            row: endRow,
            col: endCol
        });

        if (endRow < Math.floor(ROOM_HEIGHT / 2))
        {
            if (endCol < Math.floor(ROOM_WIDTH / 2)) quadrantsCount[0]++;
            else if (endCol > Math.floor(ROOM_WIDTH / 2)) quadrantsCount[1]++;
        }
        else if (endRow > Math.floor(ROOM_HEIGHT / 2))
        {
            if (endCol < Math.floor(ROOM_WIDTH / 2)) quadrantsCount[2]++;
            else if (endCol > Math.floor(ROOM_WIDTH / 2)) quadrantsCount[3]++;
        }
    }

    // console.log(positions)

    printMap(positions, ROOM_HEIGHT, ROOM_WIDTH);

    console.log(quadrantsCount);

    let count = 1;
    for (let i = 0; i < quadrantsCount.length; i++)
    {
        // console.log(count);
        // console.log(quadrantsCount[i]);
        count *= Number(quadrantsCount[i]) || 1
    }
    // console.log(count);

    return count;
}
let t1_1 = performance.now();
console.log('Day 10 - Task 01 Answer: ', task1());
let t1_2 = performance.now();
console.log('Day 10 - Task 01 Performance: ',  t1_2 - t1_1);


let task2 = () => {
    let robots = readInput(data);
    console.log(robots);

    let ROOM_WIDTH = 101;
    let ROOM_HEIGHT = 103;

    let MAX_SECONDS = 1000000;
    let attempt = 0;

    let uniquePositions = 0;
    let minTime = 0;
    let positions = new Set();
    while (attempt !== ROOM_HEIGHT * ROOM_WIDTH)
    {
        attempt++;

        for (let i = 0; i < robots.length; i++)
        {
            let robot = robots[i];

            // JS can return negative numbers for modulus of negative?!?!
            let endRow = (((robot.position.row + robot.velocity.row * attempt) % ROOM_HEIGHT) + ROOM_HEIGHT) % ROOM_HEIGHT;
            let endCol = (((robot.position.col + robot.velocity.col * attempt) % ROOM_WIDTH) + ROOM_WIDTH) % ROOM_WIDTH;

            positions.add(JSON.stringify({
                row: endRow,
                col: endCol
            }))
        }

        if (positions.size > uniquePositions)
        {
            uniquePositions = positions.size;
            minTime = attempt;
        }

        positions.clear();
    }

    positions.clear();
    for (let i = 0; i < robots.length; i++)
    {
        let robot = robots[i];

        // JS can return negative numbers for modulus of negative?!?!
        let endRow = (((robot.position.row + robot.velocity.row * minTime) % ROOM_HEIGHT) + ROOM_HEIGHT) % ROOM_HEIGHT;
        let endCol = (((robot.position.col + robot.velocity.col * minTime) % ROOM_WIDTH) + ROOM_WIDTH) % ROOM_WIDTH;

        positions.add(JSON.stringify({
            row: endRow,
            col: endCol
        }))
    }

    printMap([...positions].map(JSON.parse), ROOM_HEIGHT, ROOM_WIDTH)

    return minTime;
}
let t2_1 = performance.now();
console.log('Day 10 - Task 02 Answer: ', task2());
let t2_2 = performance.now();
console.log('Day 10 - Task 02 Performance: ', t2_2 - t2_1 );