const fs = require('fs');
let data = fs.readFileSync('.\\input.txt', 'utf8').split('\r\n');

let task1 = () => {

    return data.reduce((acc, line ) => {

        let cardNumberMatch = Array.from(line.matchAll(/Card[ ]*(\d+)\:/g), m => m[1]);
        let cardNumber = cardNumberMatch[0];

        line = line.replace(/Card[ ]*(\d+)\:/g, '');
        let winningResultsPart = line.match(/^(.*)[|]/);
        let winningResults = Array.from(winningResultsPart[1].matchAll(/(\d+)/g), m => Number(m[1]))

        line = line.replace(winningResultsPart[0], '');
        let myPicks = Array.from(line.matchAll(/(\d+)/g), m => Number(m[1]))

        let score = myPicks.reduce((s, pick) => {
            if (winningResults.indexOf(pick) !== -1) {
                if (s === 0)
                {
                    s = 1;
                }
                else
                {
                    s *= 2;
                }
            }

            return s;
        }, 0);



        return acc + score;
    }, 0)
}
console.log('Day 04 - Task 01 Answer:', task1());

let task2 = () => {

    let EXTRA_CARDS = {};

    return data.reduce((acc, line , currentIndex, dataArr) => {

        let cardNumberMatch = Array.from(line.matchAll(/Card[ ]*(\d+)\:/g), m => m[1]);
        let cardNumber = cardNumberMatch[0];

        line = line.replace(/Card[ ]*(\d+)\:/g, '');
        console.log('line', line);
        let winningResultsPart = line.match(/^(.*)[|]/);
        let winningResults = Array.from(winningResultsPart[1].matchAll(/(\d+)/g), m => Number(m[1]))

        line = line.replace(winningResultsPart[0], '');
        let myPicks = Array.from(line.matchAll(/(\d+)/g), m => Number(m[1]))

        let wins = myPicks.reduce((w, pick) => {
            if (winningResults.indexOf(pick) !== -1) {
                console.log('winningPick', pick)
                w++;
            }
            return w;
        }, 0);

        console.log('wins', wins)
        if (wins > 0)
        {
            for (let i = 1; i <= wins; i++) {
                if (!EXTRA_CARDS[currentIndex + i])
                    EXTRA_CARDS[currentIndex + i] = 0;

                EXTRA_CARDS[currentIndex + i] += 1 + (EXTRA_CARDS[currentIndex] || 0);


                console.log('currentIndex, i, extraCards', currentIndex, i, EXTRA_CARDS[currentIndex + i])
            }
        }

        let instancesOfCard = 1 + (EXTRA_CARDS[currentIndex] || 0);
        console.log('instances of card index ' + currentIndex, instancesOfCard)
        return ++acc + (EXTRA_CARDS[currentIndex] || 0)
        // console.
    }, 0);
}
console.log('Day 04 - Task 02 Answer:', task2());

