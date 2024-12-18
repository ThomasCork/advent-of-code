const fs = require('fs');
let data = fs.readFileSync('.\\input.txt', 'utf8').split("\r\n");

function readMap(data)
{
    let end, start;
    for (let row = 0; row < data.length; row++)
    {
        for (let col = 0; col < data[row].length; col++)
        {
            if (data[row][col] === "E")
                end = { row, col };

            if (data[row][col] === "S")
                start = { row, col };

            if (start && end)
                break;
        }
        if (start && end)
            break;
    }

    return {start, end};
}

let task1 = () => {
    let { start, end } = readMap(data);

    let unvisited = [];

    unvisited.push({
        row: start.row,
        col: start.col,
        dr: 0,
        dc: 1,
        cost: 0,
    });

    let visited = new Set();
    let cheapest = null;

    while (unvisited.length !== 0)
    {
        unvisited.sort((a,b) => a.cost-b.cost);

        let thisNode = unvisited.shift();
        visited.add(`${thisNode.row},${thisNode.col}`);

        if (data[thisNode.row][thisNode.col] === "E" && (!cheapest || cheapest.cost >= thisNode.cost)) {
            cheapest = thisNode;
            break;
        }

        let continueInDirection = {
            row: thisNode.row + thisNode.dr,
            col: thisNode.col + thisNode.dc,
            dr: thisNode.dr,
            dc: thisNode.dc,
            cost: thisNode.cost + 1,
        };
        let clockwiseTurn = {
            row: thisNode.row + thisNode.dc,
            col: thisNode.col + (thisNode.dr * -1),
            dr: thisNode.dc,
            dc: (thisNode.dr * -1),
            cost: thisNode.cost + 1001
        };
        let antiClockwiseTurn = {
            row: thisNode.row + (thisNode.dc * -1),
            col: thisNode.col + (thisNode.dr),
            dr: thisNode.dc * -1,
            dc: thisNode.dr,
            cost: thisNode.cost + 1001
        };

        let nextMoves = [continueInDirection, antiClockwiseTurn, clockwiseTurn];

        for (let move of nextMoves)
        {
            if (data[move.row][move.col] === "." || data[move.row][move.col] === "E")
            {
                let existingUnvisitedNode = unvisited.find(val => {
                    return (
                        val.row === move.row &&
                        val.col === move.col
                    )
                } );

                if (existingUnvisitedNode && existingUnvisitedNode.cost >= move.cost)
                {
                    existingUnvisitedNode.cost = move.cost;
                    existingUnvisitedNode.dr = move.dr;
                    existingUnvisitedNode.dc = move.dc;
                }
                else
                {
                    if (!visited.has(`${move.row},${move.col}`))
                        unvisited.push(move);
                }
            }
        }
    }

    return cheapest?.cost || 0
}
let t1_1 = performance.now();
console.log('Day 16 - Task 01 Answer: ', task1());
let t1_2 = performance.now();
console.log('Day 16 - Task 01 Performance: ',  t1_2 - t1_1);


let task2 = () => {

    let { start, end } = readMap(data);

    let unvisited = [];

    unvisited.push({
        row: start.row,
        col: start.col,
        dr: 0,
        dc: 1,
        cost: 0,
        path: []
    });

    let visited = new Set();
    let cheapest = null;

    let nodes =[]
    while (unvisited.length !== 0)
    {
        unvisited.sort((a,b) => a.cost-b.cost);

        let thisNode = unvisited.shift();
        visited.add(`${thisNode.row},${thisNode.col},${thisNode.dr},${thisNode.dc}`);

        if (data[thisNode.row][thisNode.col] === "E" && (!cheapest || cheapest.cost >= thisNode.cost)) {
            cheapest = thisNode;

            nodes.push(...thisNode.path)
        }


        let continueInDirection = {
            row: thisNode.row + thisNode.dr,
            col: thisNode.col + thisNode.dc,
            dr: thisNode.dr,
            dc: thisNode.dc,
            cost: thisNode.cost + 1,
        };
        let clockwiseTurn = {
            row: thisNode.row + thisNode.dc,
            col: thisNode.col + (thisNode.dr * -1),
            dr: thisNode.dc,
            dc: (thisNode.dr * -1),
            cost: thisNode.cost + 1001
        };
        let antiClockwiseTurn = {
            row: thisNode.row + (thisNode.dc * -1),
            col: thisNode.col + (thisNode.dr),
            dr: thisNode.dc * -1,
            dc: thisNode.dr,
            cost: thisNode.cost + 1001
        };

        let nextMoves = [continueInDirection, antiClockwiseTurn, clockwiseTurn];

        for (let move of nextMoves)
        {
            move.path = [ ...thisNode.path, thisNode ]

            if (data[move.row][move.col] === "." || data[move.row][move.col] === "E")
            {
                if (!visited.has(`${move.row},${move.col},${move.dr},${move.dc}`))
                    unvisited.push(move);
            }
        }
    }

    let seats = new Set(nodes.map(node => `${node.row},${node.col}`)).size + 1;

    return seats;

}
let t2_1 = performance.now();
console.log('Day 16 - Task 02 Answer: ', task2());
let t2_2 = performance.now();
console.log('Day 16 - Task 02 Performance: ', t2_2 - t2_1 );