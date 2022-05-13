const { ApolloServer} = require('apollo-server')
const connectDB = require('./db');
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers');

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})