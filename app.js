const http = require('http');
const url = require('url');
const { URL } = url;

// router
const readable = require('./router/readable')
const data = require('./router/data')

const server = http.createServer(async (req, res) => {
  console.log(req.url)
  // console.log(url.parse(req.url))
  // console.log(url.parse(req.url,true))
  const { pathname } = new URL(`http://${req.headers.host}${req.url}`);

  switch (pathname) {
    case '/favicon.ico':
      console.log('favicon')
      res.statusCode = 404;
      res.end();
      break;
    case '/readable':
      readable(res)
      break;
    case '/data':
      data(res)
      break;
    default: 
      res.statusCode = 404;
      res.end('Not Found');
  };
});

server.listen(3333, () => {
  console.log(`listening on port 3333`)
});