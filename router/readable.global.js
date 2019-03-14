/**
 * Cross process example
 * 用户登录后redis会有用户信息，用户请求接口的时候可以获取用户信息
 * 为了简单演示，假设登录用户为zfx，zfx在访问接口
 */
const fs = require('fs')

global.users.zfx = {
  total: 0,
  start: void 0
}

module.exports = async res => {
  const body = fs.createReadStream('./node.rar')
  res.setHeader('Content-Disposition', `attachment; filename="node.rar"`);
  // 获取用户信息
  const user = global.users.zfx
  user.start = Date.now()
  
  body.on('error', (e) => {
    console.log('error', e)
    res.statusCode = 400;
    res.end(`error: ${e.message}`);
  })
  
  body.on('end', () => {
    res.end()
  })
  
  const writeData = data => {
    user.total++
    if(res.write(data)) {
      read()
    } else {
      res.once('drain', read)
    }
  }
  
  const read = () => {
    let data = body.read(1024);
    if (!data) return
    if (user.total > 100) {
      setTimeout(function () {
        writeData(data)
      }, user.start - Date.now() + 1000)
    } else {
      writeData(data)
    }
  };
  
  body.on('readable', function () {
    read();
  });
}
