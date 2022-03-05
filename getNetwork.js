const brain = require('brain.js');

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

module.exports = getNetwork;
