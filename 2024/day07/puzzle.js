const fs = require('fs');
let data = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

let task1 = () => {
    let inputEquations = data.map(line => {
        let lineSplit = line.split(': ');
        let total = Number(lineSplit[0]);
        let operands = lineSplit[1].split(' ').map(Number);

        return { total: total, operands: operands };
    });
    console.log('inputEquations', inputEquations);




    function calculate(expectedResult, calculatedResult, remainingNumbers) {
        // remainingNumbers = JSON.parse(JSON.stringify(remainingNumbers));
        // console.log('remainingNumbers', remainingNumbers);

        if (calculatedResult > expectedResult)
            return 0;
        else if (remainingNumbers.length === 0)
        {
            if (calculatedResult === expectedResult)
                return calculatedResult;
            else
                return 0;
        }
        else
        {
            let thisNumber = remainingNumbers[0];
            let remain = remainingNumbers.slice(1);
            let multiply = calculatedResult * thisNumber;
            let sum = calculatedResult + thisNumber;

            return calculate(expectedResult, sum, remain) || calculate(expectedResult, multiply, remain);
        }
    }

    return inputEquations.reduce((result, equation) => {
        let thisNumber = equation.operands[0];

        return result + calculate(equation.total, thisNumber, equation.operands.slice(1) )

        // return result;
    }, 0)


}
console.log('Day 07 - Task 01 Answer: ', task1());


let task2 = () => {

    let inputEquations = data.map(line => {
        let lineSplit = line.split(': ');
        let total = Number(lineSplit[0]);
        let operands = lineSplit[1].split(' ').map(Number);

        return { total: total, operands: operands };
    });
    console.log('inputEquations', inputEquations);
    let workingVersion = {

    };
    function calculate(expectedResult, calculatedResult, remainingNumbers) {
        // console.log('remainingNumbers', remainingNumbers);


        workingVersion[remainingNumbers.length] = calculatedResult;


        if (calculatedResult > expectedResult)
        {
            return 0;
        }
        else if (remainingNumbers.length === 0)
        {
            if (calculatedResult === expectedResult)
                return calculatedResult;
            else
                return 0;
        }
        else
        {
            let thisNumber = remainingNumbers[0];
            let remain = remainingNumbers.slice(1);
            let multiply = calculatedResult * thisNumber;
            let sum = calculatedResult + thisNumber;
            let concat = Number(calculatedResult + '' + thisNumber);

            return calculate(expectedResult, sum, remain) ||
                calculate(expectedResult, multiply, remain) ||
                calculate(expectedResult, concat, remain);
        }
    }

    let indexes = [];
    let sum =  inputEquations.reduce((result, equation, index) => {
        let thisNumber = equation.operands[0];
        let calculationResult = calculate(equation.total, thisNumber, equation.operands.slice(1) );

        if (calculationResult === 0)
            indexes.push(index);


        return result + calculationResult;
    }, 0)


    console.log('indexes', indexes);
    console.log(indexes.slice(-61))

    console.log('workingVersion', workingVersion);

    return sum;

}
console.log('Day 07 - Task 02 Answer: ' + task2());

