export const typeDefs = `

enum CellType {
  EUCARYOTE
  PROCARYOTE
}

type Cell {
   id: ID
   cellType: CellType
   name: String
   color: String
   size: Int 
}

# the schema allows the following query:
type Query {
  cells: [Cell]
}

# this schema allows the following mutation:
type Mutation {
  upCell (
    id: ID!
  ): Cell
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
  mutation: Mutation
}
`