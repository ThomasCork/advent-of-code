const fs = require('fs');

let task1 = () => {

    let data = fs.readFileSync('.\\input.txt', 'utf8').split(" ").map(Number);

    let blink = (number) => {
        if (number === 0)
            return [1]

        let numString = String(number);
        if (numString.length % 2 === 0)
        {
            let arr = [
                Number(numString.substring(0, numString.length/2)),
                Number(numString.substring(numString.length/2))
            ];

            return arr;
        }

        let calc =  [number * 2024];
        return calc;
    }

    console.log(`Iteration 0: \t`, data.join(" "))
    let iteration = 1;
    while (iteration <= 2)
    {
        let resultArr = [];
        for (let num of data)
        {
            resultArr = [...resultArr, ...blink(num)];
        }

        data = resultArr;
        console.log(`Iteration ${iteration}: \t`, data.length)
        iteration++;
    }

    return data.length;
}
let t1_1 = performance.now();
console.log('Day 10 - Task 01 Answer: ', task1());
let t1_2 = performance.now();
console.log('Day 10 - Task 01 Performance: ',  t1_2 - t1_1);


let task2 = () => {

    let data = fs.readFileSync('.\\input.txt', 'utf8').split(" ").map(Number);

    let cache = {};

    let blink = (number) => {

        number = Number(number);

        if (number === 0)
            return [1]

        let numString = String(number);
        if (numString.length % 2 === 0)
        {
            let arr = [
                Number(numString.substring(0, numString.length/2)),
                Number(numString.substring(numString.length/2))
            ];

            return arr;
        }

        let calc =  [number * 2024];
        return calc;
    }

    let blinkCached = (number, count) => {
        if (!cache[number])
        {
            cache[number] = blink(number);
        }


        return cache[number].reduce((obj, val) => {
            obj[val] = obj[val] ? obj[val] + count : count;
            return obj;
        }, {});
    }


    let groupedNums = {};
    groupedNums = data.reduce((acc, val) => {
        if (!acc[val]) acc[val] = 0;
        acc[val]++;

        return acc;
    }, {});

    let iteration = 1;
    while (iteration <= 75)
    {
        let newGroup = {};
        for (let num in groupedNums)
        {
            // [{ '20': 300 }, {  '0': 300 }  ]
            let blinkResult = blinkCached(num, groupedNums[num]);


            for (let key in blinkResult) {

                    if (!newGroup[key])
                        newGroup[key] = 0;

                    newGroup[key] += blinkResult[key];
            }
        }

        groupedNums = newGroup
        console.log(`Iteration ${iteration}: \t`)
        iteration++;
    }

    let cnt = 0;
    for (let group in groupedNums)
    {
        // let number = groupedNums[group];
        cnt += groupedNums[group];
    }

    return cnt;
}
let t2_1 = performance.now();
console.log('Day 10 - Task 02 Answer: ', task2());
let t2_2 = performance.now();
console.log('Day 10 - Task 02 Performance: ', t2_2 - t2_1 );