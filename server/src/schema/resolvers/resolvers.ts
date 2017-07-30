import { Cell, CellType } from '../../db';
export const resolvers = {
  Query: {
    async cellsByType(_, { type }) {
      const cells = await Cell.findByType(<CellType>type);
      return cells;
    },
  }
};

export default resolvers;