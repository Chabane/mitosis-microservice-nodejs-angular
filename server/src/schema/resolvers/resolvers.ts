import { Cell, CellType } from '../../db';
import { PubSub, withFilter } from 'graphql-subscriptions';
import { info } from 'winston';

export const pubsub = new PubSub();
export const resolvers = {
  Query: {
     cellsByType: async (_, { type }) => {
      const cells = await Cell.findByType(<CellType>type);
      return cells;
    },
    cells: async () => {
      const cells = await Cell.findAll();
      return cells;
    }
  },

  Subscription: {
    newCell: {
      subscribe: pubsub.asyncIterator('newCell')
    }
  }
};

export default resolvers;