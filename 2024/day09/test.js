const fs = require('fs');
let input = fs.readFileSync('.\\input.txt', 'utf8');

let diskMap = input.split('');

let blocks = generateBlocks(diskMap);
// console.log('File System', blocks.join(''));

sortFileSystem();
// console.log('Sorted File System',blocks.join(''))

let checkSum = calcCheckSum();
console.log('checkSum',checkSum);

function generateBlocks(diskMap)
{
    let blocks = [];
    let currentFileId = 0;
    let mode = 'file';
    for (let i = 0; i < diskMap.length; i++)
    {
        let currentDiskMap = Number(diskMap[i]);

        for(let i = 0; i < currentDiskMap; i++)
        {
            if (mode === 'file') blocks.push(currentFileId.toString());
            else if (mode === 'space') blocks.push('.');
        }

        if(mode === 'file') currentFileId++;
        mode = mode === 'file' ? 'space' : 'file';
    }

    return blocks;
}

function sortFileSystem()
{
    // sort file system
    for(let i = 0; i < blocks.length; i++)
    {
        if(blocks[i] && blocks[i] === '.')
        {
            for (let j = blocks.length; j > 0; j--)
            {
                if(j === i) return;

                if( blocks[j] && blocks[j] !== '.')
                {
                    let temp = blocks[i];
                    blocks[i] = blocks[j];
                    blocks[j] = temp;
                    break;
                }
            }
        }
    }
}

function calcCheckSum()
{
    let checkSum = 0;
    for(let i = 0; i < blocks.length; i++)
    {
        if(blocks[i] === '.') continue;

        checkSum += Number(blocks[i]) * i;
    }
    return checkSum;
}