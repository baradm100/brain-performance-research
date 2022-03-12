const fs = require('fs');
const brain = require('brain.js');
const getNetwork = require('./getNetwork');

const runExperiment = (experiment) => {
    const { trainConfig, kFolds, dataset, name } = experiment;
    console.log(`Starting to run: ${name}`);
    const startDate = new Date();
    const experimentResult = { ...experiment, startDate };
    const data = JSON.parse(fs.readFileSync(dataset));
    const crossValidate = new brain.CrossValidate(getNetwork(experiment));
    const stats = crossValidate.train(data, trainConfig, kFolds);
    experimentResult.trainTime = new Date() - startDate;
    experimentResult.model = crossValidate.toJSON();
    experimentResult.stats = stats;

    const net = crossValidate.toNeuralNetwork();
    let wrong = 0;
    for (const row of data) {
        const res = net.run(row.input);
        for (const [key, val] of Object.entries(res)) {
            if (Math.round(res[key]) !== row.output[key]) {
                wrong++;
                break;
            }
        }
    }
    const accuracy = 1 - wrong / data.length;
    experimentResult.accuracy = accuracy;

    fs.writeFileSync(
        `./experiments/${startDate.toISOString()}-${name}.json`,
        JSON.stringify(experimentResult, null, 2),
    );
    console.log(`Done to run: ${name}`);
};

module.exports = runExperiment;
