import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

// Create regular NetworkInterface by using apollo-client's API:
const networkInterface = createNetworkInterface({
    uri: '/gql'
});

// Create WebSocket client
const wsClient = new SubscriptionClient(`ws://localhost:5000/gql-ws`, {
    reconnect: true,
    connectionParams: {
        // Pass any arguments you want for initialization
    }
});

// Extend the network interface with the WebSocket
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient
);

// by default, this client will send queries to `/graphql` (relative to the URL of your app)
const client = new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions
});

export function provideClient(): ApolloClient {
    return client;
}