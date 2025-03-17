const net = require('net'); //Importamos el modulo net
const authorController = require('./controllers/authorController'); //Importamos el modulo del controlador

//Creamos el servidor
const server = net.createServer((socket) => {
  //Mensaje de cliente conectado con su dirección de conexión y puerto
  console.log('Nuevo cliente conectado:', socket.remoteAddress + ":" + socket.remotePort);

  let data = '';

  //Manejo del evento "data" para el ingreso de los datos del cliente
  socket.on('data', (chunk) => {
    data += chunk.toString();
  });

  //Manejo del evento "end" para la desconexión del cliente 
  socket.on('end', () => {
    console.log('Cliente desconectado:', socket.remoteAddress + ":" + socket.remotePort);
  });

  //Manejo de evento "error" para posibles errores
  socket.on('error', (err) => {
    console.log('Error:', err.message);
  });
});

//Escuchando el servidor 8080
server.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});
  
