import { Cell, CellType } from '../../db';
import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();

export const resolvers = {
  Query: {
    async cellsByType(_, { type }) {
      /*let cell = new Cell();
      cell.name = "red";
      pubsub.publish('newCell', cell);*/
      const cells = await Cell.findByType(<CellType>type);
      return cells;
    },
  },

  Subscription: {
    newCell() {
      /*withFilter(() => pubsub.asyncIterator('newCell'), (payload, variables) => {
        return payload.type === variables.type;
      })*/
    }
  }
};

export default resolvers;