const http = require('http');
const app = require('./app');

const PORT = 3001;
app.set('port', PORT);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(PORT);
server.on('error', (error) => {
    console.log('Error in server');
    console.log(error);
});
server.on('listening', () => {
    console.log('Server listening on port 3001');
});
