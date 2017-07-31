import * as express from "express";
import { createServer } from 'http';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import * as path from 'path';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as winston from 'winston';
import { serveStatic } from 'serve-static';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import { KafkaConsumer } from './kafka';
import * as db from './db';
import { typeDefs, resolvers } from './schema';


export class Server {
  app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use(morgan('dev'));

    let executableSchema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });

    this.app.use('/gql', graphqlExpress({
      schema: executableSchema
    }));

    this.app.use('/graphiql', graphiqlExpress({
      endpointURL: '/gql',
      subscriptionsEndpoint: `ws://localhost:4000/subscriptions`
    }));

    const WS_PORT = 5000;

    // Create WebSocket listener server
    const websocketServer = createServer((request, response) => {
      response.writeHead(404);
      response.end();
    });

    // Bind it to port and start listening
    websocketServer.listen(WS_PORT, () => winston.info("Listening on " + WS_PORT));

    const subscriptionServer = SubscriptionServer.create(
      {
        schema: executableSchema,
        execute: execute,
        subscribe: subscribe
      },
      {
        server: websocketServer,
        path: '/gql-ws',
      },
    );

    this.app.use('/', express.static(path.join(__dirname, '../public')));
    // all other routes are handled by Angular
    this.app.get('/*', function (req, res) {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    let consumer = new KafkaConsumer();
    consumer.initialize();
  }
}

