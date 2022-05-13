const Book = require('../models/Book');
const Author = require('../models/Author');
const { UserInputError } = require('apollo-server');

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorsCount: () => Author.collection.countDocuments(),
    allBooks: async (obj, args) => {
      const author = await Author.findOne({ name: args.author })
      if (args.author && !args.genre) return Book.find({ author: author._id })
      if(!args.author && args.genre) return await Book.find({genres : { $in : [args.genre]} })
      if (args.author && args.genre) return await Book.find({$or: [{author : author._id},{genres : { $in : [args.genre]} }]})
      return await Book.find({});
    },
    allAuthors: async () => await Author.find({}),
    },
    Book: {
       author: async(root) => {
         const author = await Author.findById(root.author);
         return author;
      }
    },
    Author: {
      bookCount: async (root) => { 
        const author = await Author.findOne({ name: root.name })
        const booksByAuthor = await Book.find({author : author._id})
        return booksByAuthor.length
    } 
  },
  Mutation: {
      addBook: async (obj, args) => {
        let author = await Author.findOne({ name: args.author });
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
                      invalidArgs : args
                  })
            }
    },
    editAuthor : async (obj, args) => {
      let author = await Author.findOne({name : args.name});
      if (!author) return null;
      author.born = args.setBornTo;
      return await author.save()
    }
  }
}

module.exports = resolvers;