const { parse } = require('@fast-csv/parse');
const fs = require('fs');

const outputColumns = new Set(['Outcome']);

let rows = [];

fs.createReadStream('./datasets/clean/diabetes.csv')
    .pipe(parse({ headers: true }))
    .on('data', (r) => {
        const input = {};
        const output = {};
        for (const [key, value] of Object.entries(r)) {
            if (outputColumns.has(key)) {
                output[key] = +value;
            } else {
                input[key] = +value;
            }
        }

        rows.push({ input, output });
    })
    .on('end', () => {
        console.log(rows);
        fs.writeFileSync('./datasets/standerdized/diabetesNoFunnction.json', JSON.stringify(rows));
    });
