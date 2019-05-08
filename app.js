const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./schema/schema');
const devkeys = require('./dev');

const app = express();

// Connect to MongoDB Atlas
mongoose.connect(`mongodb+srv://shaun:${devkeys["mongodb-atlas-password"]}@cluster0-l88bj.mongodb.net/test?retryWrites=true`);
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});