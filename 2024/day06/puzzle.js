const fs = require('fs');
const zlib = require("node:zlib");
let data = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

let task1 = () => {
    const DIRECTIONS = {
        UP: 0,
        RIGHT: 1,
        DOWN: 2,
        LEFT: 3
    }

    let guard = {
        x: -1,
        y: -1,
        direction: 0
    }

    let xObstacles = { };
    let yObstacles = { };

    for (let lineIndex = 0; lineIndex < data.length; lineIndex++)
    {
        let line = data[lineIndex];

        for (let characterIndex = 0; characterIndex < line.length; characterIndex++)
        {
            if (line[characterIndex] === '#')
            {
                if (!xObstacles[lineIndex])
                    xObstacles[lineIndex] = [];
                xObstacles[lineIndex].push(Number(characterIndex));

                if (!yObstacles[characterIndex])
                    yObstacles[characterIndex] = [];
                yObstacles[characterIndex].push(Number(lineIndex));
            }
            else if (line[characterIndex] === '^')
                guard = { x: characterIndex, y: lineIndex, direction: 0 };
        }
    }

    // console.log('xObstacles', xObstacles);
    // console.log('yObstacles', yObstacles);
    // console.log('guard', guard);
    let totalDistance = 0;
    let visitedTiles = new Set();

    function moveGuard(guard)
    {
        // console.log('moveGuard', guard)
        if (guard.direction === DIRECTIONS.UP)
        {
            let conflicts = yObstacles[guard.x];

            // console.log('conflicts', conflicts);
            let smallestDifference = Infinity;
            let conflicingObstacleIndex = -1;
            for (let i = 0; i < conflicts.length; i++)
            {
                let conflict = conflicts[i];
                if (conflict < guard.y)
                {
                    let diff = guard.y - conflict;
                    // console.log(diff);

                    if (diff < smallestDifference)
                    {
                        smallestDifference = diff;
                        conflicingObstacleIndex = i;
                    }
                }
            }

            if (conflicingObstacleIndex != -1)
            {
                totalDistance += smallestDifference;

                for (let i = 0; i < smallestDifference; i++)
                {
                    let visitedX = guard.x;
                    let visitedY = guard.y - i;
                    visitedTiles.add(`x=${visitedX}|y=${visitedY}`)
                }

                // console.log('tilesVisited = ', smallestDifference);
                return moveGuard({ y: conflicts[conflicingObstacleIndex]+1, x: guard.x, direction: DIRECTIONS.RIGHT});
            }
            else
            {
                totalDistance += smallestDifference;
                smallestDifference = guard.y + 1;

                for (let i = 0; i < smallestDifference; i++)
                {
                    let visitedX = guard.x;
                    let visitedY = guard.y - i;
                    visitedTiles.add(`x=${visitedX}|y=${visitedY}`)
                }

                // console.log('tilesVisited = ', smallestDifference);
                return [...visitedTiles].length;
            }
        }
        else if (guard.direction === DIRECTIONS.RIGHT)
        {
            let conflicts = xObstacles[guard.y];

            let smallestDifference = Infinity;
            let conflicingObstacleIndex = -1;
            for (let i = 0; i < conflicts.length; i++)
            {
                let conflict = conflicts[i];
                if (conflict > guard.x)
                {
                    let diff = conflict - guard.x;

                    if (diff < smallestDifference)
                    {
                        smallestDifference = diff;
                        conflicingObstacleIndex = i;
                    }
                }
            }

            if (conflicingObstacleIndex != -1)
            {

                totalDistance += smallestDifference;
                // console.log('tilesVisited = ', smallestDifference);

                for (let i = 0; i < smallestDifference; i++)
                {
                    let visitedX = guard.x + i;
                    let visitedY = guard.y;
                    visitedTiles.add(`x=${visitedX}|y=${visitedY}`)
                }

                return moveGuard({ y: guard.y, x: conflicts[conflicingObstacleIndex]-1, direction: DIRECTIONS.DOWN});
            }
            else
            {

                totalDistance += smallestDifference;
                smallestDifference = data[0].length - guard.x;
                // console.log('tilesVisited = ', smallestDifference);

                for (let i = 0; i < smallestDifference; i++)
                {
                    let visitedX = guard.x + i;
                    let visitedY = guard.y;
                    visitedTiles.add(`x=${visitedX}|y=${visitedY}`)
                }

                return [...visitedTiles].length;
            }
        }
        else if (guard.direction === DIRECTIONS.DOWN)
        {
            let conflicts = yObstacles[guard.x];

            let smallestDifference = Infinity;
            let conflicingObstacleIndex = -1;
            for (let i = 0; i < conflicts.length; i++)
            {
                let conflict = conflicts[i];
                if (conflict > guard.y)
                {
                    let diff = conflict - guard.y ;

                    if (diff < smallestDifference)
                    {
                        smallestDifference = diff;
                        conflicingObstacleIndex = i;
                    }
                }
            }

            if (conflicingObstacleIndex != -1)
            {

                totalDistance += smallestDifference;
                // console.log('tilesVisited = ', smallestDifference);
                for (let i = 0; i < smallestDifference; i++)
                {
                    let visitedX = guard.x;
                    let visitedY = guard.y + i;
                    visitedTiles.add(`x=${visitedX}|y=${visitedY}`)
                }

                return moveGuard({ y: conflicts[conflicingObstacleIndex]-1, x: guard.x , direction: DIRECTIONS.LEFT});
            }
            else
            {
                smallestDifference = data.length - guard.y;
                totalDistance += smallestDifference;
                // console.log('tilesVisited = ', smallestDifference);
                for (let i = 0; i < smallestDifference; i++)
                {
                    let visitedX = guard.x;
                    let visitedY = guard.y + i;
                    visitedTiles.add(`x=${visitedX}|y=${visitedY}`)
                }
                return [...visitedTiles].length;
            }
        }
        else if (guard.direction === DIRECTIONS.LEFT)
        {
            let conflicts = xObstacles[guard.y];

            let smallestDifference = Infinity;
            let conflicingObstacleIndex = -1;
            for (let i = 0; i < conflicts.length; i++)
            {
                let conflict = conflicts[i];
                if (conflict < guard.x)
                {
                    let diff = guard.x - conflict;

                    if (diff < smallestDifference)
                    {
                        smallestDifference = diff;
                        conflicingObstacleIndex = i;
                    }
                }
            }

            if (conflicingObstacleIndex != -1)
            {
                totalDistance += smallestDifference;
                // console.log('tilesVisited = ', smallestDifference);
                for (let i = 0; i < smallestDifference; i++)
                {
                    let visitedX = guard.x - i;
                    let visitedY = guard.y;
                    visitedTiles.add(`x=${visitedX}|y=${visitedY}`)
                }
                return moveGuard({ y: guard.y, x: conflicts[conflicingObstacleIndex]+1, direction: DIRECTIONS.UP});
            }
            else
            {
                smallestDifference = guard.x + 1;
                totalDistance += smallestDifference;
                // console.log('tilesVisited = ', smallestDifference);
                for (let i = 0; i < smallestDifference; i++)
                {
                    let visitedX = guard.x - i;
                    let visitedY = guard.y;
                    visitedTiles.add(`x=${visitedX}|y=${visitedY}`)
                }

                return [...visitedTiles].length;
            }
        }
        return null;
    }


    let result =  moveGuard(guard);

    // console.log('visitedTiles', visitedTiles);

    return result;
}
// console.log('Day 06 - Task 01 Answer: ', task1());


let task2 = () => {
    const DIRECTIONS = {
        UP: 0,
        RIGHT: 1,
        DOWN: 2,
        LEFT: 3
    }

    let guard = {
        x: -1,
        y: -1,
        direction: 0
    }

    let xObstacles = { };
    let yObstacles = { };

    for (let lineIndex = 0; lineIndex < data.length; lineIndex++)
    {
        let line = data[lineIndex];

        for (let characterIndex = 0; characterIndex < line.length; characterIndex++)
        {
            if (line[characterIndex] === '#')
            {
                if (!xObstacles[lineIndex])
                    xObstacles[lineIndex] = [];
                xObstacles[lineIndex].push(Number(characterIndex));

                if (!yObstacles[characterIndex])
                    yObstacles[characterIndex] = [];
                yObstacles[characterIndex].push(Number(lineIndex));
            }
            else if (line[characterIndex] === '^')
                guard = { x: characterIndex, y: lineIndex, direction: 0 };
        }
    }

    // console.log('xObstacles', xObstacles);
    // console.log('yObstacles', yObstacles);
    // console.log('guard', guard);
    let turnsMade= new Set()

    function moveGuard(guard)
    {
        // console.log('moveGuard', guard)
        if (guard.direction === DIRECTIONS.UP)
        {
            let conflicts = yObstacles[guard.x];

            // console.log('conflicts', conflicts);
            let smallestDifference = Infinity;
            let conflicingObstacleIndex = -1;
            // console.log('conflicts.length', conflicts.length)
            for (let i = 0; i < conflicts.length; i++)
            {
                let conflict = conflicts[i];
                if (conflict < guard.y)
                {
                    let diff = guard.y - conflict;
                    // console.log(diff);

                    if (diff < smallestDifference)
                    {
                        smallestDifference = diff;
                        conflicingObstacleIndex = i;
                    }
                }
            }

            if (conflicingObstacleIndex != -1)
            {
                let turnAtX = guard.x
                let turnAtY =  conflicts[conflicingObstacleIndex]+1;
                let turnDirection = DIRECTIONS.RIGHT;
                let turnKey = `x=${turnAtX}|y=${turnAtY}|dir=${turnDirection}`
                if (!turnsMade.has(turnKey))
                {
                    turnsMade.add(turnKey);
                    return moveGuard({ y: turnAtY, x: turnAtX , direction: turnDirection});
                }
                else
                {
                    return 1;
                }
            }
        }
        else if (guard.direction === DIRECTIONS.RIGHT)
        {
            let conflicts = xObstacles[guard.y];

            let smallestDifference = Infinity;
            let conflicingObstacleIndex = -1;
            for (let i = 0; i < conflicts?.length; i++)
            {
                let conflict = conflicts[i];
                if (conflict > guard.x)
                {
                    let diff = conflict - guard.x;

                    if (diff < smallestDifference)
                    {
                        smallestDifference = diff;
                        conflicingObstacleIndex = i;
                    }
                }
            }

            if (conflicingObstacleIndex != -1)
            {
                let turnAtX = conflicts[conflicingObstacleIndex] - 1
                let turnAtY =  guard.y;
                let turnDirection = DIRECTIONS.DOWN;
                let turnKey = `x=${turnAtX}|y=${turnAtY}|dir=${turnDirection}`

                if (!turnsMade.has(turnKey))
                {
                    turnsMade.add(turnKey);
                    return moveGuard({
                        y: turnAtY,
                        x: turnAtX,
                        direction: turnDirection
                    });
                }
                else
                {
                    return 1;
                }
            }
        }
        else if (guard.direction === DIRECTIONS.DOWN)
        {
            let conflicts = yObstacles[guard.x];

            let smallestDifference = Infinity;
            let conflicingObstacleIndex = -1;
            for (let i = 0; i < conflicts.length; i++)
            {
                let conflict = conflicts[i];
                if (conflict > guard.y)
                {
                    let diff = conflict - guard.y ;

                    if (diff < smallestDifference)
                    {
                        smallestDifference = diff;
                        conflicingObstacleIndex = i;
                    }
                }
            }

            if (conflicingObstacleIndex != -1)
            {
                let turnAtX = guard.x;
                let turnAtY =  conflicts[conflicingObstacleIndex]-1;
                let turnDirection = DIRECTIONS.LEFT;
                let turnKey = `x=${turnAtX}|y=${turnAtY}|dir=${turnDirection}`

                if (!turnsMade.has(turnKey))
                {
                    turnsMade.add(turnKey);
                    return moveGuard({
                        y: turnAtY,
                        x: turnAtX,
                        direction: turnDirection
                    });
                }
                else
                {
                    return 1;
                }
            }
        }
        else if (guard.direction === DIRECTIONS.LEFT)
        {
            let conflicts = xObstacles[guard.y];

            let smallestDifference = Infinity;
            let conflicingObstacleIndex = -1;
            for (let i = 0; i < conflicts.length; i++)
            {
                let conflict = conflicts[i];
                if (conflict < guard.x)
                {
                    let diff = guard.x - conflict;

                    if (diff < smallestDifference)
                    {
                        smallestDifference = diff;
                        conflicingObstacleIndex = i;
                    }
                }
            }

            if (conflicingObstacleIndex != -1)
            {
                let turnAtX = conflicts[conflicingObstacleIndex]+1;
                let turnAtY =  guard.y;
                let turnDirection = DIRECTIONS.UP;
                let turnKey = `x=${turnAtX}|y=${turnAtY}|dir=${turnDirection}`

                if (!turnsMade.has(turnKey))
                {
                    turnsMade.add(turnKey);
                    return moveGuard({
                        y: turnAtY,
                        x: turnAtX,
                        direction: turnDirection
                    });
                }
                else
                {
                    return 1;
                }
            }
        }

        // console.log('here', 'here')
        return 0;
    }


    let infiniteCount = 0;
    for (let lineIndex = 0; lineIndex < data.length; lineIndex++)
    {
        for (let charIndex = 0; charIndex < data[lineIndex].length; charIndex++)
        {

            if (!xObstacles[lineIndex])
            {
                xObstacles[lineIndex] = [];
            }

            if (!yObstacles[charIndex])
            {
                yObstacles[charIndex] = [];
            }

            xObstacles[lineIndex].push(charIndex);
            yObstacles[charIndex].push(lineIndex);
            turnsMade.clear()
            infiniteCount += moveGuard(guard);

            xObstacles[lineIndex].pop();
            yObstacles[charIndex].pop();
        }

        console.log('completed line ' + lineIndex);
    }
    // let result =  moveGuard(guard);


    return infiniteCount;
}
console.log('Day 06 - Task 02 Answer: ' + task2());