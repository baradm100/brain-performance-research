const fs = require('fs');
const brain = require('brain.js');

const runExperiment = (experiment) => {
    const { trainConfig, kFolds, dataset, name } = experiment;
    console.log(`Starting to run: ${name}`);
    const startDate = new Date();
    const experimentResult = { ...experiment, startDate };
    const data = JSON.parse(fs.readFileSync(dataset));
    const crossValidate = new brain.CrossValidate(getNetwork(experiment));
    crossValidate.train(data, trainConfig, kFolds);
    experimentResult.model = crossValidate.toJSON();

    fs.writeFileSync(`./experiments/${startDate.toISOString()}.json`, JSON.stringify(experimentResult));
    console.log(`Done to run: ${name}`);
};

const getNetwork = (experiment) => {
    const { networkConfig, type } = experiment;
    if (type === 'NeuralNetwork') {
        return () => new brain.NeuralNetwork(networkConfig);
    } else if (type === 'LSTMTimeStep') {
        return () => new brain.recurrent.LSTMTimeStep(networkConfig);
    } else if (type === 'RNNTimeStep') {
        return () => new brain.recurrent.RNNTimeStep(networkConfig);
    } else if (type === 'GRUTimeStep') {
        return () => new brain.recurrent.GRUTimeStep(networkConfig);
    } else {
        throw new Error('Type is not supported');
    }
};

module.exports = runExperiment;
