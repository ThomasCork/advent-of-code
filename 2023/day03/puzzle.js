const fs = require('fs');
let data = fs.readFileSync('.\\input.txt', 'utf8').split('\r\n');

// Task 2 - Similarity Score
let task1 = () => {
    // 2d array to store input
    let schematic = [];
    for ( let i = 0; i < data.length; i++ ) {
        let line = data[i];
        schematic.push(Array.from(line));
    }

    let sum = 0;
    let currentNumStr = '';
    for (let x = 0; x < schematic.length; x++) {
        let currentNumberIsPart = false;

        /**
         * (-1,-1), (0, -1), (1, -1)
         * (-1, 0), (0,0),  (1, 0)
         * (-1, 1), (0, -1), (1, 1)
         */
        for (let y = 0; y < schematic[x].length; y++) {
            let currentCharacter = schematic[x][y];

            if (!isNaN(Number(currentCharacter)))
            {
                currentNumStr += currentCharacter;

                // We don't care about checking for sybmols at this point as we already have one.
                if (currentNumberIsPart) {
                    continue;
                }

                for (let nx = -1; nx <= 1; nx++)
                {
                    // We don't care about checking for sybmols at this point as we already have one.
                    if (currentNumberIsPart)
                        break;

                    for (let ny = -1; ny <= 1; ny++)
                    {
                        // We don't care about checking for sybmols at this point as we already have one.
                        if (currentNumberIsPart)
                            break;

                        // If 0,0 it's the character we are already starting on.
                        if (nx === 0 && ny === 0)
                            continue;

                        let checkChar = schematic?.[x+nx]?.[y+ny];
                        if (checkChar !== undefined && checkChar != '.' && isNaN(Number(checkChar)))
                            currentNumberIsPart = true;
                    }
                }

            }
            else
            {
                if (currentNumberIsPart) {
                    sum += Number(currentNumStr); // '' is converted as 0 so we are all good here.
                }

                if (isNaN(Number(currentCharacter))) {
                    currentNumStr = '';
                    currentNumberIsPart = false;
                }
            }
        }

        if (currentNumberIsPart)
        {
            sum += Number(currentNumStr); // '' is converted as 0 so we are all good here.
        }
    }

    return sum;
}
console.log('Day 03 - Task 01 Answer: ' + task1());

let task2 = () => {

    // 2d array to store input
    let schematic = [];
    for ( let i = 0; i < data.length; i++ ) {
        let line = data[i];
        schematic.push(Array.from(line));
    }

    let potentialGears = {};

    let sum = 0;
    let currentNumStr = '';
    for (let x = 0; x < schematic.length; x++) {
        let currentNumberIsPart = false;


        let gearCoords = [];
        /**
         * (-1,-1), (0, -1), (1, -1)
         * (-1, 0), (0,0),  (1, 0)
         * (-1, 1), (0, -1), (1, 1)
         */
        for (let y = 0; y < schematic[x].length; y++) {
            let currentCharacter = schematic[x][y];
            if (!isNaN(Number(currentCharacter))) {
                currentNumStr += currentCharacter;


                // We don't care about checking for sybmols at this point as we already have one.
                if (currentNumberIsPart) {
                    continue;
                }

                for (let nx = -1; nx <= 1; nx++)
                {
                    // We don't care about checking for sybmols at this point as we already have one.
                    if (currentNumberIsPart)
                        break;

                    for (let ny = -1; ny <= 1; ny++)
                    {
                        // We don't care about checking for sybmols at this point as we already have one.
                        if (currentNumberIsPart)
                            break;

                        // If 0,0 it's the character we are already starting on.
                        if (nx === 0 && ny === 0)
                            continue;

                        let checkChar = schematic?.[x+nx]?.[y+ny];
                        if (checkChar === "*") {
                            currentNumberIsPart = true;
                            gearCoords = [x+nx, y+ny];
                        }
                    }
                }

            }
            else
            {
                if (currentNumberIsPart) {
                    if (!potentialGears[gearCoords[0]])
                        potentialGears[gearCoords[0]] = {};

                    if (!potentialGears[gearCoords[0]][gearCoords[1]])
                        potentialGears[gearCoords[0]][gearCoords[1]] = []

                    potentialGears[gearCoords[0]][gearCoords[1]].push(currentNumStr);
                }

                if (isNaN(Number(currentCharacter))) {
                    currentNumStr = '';
                    currentNumberIsPart = false;
                }
            }
        }

        if (currentNumberIsPart)
        {
            if (!potentialGears[gearCoords[0]])
                potentialGears[gearCoords[0]] = {};

            if (!potentialGears[gearCoords[0]][gearCoords[1]])
                potentialGears[gearCoords[0]][gearCoords[1]] = []

            potentialGears[gearCoords[0]][gearCoords[1]].push(currentNumStr);
        }
    }

    for (let y in potentialGears)
    {
        for (let x in potentialGears[y])
        {
            if (potentialGears[y][x].length === 2)
                sum += (potentialGears[y][x][0] *  potentialGears[y][x][1]);
        }
    }

    return sum;
}
console.log('Day 03 - Task 02 Answer: ' + task2());

