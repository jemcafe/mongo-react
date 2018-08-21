const http = require('http');
const app = require('./app');

server = http.createServer(app);

const port = process.env.PORT || 3040;
server.listen(port, () => console.log('listeing on port: ' + port));