/**
 * basic example
 */

// string  => 'string' == typeof val 
// buffer  =>  Buffer.isBuffer(val))
// stream  => 'function' == typeof val.pipe

const fs = require('fs');

/**
 * 默认下载网速speed是100kb
 * 
 * @param {Response} res
 * @param {Number} speed 网速，单位kb
 */
module.exports = async (res, speed = 100) => {
  const body = fs.createReadStream('./node.rar');
  let start = Date.now();
  let total = 0;
  res.setHeader('Content-Disposition', `attachment; filename="node.rar"`);

  const writeDate = chunk => {
    if (!res.write(chunk)) {
      body.pause();
      res.once('drain', () => {
        body.resume();
      });
    }
  }

  body.on('data', chunk => {
    // Buffer.byteLength(chunk) => 65536 => 64kb => 64kb * 2 > 100kb => 实际网速是128kb/s
    total += Buffer.byteLength(chunk);
    const now = Date.now();
    console.log(total);
    const ms = start - now + 1000;
    if (ms > 0) {
      if (total > 1024 * speed) {
        body.pause();
        setTimeout(() => {
          total = 0;
          start = Date.now();
          writeDate(chunk);
          body.resume();
        }, ms);
      } else {
        writeDate(chunk);
      }
    } else {
      total = 0;
      start = now;
      writeDate(chunk);
    }
  });

  body.on('end', () => {
    console.log('end');
    res.end();
  });
}