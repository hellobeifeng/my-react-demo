
module.exports = (req, res, next) => {
  console.log('req.body.username', req.body.username, req.body.password)
  if (req.method === 'POST' && req.path === '/login') {
    if (req.body.username === 'admin' && req.body.password === '123456'){
      return res.status(200).json({
        user: {
          name: 'feng',
          id: 1,
          token:"abcdefg"
        }
      })
    } else {
      return res.status(400).json({
        message:'用户名或者密码错误'
      })
    }
  } else if (req.method === 'POST' && req.path === '/register') {
    return res.status(200).json({
      user: {
        name: 'feng',
        id: 1,
        token:"abcdefg"
      }
    })
  }
  next();
}