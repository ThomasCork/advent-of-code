const fs = require('fs');
let data = fs.readFileSync('.\\input.txt', 'utf8').split('\r\n');

let task1 = () => {
    function countWordOccurrences(input, word)
    {
        return Array.from(input.matchAll(word)).length;
    }

    let count = 0;
    // Check Left to right
    for (let i = 0; i < data.length; i++) {
        let line = data[i];

        // Left to right
        count += countWordOccurrences(line, 'XMAS');
        count += countWordOccurrences(line, 'SAMX');
    }


    let height = data.length;
    let width = data[0].length;

    // Construct Vertical
    for (let w = 0; w < width; w++)
    {
        let verticalLine = "";

        for (let h = 0; h < height; h++)
        {
            verticalLine+= data[h][w];
        }

        count += countWordOccurrences(verticalLine, 'XMAS');
        count += countWordOccurrences(verticalLine, 'SAMX');
    }


    // TL->BR Diagonal
    for (let startLineIndex = 0; startLineIndex < height; startLineIndex++)
    {

        let diagStr = "";
        let checkCoords = [startLineIndex, 0];
        while (data[checkCoords[0]]?.[checkCoords[1]] !== undefined)
        {
            diagStr += data[checkCoords[0]][checkCoords[1]];
            checkCoords[1]++;
            checkCoords[0]++;
        }

        count += countWordOccurrences(diagStr, 'XMAS');
        count += countWordOccurrences(diagStr, 'SAMX');
    }
    for (let startColIndex = width-1; startColIndex > 0; startColIndex--)
    {

        let diagStr = "";
        let checkCoords = [0, startColIndex];
        while (data[checkCoords[0]]?.[checkCoords[1]] !== undefined)
        {
            diagStr += data[checkCoords[0]][checkCoords[1]];
            checkCoords[1]++;
            checkCoords[0]++;
        }

        count += countWordOccurrences(diagStr, 'XMAS');
        count += countWordOccurrences(diagStr, 'SAMX');

    }

    // BL->TR Diagonal
    for (let startLineIndex = 0; startLineIndex < height; startLineIndex++)
    {

        let diagStr = "";
        let checkCoords = [startLineIndex, 0];
        while (data[checkCoords[0]]?.[checkCoords[1]] !== undefined)
        {
            diagStr += data[checkCoords[0]][checkCoords[1]];
            checkCoords[1]++;
            checkCoords[0]--
        }

        count += countWordOccurrences(diagStr, 'XMAS');
        count += countWordOccurrences(diagStr, 'SAMX');

    }

    for (let startColIndex = 1; startColIndex < width; startColIndex++)
    {

        let diagStr = "";
        let checkCoords = [height-1, startColIndex];
        while (data[checkCoords[0]]?.[checkCoords[1]] !== undefined)
        {
            diagStr += data[checkCoords[0]][checkCoords[1]];
            checkCoords[1]++;
            checkCoords[0]--
        }

        count += countWordOccurrences(diagStr, 'XMAS');
        count += countWordOccurrences(diagStr, 'SAMX');
    }



    return count;
}
console.log('Day 04 - Task 01 Answer: ' + task1());


let task2 = () => {

    function countWordOccurrences(input, word)
    {
        return Array.from(input.matchAll(word)).length;
    }

    let A_POSITIONS = data.reduce((positions, line, currentIndex) => {
        let matches = Array.from(line.matchAll(/A/g), m => m.index);

        for (let i = 0; i < matches.length; i++)
        {
            positions.push([currentIndex, matches[i]]);
        }

        return positions;
    }, [])

    let xmasCount = A_POSITIONS.reduce((count, currentValue ) => {
        let diagStrTLBR = (data[currentValue[0]-1]?.[currentValue[1]-1] || '' ) + data[currentValue[0]][currentValue[1]] + (data[currentValue[0]+1]?.[currentValue[1]+1] || '');
        let diagStrBLTR = (data[currentValue[0]+1]?.[currentValue[1]-1] || '' ) + data[currentValue[0]][currentValue[1]] + (data[currentValue[0]-1]?.[currentValue[1]+1] || '');

        if ((countWordOccurrences(diagStrBLTR, 'MAS') + countWordOccurrences(diagStrBLTR, 'SAM'))   && (countWordOccurrences(diagStrTLBR, 'MAS') +  countWordOccurrences(diagStrTLBR, 'SAM')))
            count++;


        return count;
    }, 0);

    return xmasCount;
}

console.log('Day 04 - Task 02 Answer: ' + task2());