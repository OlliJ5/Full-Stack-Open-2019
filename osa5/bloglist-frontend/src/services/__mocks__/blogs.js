const blogs = [
  {
    title: 'paskablogi2',
    author: 'olli',
    url: 'www.paskablogi2.fi',
    likes: 6,
    user: {
      username: 'ogrousu',
      name: 'olli',
      id: '5d3f47efafc5d352c8262286'
    },
    id: '5d3f5acbefafc95e60da0d77'
  },
  {
    title: 'paskablogi3',
    author: 'olli',
    url: 'www.paskablogi3.fi',
    likes: 2,
    user: {
      username: 'ogrousu',
      name: 'olli',
      id: '5d3f47efafc5d352c8262286'
    },
    id: '5d3f5ae4efafc95e60da0d78'
  },
  {
    title: 'middleware',
    author: 'olli',
    url: 'www.paskablogi3.fi',
    likes: 2,
    user: {
      username: 'tester',
      name: 'olli',
      id: '5d3ff7806f45576f3c858dd1'
    },
    id: '5d400360e1b34974ad9a3003'
  }
]

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken, token }
