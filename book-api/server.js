const net = require('net');
const authorController = require('./controllers/authorController');
const { log } = require('console');

const server = net.createServer((socket) => {
  console.log('Nuevo cliente conectado:', socket.remoteAddress + ":" + socket.remotePort);

  let data = '';

  socket.on('data', (chunk) => {
    data += chunk.toString();
  });

  socket.on('end', () => {
    console.log('Cliente desconectado:', socket.remoteAddress + ":" + socket.remotePort);
  });

  socket.on('error', (err) => {
    console.log('Error:', err.message);
  });
});

server.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});