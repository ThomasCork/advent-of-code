const fs = require('fs');
let data = fs.readFileSync('./input.txt', 'utf8').split('\r\n\r\n');

function readInput(data, big)
{

    let groups = [];
    for (let i = 0; i < data.length; i++)
    {
        let split = data[i].split('\n');


        console.log(split[0]);
        let aString = split[0].match(/(\d+)/g)
        let bString = split[1].match(/(\d+)/g);
        let prizeString = split[2].match(/(\d+)/g);

        groups.push({
            ax: Number(aString[0]),
            ay: Number(aString[1]),
            bx: Number(bString[0]),
            by: Number(bString[1]),
            px: big ? 10000000000000 + Number(prizeString[0]) : Number(prizeString[0]),
            py: big ? 10000000000000 + Number(prizeString[1]) : Number(prizeString[1])
        })
    }

    return groups;
}

let task1 = () => {

    let groups = readInput(data);

    // console.log(groups);

    let cost = 0;

    for (let i = 0; i < groups.length; i++)
    {
        let group    = groups[i];

        let aCoeff = group.ax * group.by - group.ay * group.bx;
        let rhs = group.px * group.by - group.py * group.bx;

        if(rhs % aCoeff === 0)
        {
            let a = rhs / aCoeff;
            let b = (group.px - group.ax * a) / group.bx;
            cost += a * 3 + b;
        }
    }

    return cost;
}
let t1_1 = performance.now();
console.log('Day 10 - Task 01 Answer: ', task1());
let t1_2 = performance.now();
console.log('Day 10 - Task 01 Performance: ',  t1_2 - t1_1);


let task2 = () => {

    let groups = readInput(data,true);

    console.log(groups);

    let cost = 0;

    for (let i = 0; i < groups.length; i++)
    {
        let group    = groups[i];

        let aCoeff = group.ax * group.by - group.ay * group.bx;
        let rhs = group.px * group.by - group.py * group.bx;

        if(rhs % aCoeff === 0)
        {
            let a = rhs / aCoeff;
            let b = (group.px - group.ax * a) / group.bx;
            cost += a * 3 + b;
        }
    }

    return cost;

}
let t2_1 = performance.now();
console.log('Day 10 - Task 02 Answer: ', task2());
let t2_2 = performance.now();
console.log('Day 10 - Task 02 Performance: ', t2_2 - t2_1 );