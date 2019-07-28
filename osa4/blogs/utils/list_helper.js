const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, curr) => {
    return sum + curr.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((favorite, curr) => {
    return favorite.likes > curr.likes ? favorite : curr
  }, {})

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {
      author: '',
      blogs: 0
    }
  }

  const blogAmounts = blogs.reduce((blogAmounts, curr) => {
    blogAmounts[curr.author] = blogAmounts[curr.author] + 1 || 1
    return blogAmounts
  }, {})

  let mostBlogs = 0

  Object.keys(blogAmounts).forEach((key, index) => {
    mostBlogs = mostBlogs > blogAmounts[key] ? mostBlogs : blogAmounts[key]
  })

  const authorWithMostBlogs = Object.keys(blogAmounts).find(key => blogAmounts[key] === mostBlogs)

  return {
    author: authorWithMostBlogs,
    blogs: mostBlogs
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {
      author: '',
      likes: 0
    }
  }

  const likeAmounts = blogs.reduce((likeAmounts, curr) => {
    likeAmounts[curr.author] = likeAmounts[curr.author] + curr.likes || curr.likes
    return likeAmounts
  }, {})

  let mostLikes = 0

  Object.keys(likeAmounts).forEach((key, index) => {
    mostLikes = mostLikes > likeAmounts[key] ? mostLikes : likeAmounts[key]
  })

  const authorWithMostLikes = Object.keys(likeAmounts).find(key => likeAmounts[key] === mostLikes)

  return {
    author: authorWithMostLikes,
    likes: mostLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}