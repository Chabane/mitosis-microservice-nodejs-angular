import { Cell } from '../../db';
export const resolvers = {
  Query: {
    async cells() {
      const cells = await Cell.find({}).exec();
      return cells;
    },
  },
  Mutation: {

  }
};

export default resolvers;