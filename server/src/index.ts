import * as express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import * as path from 'path';
import * as morgan  from 'morgan';
import * as bodyParser  from 'body-parser';
import * as winston   from 'winston';
import { serveStatic } from 'serve-static';

import { KafkaConsumer } from './kafka';
import * as db from './db';
import { typeDefs, resolvers } from './schema';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(morgan('dev'));

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use('/gql', graphqlExpress({
  schema: executableSchema
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/gql',
}));

app.use('/', express.static(path.join(__dirname, 'public')));
// all other routes are handled by Angular
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.set('port', (process.env.PORT || 4000));
app.listen(app.get('port'), function () {
  winston.info('Mitosis NodeJS App listening on port ' + app.get('port'));
});

const consumer = new KafkaConsumer();
consumer.initilize();

export = app;

