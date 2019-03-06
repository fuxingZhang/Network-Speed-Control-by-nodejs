const fs = require('fs')

module.exports = function(res) {
  const body = fs.createReadStream('./node.rar')
  let start = Date.now()
  let total = 0;
  res.setHeader('Content-Disposition', `attachment; filename="node.rar"`);

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
    total += Buffer.byteLength(chunk)
    const now = Date.now()
    console.log(total)
    const ms = start - now + 1000
    if (ms > 0) {
      if (total > 1024 * 100) {
        body.pause()
        setTimeout(() => {
          total = 0
          start = Date.now()
          writeDate(chunk)
          body.resume()
        }, ms)
      } else {
        writeDate(chunk)
      }
    } else {
      total = 0
      start = now
      writeDate(chunk)
    }
  });

  body.on('end', () => {
    console.log('end')
    res.end()
  });
}