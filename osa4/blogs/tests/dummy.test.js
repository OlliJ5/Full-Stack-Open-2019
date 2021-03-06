const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('totalLikes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('equals to the amount of a single blog when it is the only one', () => {
    const result = listHelper.totalLikes(blogs.slice(0, 1))
    expect(result).toBe(7)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('finds the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    const expectedBlog = (({ _id, url, __v, ...others }) => ({ ...others }))(blogs[2])
    expect(result).toEqual(expectedBlog)
  })

  test('is found correctly when only one blog is given', () => {
    const result = listHelper.favoriteBlog(blogs.slice(0, 1))
    const expectedBlog = (({ _id, url, __v, ...others }) => ({ ...others }))(blogs[0])
    expect(result).toEqual(expectedBlog)
  })
})

describe('most blogs', () => {
  test('finds the author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    const expectedOutput = {
      author: "Robert C. Martin",
      blogs: 3
    }
    expect(result).toEqual(expectedOutput)
  })

  test('return empty when given an empty blog list', () => {
    const result = listHelper.mostBlogs([])
    const expectedOutput = {
      author: "",
      blogs: 0
    }
    expect(result).toEqual(expectedOutput)
  })

  test('returns correctly with only one blog', () => {
    const result = listHelper.mostBlogs(blogs.slice(0, 1))
    const expectedOutput = {
      author: "Michael Chan",
      blogs: 1
    }
    expect(result).toEqual(expectedOutput)
  })
})

describe('most likes', () => {
  test('finds the author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    const expectedBlog = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    expect(result).toEqual(expectedBlog)
  })
})