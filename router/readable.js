/**
 * basic example
 */

// string  => 'string' == typeof val 
// buffer  =>  Buffer.isBuffer(val))
// stream  => 'function' == typeof val.pipe

const fs = require('fs')

/**
 * 默认下载网速speed是10kb
 * 
 * @param {Response} res
 * @param {Number} speed 网速，单位kb
 */
module.exports = async (res, speed = 10) => {
  const body = fs.createReadStream('./node.rar');
  let start = Date.now();
  let total = 0;
  res.setHeader('Content-Disposition', `attachment; filename="node.rar"`);

  body.on('error', (e) => {
    console.log('error', e);
    res.statusCode = 400;
    res.end(`error: ${e.message}`);
  })

  body.on('end', () => {
    res.end();
  })

  const writeData = data => {
    total++;
    if (res.write(data)) {
      read();
    } else {
      res.once('drain', read);
    }
  }

  const read = () => {
    const now = Date.now();
    let data = body.read(1024);
    if (!data) return;
    const ms = start - now + 1000;
    if (ms > 0) {
      if (total > speed) {
        setTimeout(function () {
          start = now;
          total = 0;
          writeData(data);
        }, ms);
      } else {
        writeData(data);
      }
    } else {
      start = now;
      total = 0;
      writeData(data);
    }
  };

  body.on('readable', function () {
    read();
  });
}
