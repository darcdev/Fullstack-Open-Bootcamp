const jwt = require('jsonwebtoken');
const Book = require('../models/Book');
const Author = require('../models/Author');
const User = require('../models/User');
const config = require('../config');
const { UserInputError, AuthenticationError } = require('apollo-server');

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorsCount: () => Author.collection.countDocuments(),
    allBooks: async (obj, args) => {
      const author = await Author.findOne({ name: args.author })
      if (args.author && !args.genre) return Book.find({ author: author._id })
      if (!args.author && args.genre) return await Book.find({ genres: { $in: [args.genre] } })
      if (args.author && args.genre) return await Book.find({ $or: [{ author: author._id }, { genres: { $in: [args.genre] } }] })
      return await Book.find({});
    },
    allAuthors: async () => await Author.find({}),
    me: async (obj, args) => User.findOne({ username: args.username })

  },
  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author);
      return author;
    }
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      const booksByAuthor = await Book.find({ author: author._id })
      return booksByAuthor.length
    },
  },
  Mutation: {
    addBook: async (obj, args, { currentUser }) => {
      let author = await Author.findOne({ name: args.author });
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated');
      }
      try {
        if (!author) {
          author = new Author({ name: args.author, born: null });
          await author.save();
        }
        const book = new Book({ ...args, author: author._id });
        return await book.save();
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (obj, args, { currentUser }) => {
      let author = await Author.findOne({ name: args.name });
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated');
      }
      if (!author) throw new UserInputError('User not found');
      author.born = args.setBornTo;
      return await author.save()
    },
    createUser: async (obj, args) => {
      let user = User.findOne({ username: args.username })
      try {
        user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
        return await user.save();
      } catch (error) {
        throw new UserInputError('User doesnt exist')
      }
    },
    login: async (obj, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, config.jwt.secret) }
    }
  }
}

module.exports = resolvers;