const fs = require('fs');
let data = fs.readFileSync('./input.txt', 'utf8');

function readInput(data) {
    let [ mapString, moveString ] = data.split('\r\n\r\n');

    let map = mapString.split('\r\n').map(line => line.split(''));
    console.log('map', map);

    let moves = moveString.split('\r\n').map(line => line.split('')).reduce((acc, val) => [...acc, ...val], []);
    console.log('moves', moves)

    let robotLocation;
    for (let row = 0; row < map.length; row++)
    {
        for (let col = 0; col < map[row].length; col++)
        {
            if (map[row][col] === '@')
            {
                robotLocation = { row, col };
                break;
            }
        }

        if (robotLocation)
        {
            break;
        }
    }

    console.log('robotLocation', robotLocation)

    return { map, moves, robotLocation };
}

function printMap(map)
{
    map.map(line => {
        console.log(line.join(''))
    })
}

function swap(map, loc1, loc2)
{
    let temp = map[loc1.row][loc1.col];

    map[loc1.row][loc1.col] = map[loc2.row][loc2.col];
    map[loc2.row][loc2.col] = temp;

    return map;
}


let task1 = () => {
    let input = readInput(data);

    let robot = input.robotLocation;
    let map = input.map;

    let moveDirection = {
        "^": [ -1, 0 ],
        ">": [ 0, 1 ],
        "v": [ 1, 0 ],
        "<": [ 0, -1 ],
    }

    console.log('\r\n\r\n==== START ==== ')
    printMap(map);

    for (let move = 0; move < input.moves.length; move++)
    {
        let moveCoords = moveDirection[input.moves[move]];

        let potentialRobotLocation = {
            row: robot.row + moveCoords[0],
            col: robot.col + moveCoords[1],
        }

        let newLocationCharacter = map[potentialRobotLocation.row][potentialRobotLocation.col];

        if (newLocationCharacter === "#")
        {

        }
        else if (newLocationCharacter === ".")
        {
            swap(map, robot, potentialRobotLocation);

            robot.row = potentialRobotLocation.row;
            robot.col = potentialRobotLocation.col;
        }
        else if (newLocationCharacter === "O")
        {
            let boxLocation = {};
            Object.assign(boxLocation, potentialRobotLocation);

            // Look for next . or #, while counting the . chars
            let nextMove = {
                row: potentialRobotLocation.row + moveCoords[0],
                col: potentialRobotLocation.col + moveCoords[1],
            };

            let boxes = 0;
            while (map[nextMove.row][nextMove.col] !== "#")
            {
                if (map[nextMove.row][nextMove.col] !== "O")
                {
                    swap(map, boxLocation, nextMove);

                    if (map[nextMove.row][nextMove.col] === ".")
                        break;
                }

                nextMove.row += moveCoords[0];
                nextMove.col += moveCoords[1];
            }

            if ( map[potentialRobotLocation.row][potentialRobotLocation.col] === ".")
            {
                swap(map, robot, potentialRobotLocation);

                robot.row = potentialRobotLocation.row;
                robot.col = potentialRobotLocation.col;
            }
        }
    }

    let score = 0;
    for (let row = 0; row < map.length; row++)
    {
        for (let col = 0; col < map[row].length; col++)
        {
            if (map[row][col] === "O")
            {
                score += (100 * row + col)
            }
        }
    }

    return score;
}
let t1_1 = performance.now();
console.log('Day 10 - Task 01 Answer: ', task1());
let t1_2 = performance.now();
console.log('Day 10 - Task 01 Performance: ',  t1_2 - t1_1);


let task2 = () => {

}
let t2_1 = performance.now();
console.log('Day 10 - Task 02 Answer: ', task2());
let t2_2 = performance.now();
console.log('Day 10 - Task 02 Performance: ', t2_2 - t2_1 );