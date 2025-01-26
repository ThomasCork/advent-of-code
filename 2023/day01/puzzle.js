const fs = require('fs');
let data = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

// Task 1 - Distance
let task1 = () => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        let line = data[i];

        let origLine = line;
        let numAsString = Array.from(line.matchAll('(\d+)'), m => m[1]).join('')

        if (numAsString)
        {

            let firstNum = numAsString[0];
            let lastNum = numAsString[numAsString.length - 1];

            sum += Number(firstNum + lastNum);
        }
    }

    return sum;
}
console.log('Day 01 - Task 01 Answer: ' + task1());

// Task 2 - Similarity Score
let task2 = () => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        let line = data[i];

        let origLine = line;
        let numAsString = Array.from(line.matchAll('(?=([0-9]|one|two|three|four|five|six|seven|eight|nine))'), m => m[1]).join('')

        if (numAsString)
        {
            numAsString = numAsString.replaceAll(/one/ig, '1');
            numAsString = numAsString.replaceAll(/two/ig, '2');
            numAsString = numAsString.replaceAll(/three/ig, '3');
            numAsString = numAsString.replaceAll(/four/ig, '4');
            numAsString = numAsString.replaceAll(/five/ig, '5');
            numAsString = numAsString.replaceAll(/six/ig, '6');
            numAsString = numAsString.replaceAll(/seven/ig, '7');
            numAsString = numAsString.replaceAll(/eight/ig, '8');
            numAsString = numAsString.replaceAll(/nine/ig, '9');

            let firstNum = numAsString[0];
            let lastNum = numAsString[numAsString.length - 1];

            sum += Number(firstNum + lastNum);
        }
    }

    return sum;
}
console.log('Day 01 - Task 02 Answer: ' + task2());