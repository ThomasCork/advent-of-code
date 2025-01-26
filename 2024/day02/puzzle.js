const fs = require('fs');
let data = fs.readFileSync('./input.txt', 'utf8').split('\r\n');

let task1 = () => {
    let safeCount = 0;

    for (let i = 0; i < data.length; i++) {
        let levels = data[i].split(' ');

        let safe = true;
        let index = 0;
        let mode;
        let prev = 0;
        while (safe && index < levels.length)
        {
            let current = Number(levels[index]);

            if (index !== 0) {
                if (prev === current)
                {
                    safe = false;
                    break;
                }

                if (index === 1)
                {
                    if (prev > current)
                    {
                        mode = 'desc'; // Desc
                    }
                    else if (prev < current)
                    {
                        mode = 'asc'; // Asc
                    }
                }

                let diff = Math.abs(prev - current);

                if (diff > 3 || (prev > current && mode == 'asc') || (prev < current && mode == 'desc'))
                {
                    safe = false;
                    break;
                }
            }

            prev = current;
            index++;
        }

        safeCount += Number(safe);
    }

    return safeCount;
}
console.log('Day 02 - Task 01 Answer: ' + task1());


let task2 = () => {
    let safeCount = 0;

    for (let i = 0; i < data.length; i++)
    {
        let levels = data[i].split(' ');


        let check = (levels, spliceIndex) => {

            levels = JSON.parse(JSON.stringify(levels));

            if (spliceIndex !== undefined)
            {
                levels.splice(spliceIndex, 1);
            }

            let safe = true;
            let index = 0;
            let mode;
            let prev = 0;

            while (safe && index < levels.length)
            {
                let current = Number(levels[index]);

                if (index !== 0)
                {
                    if (prev === current)
                    {
                        safe = false;

                        if (spliceIndex === undefined)
                        {
                            for (let i = 0; i < levels.length; i++) {
                                let [newIndex, newSafe] = check(levels, i);

                                if (newSafe)
                                {
                                    return [newIndex, newSafe];
                                }
                            }
                        }

                        return [ index, safe ]
                    }

                    if (index === 1)
                    {
                        if (prev > current)
                        {
                            mode = 'desc'; // Desc
                        }
                        else if (prev < current)
                        {
                            mode = 'asc'; // Asc
                        }
                    }

                    let diff = Math.abs(prev - current);

                    if (diff > 3 || (prev > current && mode == 'asc') || (prev < current && mode == 'desc'))
                    {
                        safe = false;
                        if (spliceIndex === undefined)
                        {
                            for (let i = 0; i < levels.length; i++) {
                                let [newIndex, newSafe] = check(levels, i);

                                if (newSafe)
                                {
                                    return [newIndex, newSafe];
                                }
                            }
                        }

                        return [ index, safe ];
                    }
                }
                prev = current;
                index++;
            }




            return [index, safe];
        }

        let [idx, safe] = check(levels);

        // if (!safe)
        // {
        //     let lvlsBefore = JSON.stringify(levels)
        //     levels.splice(idx, 1);
        //
        //     [idx, safe] = check(levels);
        //
        //     let lvlsAfter = JSON.stringify(levels)
        //     if (!safe)
        //     {
        //         console.log(lvlsBefore, lvlsAfter)
        //     }
        // }

        safeCount += Number(safe);
    }

    return safeCount;
}

console.log('Day 02 - Task 02 Answer: ' + task2());