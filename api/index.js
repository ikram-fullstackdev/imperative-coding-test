import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type ToDo {
    id: ID
    text: String
  }

  type Query {
    todos: [ToDo]
  }
`;


const resolvers = {
  Query: {
    todos: () => [],
  },
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
