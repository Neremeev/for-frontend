const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const graphqlRoutes = require('./graphql/routes');

const app = express();

app.use(bodyParser.json());

app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));

app.use('/',  express.static(__dirname + '/../build'));

app.use('/graphql', graphqlRoutes);

app.listen(5050, () =>
    console.log('SERVER: Express app listening on localhost:5050'));
