import { Cell } from '../../db';
export const resolvers = {
  Query: {
    cells() {
      return Cell.find;
    },
  },
  Mutation: {

  }
};

export default resolvers;