const fs = require('fs');
let data = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

let task1 = () => {
    let charPositions = {};
    let mapHeight = data.length;
    let mapWidth = data[0].length;
    let antenaPositionsSet = new Set();
    for (let lineIndex = 0; lineIndex < data.length; lineIndex++)
    {
        const line = data[lineIndex];
        let alphaNumericChars = Array.from(line.matchAll(/[0-9]|[a-z]|[A-Z]/g));

        for (let j = 0; j < alphaNumericChars.length; j++) {
            let character = alphaNumericChars[j][0];

            let charIndex = alphaNumericChars[j].index;

            if (!charPositions[character]) charPositions[character] = [];

            let posObj = { line: lineIndex, column: charIndex }
            charPositions[character].push(posObj);

            antenaPositionsSet.add(JSON.stringify(posObj));
        }
    }


    function getAntinodes(pos1, positions)
    {
        // console.log('positions', positions)
        // console.log('positions', positions)
        if (positions.length === 0)
            return [];

        let nodes = [];
        for (let pos of positions)
        {
            if (pos.line === pos1.line && pos.column === pos1.column)
                continue;


            let diffY = pos1.line - pos.line;
            let diffX = pos1.column - pos.column;
            // console.log(pos1, pos, 'diffY', diffY, 'diffX', diffX);
            let antinode = { line: pos.line - diffY, column: pos.column - diffX };
            // console.log('antinode', antinode)

            if (antinode.line < 0 || antinode.column < 0 || antinode.line >= mapHeight || antinode.column >= mapWidth)
                continue;

            nodes.push(antinode);
        }

        return nodes;
    }

    // console.log('charPositions', charPositions)

    let nodeSet = new Set();
    for (let character in charPositions)
    {
        let positions = charPositions[character];

        let antinodes = [];
        for (let i = 0; i < positions.length; i++)
        {
            let position = positions[i];
            antinodes = [...antinodes, ...getAntinodes(position, positions.toSpliced(i, 1))]
            // console.log('antinodes', antinodes)
        }

        // console.log('antinodes', character, antinodes, antinodes.length)
        antinodes.map(node => {
            nodeSet.add(JSON.stringify(node))
        })
    }

    function printMapWithNodes(nodes){
        let str = ``;
        let count = 0;
        for (let lineIndex = 0; lineIndex < data.length; lineIndex++)
        {
            let line = data[lineIndex];

            for (let node in nodes)
            {
                if (lineIndex === nodes[node].line )
                {
                    count++;
                    line = line.substring(0, nodes[node].column) + '#' + line.substring(nodes[node].column + 1);
                }
            }

            str += line;
            str += '\r\n';

        }

        console.log(str);


        return count;
    }

    // console.log(printMapWithNodes([...nodeSet].map(JSON.parse)))

    return [...nodeSet].length;
}
console.log('Day 08 - Task 01 Answer: ', task1());


let task2 = () => {
    let charPositions = {};
    let mapHeight = data.length;
    let mapWidth = data[0].length;
    let antenaPositionsSet = new Set();
    for (let lineIndex = 0; lineIndex < data.length; lineIndex++)
    {
        const line = data[lineIndex];
        let alphaNumericChars = Array.from(line.matchAll(/[0-9]|[a-z]|[A-Z]/g));

        for (let j = 0; j < alphaNumericChars.length; j++) {
            let character = alphaNumericChars[j][0];

            let charIndex = alphaNumericChars[j].index;

            if (!charPositions[character]) charPositions[character] = [];

            let posObj = { line: lineIndex, column: charIndex }
            charPositions[character].push(posObj);

            antenaPositionsSet.add(JSON.stringify(posObj));
        }
    }


    function getAntinodes(pos1, positions)
    {
        // console.log('positions', positions)
        // console.log('positions', positions)
        if (positions.length === 0)
            return [];

        let nodes = [];
        for (let pos of positions)
        {
            if (pos.line === pos1.line && pos.column === pos1.column)
                continue;

            nodes.push(pos1);

            let diffY = pos1.line - pos.line;
            let diffX = pos1.column - pos.column;
            // console.log(pos1, pos, 'diffY', diffY, 'diffX', diffX);

            let lastAntiNode = pos;

            while (!(lastAntiNode.line < 0 || lastAntiNode.column < 0 || lastAntiNode.line >= mapHeight || lastAntiNode.column >= mapWidth))
            {
                console.log('lastAntiNode', lastAntiNode);
                let antinode = {line: lastAntiNode.line - diffY, column: lastAntiNode.column - diffX};
                // console.log('antinode', antinode)

                lastAntiNode = antinode;
                if (!(antinode.line < 0 || antinode.column < 0 || antinode.line >= mapHeight || antinode.column >= mapWidth))
                {
                    nodes.push(antinode);
                }
            }
        }

        return nodes;
    }

    // console.log('charPositions', charPositions)

    let nodeSet = new Set();
    for (let character in charPositions)
    {
        let positions = charPositions[character];

        let antinodes = [];
        for (let i = 0; i < positions.length; i++)
        {
            let position = positions[i];
            antinodes = [...antinodes, ...getAntinodes(position, positions.toSpliced(i, 1))]
            // console.log('antinodes', antinodes)
        }

        // console.log('antinodes', character, antinodes, antinodes.length)
        antinodes.map(node => {
            nodeSet.add(JSON.stringify(node))
        })
    }

    function printMapWithNodes(nodes){
        let str = ``;
        let count = 0;
        for (let lineIndex = 0; lineIndex < data.length; lineIndex++)
        {
            let line = data[lineIndex];

            for (let node in nodes)
            {
                if (lineIndex === nodes[node].line )
                {
                    count++;
                    line = line.substring(0, nodes[node].column) + '#' + line.substring(nodes[node].column + 1);
                }
            }

            str += line;
            str += '\r\n';

        }

        console.log(str);


        return count;
    }

    console.log(printMapWithNodes([...nodeSet].map(JSON.parse)))

    return [...nodeSet].length;
}
console.log('Day 08 - Task 02 Answer: ', task2());