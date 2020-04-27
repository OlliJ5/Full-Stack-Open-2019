const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const jwt = require('jsonwebtoken')

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
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

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    me: (root, args, context) => context.currentUser,
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
    addBook: async (root, args, { currentUser }) => {
      try {
        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }

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
      } catch (error) {
        console.log('moro', error.message)
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if(!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.setBornTo
      await author.save()
      return author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'salainen') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, 'verysecret') }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), 'verysecret'
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})