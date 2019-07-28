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
  const blogAmounts = blogs.reduce((blogAmounts, curr) => {
    //console.log(blogAmounts, 'curr', curr)
    blogAmounts[curr.author] = blogAmounts[curr.author] + 1 || 1
    return blogAmounts
  }, {})
  // .reduce((leader, curr) => {
  //   console.log('leader', leader, 'curr', curr)
  //   return leader > curr ? leader : curr
  // }, {})

  // function getKeyByValue(object, value) {
  //   return Object.keys(object).find(key => object[key] === value);
  // }

  
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}