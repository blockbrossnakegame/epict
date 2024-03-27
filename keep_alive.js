var http = require('http');

http.createServer(function (req, res) {
  res.write("hello 1");
  res.end();
}).listen(8080);
