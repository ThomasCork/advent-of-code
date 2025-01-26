const fs = require('fs');
let data = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

let task1 = () => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        let line = data[i];

        let matches = Array.from(line.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g), match => ({ num1: match[1], num2: match[2]}) );

        sum +=  matches.reduce((sum, match) => {
            return sum + (match.num1 * match.num2);
        }, 0);
    }
    return sum;
}
console.log('Day 03 - Task 01 Answer: ' + task1());


let task2 = () => {
    let input = data.reduce((str, line) => {
        return str + line;
    }, "")

    input = input.replaceAll(/don't\(\).*?(?:do\(\)|$)/gm, '')

    let matches = Array.from(input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g), match => ({ num1: match[1], num2: match[2]}) );

    return matches.reduce((sum, match) => {
        return sum + (match.num1 * match.num2);
    }, 0);
}

console.log('Day 03 - Task 02 Answer: ' + task2());