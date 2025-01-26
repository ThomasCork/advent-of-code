const fs = require('fs');
let data = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

// Task 1 - Distance
let task1 = () => {
    let left = [];
    let right = [];
    for (let i = 0; i < data.length; i++) {
        let split = data[i].split('   ');
        left.push(split[0]);
        right.push(split[1]);
    }

    left = left.sort();
    right = right.sort();
    let sum = 0;
    for (let i = 0; i < left.length; i++) {
        sum += Math.abs(left[i]-right[i]);
    }
    return sum;
}
console.log('Day 01 - Task 01 Answer: ' + task1());

// Task 2 - Similarity Score
let task2 = () => {
    let left = [];
    let right = [];
    for (let i = 0; i < data.length; i++) {
        let split = data[i].split('   ');
        left.push(split[0]);
        right.push(split[1]);
    }

    let rightOccurences = right.reduce((accumulator, val) => {
        accumulator[val] = ++accumulator[val] || 1;
        return accumulator;
    }, {});

    return left.reduce((sum, val) => {
        return sum + (val * (rightOccurences[val] || 0));
    }, 0);

}
console.log('Day 01 - Task 02 Answer: ' + task2());