const { ApolloServer } = require('apollo-server')
const jwt = require('jsonwebtoken');

const connectDB = require('./db');
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers');
const config = require('./config');
const User = require('./models/User');

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(auth.substring(7), config.jwt.secret)
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser }
    }
  }
})
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})