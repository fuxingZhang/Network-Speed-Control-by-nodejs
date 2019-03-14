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

  const writeDate = chunk => {
    if (!res.write(chunk)) {
      body.pause()
      res.once('drain', () => {
        body.resume()
      });
    }
  }

  body.on('data', chunk => {
    // chunk.length => buf.length 返回内存中分配给 buf 的字节数。 不一定反映 buf 中可用数据的字节量。
    // 不过这里 chunk.length === Buffer.byteLength(chunk)
    // Buffer.byteLength(chunk) => 65536 => 64kb => 64kb * 2 > 100kb => 实际网速是128kb/s
    user.total += Buffer.byteLength(chunk)
    if (user.total > 1024 * 100) {
      body.pause()
      setTimeout(() => {
        writeDate(chunk)
        body.resume()
      }, user.start - Date.now() + 1000)
    } else {
      writeDate(chunk)
    }
  });

  body.on('end', () => {
    console.log('end')
    res.end()
  });
}