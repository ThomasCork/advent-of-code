const fs = require('fs');
let data = fs.readFileSync('./input.txt', 'utf8');

let task1 = () => {
    let chars = data.split('');

    let unpacked = [];
    for (let i = 0; i < chars.length; i++) {
        let number = Number(chars[i]);

        for (let j = 0; j < number; j++)
        {
            if (i % 2 === 0)
            {
                unpacked.push(i / 2);
            }
            else
            {
                unpacked.push(".");
            }
        }
    }

    for (let i = 0; i < unpacked.length; i++)
    {
        if (i >= unpacked.length)
            break;

        // If blank spot
        if (unpacked[i] && unpacked[i] === ".")
        {
            while (i < unpacked.length)
            {
                let temp = unpacked.pop();

                if (temp && temp !== ".")
                {
                    unpacked[i] = temp;
                    break;
                }
            }
        }
    }

    let checksum = unpacked.reduce((checksum, currentValue, index) => {
        return checksum + (index * currentValue)
    }, 0);
    return checksum;
}
console.log('Day 09 - Task 01 Answer: ', task1());


let task2 = () => {
    let chars = data.split('');

    function readInput(chars) {
        let unpacked = [];
        for (let i = 0; i < chars.length; i++) {
            let number = Number(chars[i]);

            for (let j = 0; j < number; j++) {
                if (i % 2 === 0) {
                    unpacked.push(i / 2);
                } else {
                    unpacked.push(".");
                }
            }
        }

        return unpacked;
    }

    let unpacked = readInput(chars);

    // console.log(unpacked.join(""))


    let visited = new Set();

    function getNextGroup(unpacked) {
        let index;
        let number;

        for (let i = unpacked.length -1; i >= 0; i--)
        {


            if (unpacked[i] && unpacked[i] !== "." && !visited.has(unpacked[i]))
            {
                // console.log('visited', unpacked[i])
                visited.add(unpacked[i]);

                let firstIndex = unpacked.indexOf(unpacked[i]);
                // console.log('firstIndex', firstIndex, i - firstIndex + 1)
                return { id: unpacked[i], index: firstIndex, length: i - firstIndex + 1 };
            }
        }

        return null;
    }

    function getNextAvailableSpace(unpacked, size)
    {
        let nextAvailableSpaceStartIndex = 0;
        let count = 0;
        for (let i = 0; i < unpacked.length; i++)
        {
            if (unpacked[i] === ".") {
                if (count === 0 || nextAvailableSpaceStartIndex + count < i)
                {
                    nextAvailableSpaceStartIndex = i;
                    count = 1;
                }
                else
                {
                    count++;
                }

                if (count === size)
                {
                    return { character: ".", index: nextAvailableSpaceStartIndex, length: count };
                }
            }
        }

        return null;
    }

    let nextGroup = true;
    while (nextGroup)
    {
        let nextGroup = getNextGroup(unpacked);

        if (!nextGroup)
            break;
        // console.log('nextGroup', nextGroup)
        let nextAvailableSpace = getNextAvailableSpace(unpacked, nextGroup.length);

        // console.log('no available space found for', nextGroup )
        if (!nextAvailableSpace)
            continue;

        if (nextGroup.index > nextAvailableSpace.index)
        {
            let numbersRemoved = unpacked.splice(nextGroup.index, nextGroup.length, ...new Array(nextGroup.length).fill( "."));
            unpacked.splice(nextAvailableSpace.index, nextAvailableSpace.length, ...numbersRemoved);
        }
    }


    // console.log(unpacked.join(""));
    let checksum = unpacked.reduce((checksum, currentValue, index) => {

        if (currentValue != ".")
            return checksum + (index * Number(currentValue));
        return checksum;
    }, 0);

    function calcCheckSum()
    {
        let checkSum = 0;
        for(let i = 0; i < unpacked.length; i++)
        {
            if(unpacked[i] === '.') continue;

            checkSum += Number(unpacked[i]) * i;
        }
        return checkSum;
    }

    checksum = calcCheckSum()
    return checksum;
}
console.log('Day 09 - Task 02 Answer: ', task2());