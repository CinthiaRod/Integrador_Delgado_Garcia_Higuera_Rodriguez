//Importar modulos
const net =require('net');
const readlineSync =require('readline-sync');

//Comunicacion TCP
const client = net.createConnection({ port: 8080, host: 'localhost' });


// Maneja el evento 'connect' cuando la conexión se haya establecido.
client.on('connect', () => {
    // Muestra en consola que el cliente está conectado al servidor.
    console.log('Conectado al servidor');
    // Llama a la función para enviar el primer mensaje.
    sendMessage();
});

// Maneja el evento 'data' para recibir mensajes del servidor.
client.on('data', (data) => {
    // Muestra en consola la respuesta recibida del servidor.
    console.log('Respuesta del servidor: ' + data.toString());
    // Vuelve a llamar a la función para enviar el siguiente mensaje.
    sendMessage();
});

// Maneja el evento 'error' para mostrar cualquier error que ocurra.
client.on('error', (err) => {
    console.log('Error:', err.message);
});


///////////////////////////////////////////////////
//PENDIENTE
// Función para enviar mensajes al servidor.
function sendMessage() {
    // Solicita al usuario ingresar un mensaje para enviar al servidor.
    const message = readline.question('Ingrese un mensaje para enviar al servidor: ');
    // Si el mensaje es 'exit', cierra la conexión.
    if (message.toLowerCase() === 'exit') {
        client.end();
    } else {
        // Envía el mensaje al servidor.
        client.write(message);
    }
}


/////////////////////////////////////////////////////////
//Ejemplo Bernie (Solucion al simulacro de examen)
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const clientt = new net.Socket();

clientt.connect(8080, 'localhost', ()=>{
    console.log('Conectado al servidor');
    
    rl.question('Escribe un comando (Por ejemplo: GET BOOK o ADD BOOK {"name": "El Principito", "author": "Antoine de Saint-Exupery", "publisher":"La travesia", "anio": 2022)}: ', (command) => {
        clientt.write(command);
    })
})


clientt.on('data', (data) => {
    console.log('Respuesta del servidor: ');
    console.log(data.toString());

    rl.close();

    clientt.destroy();
});


clientt.on('close', ()=>{
    console.log('Conexion cerrada');
})