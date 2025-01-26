const fs = require('fs');
let data = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

// Task 1 - Distance
let task1 = () => {
    let MAX_COLOURS = {
        red: 12,
        green: 13,
        blue: 14
    };

    let sumOfIds = 0;
    for (let i = 0; i < data.length; i++)
    {
        let line = data[i];

        let rounds = line.replace(/Game (\d+):[ ]/, '').split(';')

        let gamePossible = true;
        for (var j = 0; j < rounds.length; j++)
        {
            let handObj = Array.from(rounds[j].matchAll(/(\d+)[ ](\w+)/g)).reduce((obj, match) => {
                obj[match[2]] = Number(match[1]);
                return obj;
            }, {})

            for (let colour in handObj)
            {
                if (handObj[colour] > MAX_COLOURS[colour])
                {

                    gamePossible = false;
                    break;
                }
            }

        }

        if (gamePossible)
        {
            let gameId = Number(line.match(/Game (\d+)/)[1]);
            sumOfIds += gameId;
        }
    }

    return sumOfIds;
}
console.log('Day 02 - Task 01 Answer: ' + task1());

// Task 2 - Similarity Score
let task2 = () => {
    let power = 0;
    for (let i = 0; i < data.length; i++)
    {
        let line = data[i];

        let rounds = line.replace(/Game (\d+):[ ]/, '').split(';')

        let gameMaxes = {
            red: 0,
            green: 0,
            blue: 0
        };
        for (var j = 0; j < rounds.length; j++)
        {
            let handObj = Array.from(rounds[j].matchAll(/(\d+)[ ](\w+)/g)).reduce((obj, match) => {
                obj[match[2]] = Number(match[1]);
                return obj;
            }, {})

            for (let colour in handObj)
            {
                if (handObj[colour] > gameMaxes[colour])
                {
                    gameMaxes[colour] = handObj[colour];
                }
            }

        }

        power += (gameMaxes.red * gameMaxes.green * gameMaxes.blue);

    }

    return power;
}
console.log('Day 02 - Task 02 Answer: ' + task2());