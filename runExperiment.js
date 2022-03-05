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
    crossValidate.train(data, trainConfig, kFolds);
    experimentResult.model = crossValidate.toJSON();

    fs.writeFileSync(`./experiments/${startDate.toISOString()}-${name}.json`, JSON.stringify(experimentResult));
    console.log(`Done to run: ${name}`);
};

module.exports = runExperiment;
