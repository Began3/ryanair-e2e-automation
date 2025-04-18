const dotenv = require('dotenv');

function loadEnv() {
    const result = dotenv.config();

    if (result.error) {
        throw result.error;
    }

    return result.parsed;
}

module.exports = { loadEnv };