const brain = require('brain.js');
const experiment = require('./experiments/2022-03-05T18:13:16.499Z-Limited in time - LSTMTimeStep');
const getNetwork = require('./getNetwork');
const data = require('./datasets/standerdized/diabetes.json');

const crossValidate = new brain.CrossValidate(getNetwork(experiment));
const net2 = crossValidate.fromJSON(experiment.model);
let wrong = 0;

for (const row of data) {
    const res = net2.run(row.input);
    for (const [key, val] of Object.entries(res)) {
        if (Math.round(res[key]) !== row.output[key]) {
            wrong++;
            break;
        }
    }
}
const accuracy = (1 - wrong / data.length) * 100;
console.log(`Accuracy=${accuracy.toFixed(2)}%`);
