const fs = require('fs');
let data = fs.readFileSync('.\\input.txt', 'utf8').split('\r\n\r\n');

let task1 = () => {
    let rulesInput = data[0];

    let rules = Array.from(rulesInput.matchAll(/(\d+)\|(\d+)/gm), m => ({ page: m[1], before: m[2]}));
    let rulesMap = rules.reduce((acc, currentValue) => {
        if (!acc[currentValue.page])
            acc[currentValue.page] = [];
        acc[currentValue.page].push(currentValue.before);
        return acc;
    }, {});

    // console.log(rulesMap)

    let pagesToProduceInput = data[1];
    let pagesToProduce = pagesToProduceInput.split('\r\n').reduce((acc, currentValue) => {
        acc.push(currentValue.split(','));
        return acc;
    }, []);

    // console.log(pagesToProduceInput)

    return pagesToProduce.reduce((acc, currentValue) => {

        function isValid(pages)
        {
            for (let i = 0; i < pages.length; i++) {
                let rulesForThisPage = rulesMap[pages[i]]
                if (!rulesForThisPage)
                    continue;

                for (let j = 0; j < rulesForThisPage.length; j++)
                {
                    let pageBefore = rulesForThisPage[j];
                    let beforeIndex = pages.indexOf(pageBefore);

                    if (beforeIndex !== -1 && beforeIndex < i)
                        return false;
                }
            }
            return true;
        }


        if (!isValid(currentValue))
            return acc;

        let middleIndex = (currentValue.length-1) / 2 ;

        return acc + Number(currentValue[middleIndex]);
    }, 0);

}
console.log('Day 05 - Task 01 Answer: ' + task1());


let task2 = () => {
    let rulesInput = data[0];
    let rules = Array.from(rulesInput.matchAll(/(\d+)\|(\d+)/gm), m => ({ page: m[1], before: m[2]}));
    let rulesMap = rules.reduce((acc, currentValue) => {
        if (!acc[currentValue.page])
            acc[currentValue.page] = [];
        acc[currentValue.page].push(currentValue.before);
        return acc;
    }, {});

    let pageNumbers = Object.keys(rulesMap);
    console.log('correctRulesOrder', pageNumbers.sort((a, b) => {
        if (rulesMap[a] && rulesMap[a].indexOf(b) !== -1 )
            return -1;

        if (rulesMap[b] && rulesMap[b].indexOf(a) !== -1 )
            return 1;

        return 0;
    }))

    let pagesToProduceInput = data[1];
    let pagesToProduce = pagesToProduceInput.split('\r\n').reduce((acc, currentValue) => {
        acc.push(currentValue.split(','));
        return acc;
    }, []);

    let middleNumbers = [];

    let answer = pagesToProduce.reduce((acc, currentValue) => {

        function isValid(pages)
        {
            for (let i = 0; i < pages.length; i++) {
                let rulesForThisPage = rulesMap[pages[i]]
                if (!rulesForThisPage)
                    continue;

                for (let j = 0; j < rulesForThisPage.length; j++)
                {
                    let pageBefore = rulesForThisPage[j];
                    let beforeIndex = pages.indexOf(pageBefore);

                    if (beforeIndex !== -1 && beforeIndex < i)
                        return false;
                }
            }
            return true;
        }


        if (isValid(currentValue))
            return acc;

        let sorted = currentValue.sort((a, b) => {
            if (rulesMap[a] && rulesMap[a].indexOf(b) !== -1 )
                return -1;

            if (rulesMap[b] && rulesMap[b].indexOf(a) !== -1 )
                return 1;

            return 0;
        })

        let middleIndex = (sorted.length-1) / 2;

        middleNumbers.push(Number(sorted[middleIndex]))
        return acc + Number(sorted[middleIndex]);
    }, 0);

    // console.log('middleNumbers', middleNumbers)
    return answer;
}
console.log('Day 05 - Task 02 Answer: ' + task2());