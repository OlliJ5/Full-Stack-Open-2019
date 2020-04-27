const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://useri:moro@cluster0-uuliy.mongodb.net/test?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook (
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor (
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filteredBooks
      if (!args.author) {
        filteredBooks = await Book.find({}).populate('author')
      } else {
        //tän ei tarvii toimii
        filteredBooks = books.filter(books => books.author === args.author)
      }

      if (!args.genre) {
        return filteredBooks
      } else {
        return filteredBooks.filter(book => book.genres.includes(args.genre))
      }
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: (root) => Book.find({ author: root._id }).countDocuments()
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        const bookAuthor = await Author.findOne({ name: args.author })
  
        if (!bookAuthor) {
          //save author
          const newAuthor = new Author({ name: args.author })
          await newAuthor.save()
        }
  
        //etsi kirjailija uudestaan
        const author = await Author.findOne({ name: args.author })
        //savee kirja
        const book = new Book({ title: args.title, author, published: args.published, genres: args.genres })
        await book.save()
  
        return book
      } catch (error){
        console.log('moro', error.message)
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.setBornTo
      await author.save()
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})