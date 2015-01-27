var express = require('express'),
    server = express(),
    port = parseInt(process.argv[2]) || 3000;

server.use(express.static('../client-side/')).listen(port);
console.log('\x1b[32mHTTP Server starts listening on %d ...\x1b[0m', port);