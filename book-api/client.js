const net = require('net');
const readlineSync = require('readline-sync');
const authorController = require('./controllers/authorController');
const bookController = require('./controllers/booksController');
const publisherController = require('./controllers/publishersController'); 


const client = net.createConnection({ port: 8080 }, () => {
  console.log('Conectado al servidor');
  mainMenu();
});
//----------------------Menu principal----------------------
function mainMenu() {
  while (true) {  
      console.log('\n---Menu principal-----\n Elige un numero por favor:');
      console.log('1. Autores');
      console.log('2. Libros');
      console.log('3. Editoriales');
      console.log('4. Salir');
      
      let eleccion = readlineSync.question('Ingrese su opcion: ').trim();
      
      switch (eleccion) {
          case '1':
              mostrarMenu();
              break;
          case '2':
              mostrarMenuLibros();
              break;
          case '3':
              mostrarMenuEditoriales();
              break;
          case '4':
              console.log(`Cerrando conexión...\n`);
              client.end();
              process.exit(0); 
          default:
              console.log('Opción no válida');
              break;
      }
  }
}

//----------------------Menu de autores----------------------
function mostrarMenu() {
  while (true) { 
    console.log('\nMenu de opciones:');
    console.log('1. Mostrar autores');
    console.log('2. Agregar autor');
    console.log('3. Buscar autor');
    console.log('4. Eliminar autor');
    console.log('5. Volver al menú principal');
    
    const opcion = readlineSync.question('Ingrese su opcion: ').trim();
    
    try {
      if(opcion === "5") {
          return;
      }

      client.write(JSON.stringify({
          type: 'author',
          action: opcion
      }));
        switch (opcion) {
          case 'showAuthor':
            authorController.showAuthor(client);
            break;
        case 'addAuthor':
            authorController.addAuthor(client);
            break;
        case 'findAuthor':
            authorController.findAuthor(client);
            break;
        case 'deleteAuthor':
            authorController.deleteAuthor(client);
            break;
        default:
                console.log('Opción no válida');
                break;
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}
}
//----------------------Menu de libros----------------------
function mostrarMenuLibros() {
  while (true) {
    console.log('\n--- Menu de Libros ---');
    console.log('1. Mostrar libros');
    console.log('2. Agregar libro');
    console.log('3. Buscar libro');
    console.log('4. Eliminar libro');
    console.log('5. Volver al menú principal');

    const opcion = readlineSync.question('Ingrese su opción: ').trim();

    try {
      if(opcion === "5") {
          return;
      }

     
      client.write(JSON.stringify({
          type: 'book',
          action: opcion
      }));

      switch (opcion) {
          case 'showBooks':
              bookController.showBooks(client);
              break;
          case 'addBook':
              bookController.addBook(client);
              break;
          case 'findBook':
              bookController.findBook(client);
              break;
          case 'deleteBook':
              bookController.deleteBook(client);
              break;
          default:
              console.log('Opción no válida');
              break;
      }
  } catch (error) {
      console.error('Error:', error.message);
  }
}
}
//-------------- Menu editoriales -----------------------
function mostrarMenuEditoriales() {
  while (true) {
    console.log('\n--- Menu de Editoriales ---');
    console.log('1. Mostrar Editoriales');
    console.log('2. Agregar Editorial');
    console.log('3. Buscar Editorial');
    console.log('4. Eliminar Editorial');
    console.log('5. Volver al menú principal');

    const opcion = readlineSync.question('Ingrese su opción: ').trim();

    try {
      if(opcion === "5") {
          return;
      }

      client.write(JSON.stringify({
          type: 'publisher',
          action: opcion
      }));

      switch (opcion) {
          case 'showPublishers':
            publisherController.showPublishers(client);
              break;
          case 'addPublisher':
            publisherController.addPublisher(client);
            break;
          case 'findPublisher':
            publisherController.findPublisher(client);
              break;
          case 'deletePublisher':
            publisherController.deletePublisher(client);
            break;
          default:
              console.log('Opción no válida');
              break;
      }
  } catch (error) {
      console.error('Error:', error.message);
  }
}
}
//----------- Eventos de la conexión ---------------------
client.on('data', (data) => {
try {
  const response = JSON.parse(data.toString());
  console.log("📩 Mensaje recibido:", response);
} catch (error) {
  console.log("📩 Mensaje recibido:", data.toString());
}
});

// // Leer comandos desde la terminal
// rl.on('line', (input) => {
//   const comando = input.trim().toUpperCase();

//   // Validar que el comando comience con "CMD_"
//   if (/^CMD_\w+$/.test(comando)) {
//       client.write(comando);
//   } else {
//       console.log('Comando no válido. Usa el formato: CMD_ALGO');
//   }
// });

client.on('end', () => {
console.log('Desconectado del servidor');
process.exit(0);
});

client.on('error', (err) => {
console.error('Error del cliente:', err.message);
process.exit(1);
});