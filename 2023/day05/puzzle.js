const fs = require('fs');
let data = fs.readFileSync('./input.txt', 'utf8').split('\r\n\r\n');


let task1 = () => {

    let seeds = [];
    let sections = {};
    for (let i = 0; i < data.length; i++)
    {
        let section = data[i];

        let thisSectionData = {};
        let sectionNameRegex = /((\w+)(?:-\w+-(\w+))?)(?: map)?\:(?:\r\n)?/
        let sectionName = section.match(sectionNameRegex);

        thisSectionData = {
            name: sectionName[1],
            from: sectionName[2],
            to: sectionName[3],
            rawInput: section,
            dataLines: [],
            data: []
        }

        thisSectionData.dataLines = section.replace(sectionNameRegex, '').split('\r\n');

        thisSectionData.dataLines.map((line) => {
            let numbers = Array.from(line.matchAll(/(\d+)/g), m => Number(m[1]));

            if (thisSectionData.name !== 'seeds')
            {
                let obj = {
                    destination_start: numbers[0],
                    destination_end: numbers[0] + (numbers[2]-1),
                    source_start: numbers[1],
                    source_end: numbers[1] + (numbers[2]-1),
                    range_length: numbers[2]
                }
                thisSectionData.data.push(obj);
            }
            else
            {
                seeds = numbers;
            }
        })


        if (thisSectionData.name !== 'seeds')
        {
            sections[thisSectionData.from] = thisSectionData;
        }
    }

    function searchMap(source, sourceId)
    {
        console.log(`searching map using ${source} id ${sourceId}`)
        let sectionToSearchIn = sections[source];
        console.log(sectionToSearchIn?.name)

        if (!sectionToSearchIn)
            return sourceId;

        let sectionData = sectionToSearchIn.data;

        // Default to source id if we find none
        let destinationId = sourceId;
        for (let i = 0; i < sectionData.length; i++)
        {
            let dataRow = sectionData[i];

            console.log('dataRow.source_start, sourceId < dataRow.source_end', dataRow.source_start, dataRow.source_end)
            if (sourceId >= dataRow.source_start && sourceId <= dataRow.source_end)
            {
                destinationId = dataRow.destination_start + (sourceId - dataRow.source_start);
                // console.log('sectionToSearchIn', sectionToSearchIn)
            }
        }

        console.log(`found ${sectionToSearchIn.to} id ${destinationId}`);
        console.log('-----')

        return searchMap(sectionToSearchIn.to, destinationId);
    }

    let minLocation = Number.MAX_VALUE;
    for (let i = 0; i < seeds.length; i++)
    {
        let location = searchMap('seed', seeds[i]);

        if (location < minLocation)
            minLocation = location;
    }

    return minLocation;
}
console.log('Day 05 - Task 01 Answer:', task1());

let task2 = () => {

    let seeds = [];
    let sections = {};
    for (let i = 0; i < data.length; i++)
    {
        let section = data[i];

        let thisSectionData = {};
        let sectionNameRegex = /((\w+)(?:-\w+-(\w+))?)(?: map)?\:(?:\r\n)?/
        let sectionName = section.match(sectionNameRegex);

        thisSectionData = {
            name: sectionName[1],
            from: sectionName[2],
            to: sectionName[3],
            rawInput: section,
            dataLines: [],
            data: []
        }

        thisSectionData.dataLines = section.replace(sectionNameRegex, '').split('\r\n');

        thisSectionData.dataLines.map((line) => {
            let numbers = Array.from(line.matchAll(/(\d+)/g), m => Number(m[1]));

            if (thisSectionData.name !== 'seeds')
            {
                let obj = {
                    destination_start: numbers[0],
                    destination_end: numbers[0] + (numbers[2]-1),
                    source_start: numbers[1],
                    source_end: numbers[1] + (numbers[2]-1),
                    range_length: numbers[2]
                }
                thisSectionData.data.push(obj);
            }
            else
            {
                seeds = numbers;
            }
        })


        if (thisSectionData.name !== 'seeds')
        {
            sections[thisSectionData.from] = thisSectionData;
        }
    }


    function searchMap(source, sourceId, range)
    {
        // console.log(`searching map using ${source} id ${sourceId} range ${range}`)
        let sectionToSearchIn = sections[source];
        // console.log(sectionToSearchIn?.name)

        if (!sectionToSearchIn)
            return [sourceId, range];

        let sectionData = sectionToSearchIn.data;

        // Default to source id if we find none
        let destinationId = sourceId;
        for (let i = 0; i < sectionData.length; i++)
        {
            let dataRow = sectionData[i];

            // console.log('dataRow.source_start, sourceId < dataRow.source_end', dataRow.source_start, dataRow.source_end)
            if (sourceId >= dataRow.source_start && sourceId <= dataRow.source_end)
            {
                let difference = sourceId - dataRow.source_start;
                destinationId = dataRow.destination_start + difference;

                // console.log(`found ${sectionToSearchIn.to} id ${destinationId} `);
                return searchMap(sectionToSearchIn.to, destinationId, Math.min(range, dataRow.range_length - difference));
                // console.log('sectionToSearchIn', sectionToSearchIn)
            }
        }

        // console.log(`not found ${sectionToSearchIn.to} returning id ${destinationId} `);
        // console.log('-----')

        return searchMap(sectionToSearchIn.to, destinationId, 1);
    }

    let minLocation = Number.MAX_VALUE;
    for (let i = 0; i < seeds.length; i += 2)
    {
        let seed = seeds[i];
        let seedRange = seeds[i + 1];

        let remaining = seedRange;
        let start = seed;

        while (remaining > 0)
        {
            let loc = searchMap('seed', start, remaining);

            remaining -= loc[1];
            start += loc[1];

            minLocation = Math.min(loc[0], minLocation);
        }
    }

    return minLocation;
}
console.log('Day 05 - Task 02 Answer:', task2());

