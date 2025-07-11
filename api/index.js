import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';


const typeDefs = `#graphql
  type ToDo {
    id: ID
    text: String
    isComplete: Boolean
  }

  type Query {
    todos: [ToDo]
  }

  type Mutation {
    createTodo(text: String!, isComplete: Boolean!): ToDo
  }
  
`;

const todos = [{ id: 1, text: 'hello world', isComplete: false }];

const resolvers = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    createTodo: (_, { text, isComplete }) => {
      const newTodo = { id: todos.length + 1, text, isComplete };
      todos.push(newTodo);
      console.log('New todo created:', newTodo, todos);
      return newTodo;
    },
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
