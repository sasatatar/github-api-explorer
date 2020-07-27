// load variables from .env file
require('dotenv').config();

module.exports = {
    client: {
        includes: ['**/*.tsx'],
        excludes: ['node_modules/*'],
        tagName: 'gql',
        service: {
            name: 'github',
            url: 'https://api.github.com/graphql',
            // optional headers
            headers: {
                authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            },
            // optional disable SSL validation check
            skipSSLValidation: true
        }
    }
}