// Importamos el modulo net para la comunicación entre el cliente y servidor
const net = require('net');

// Importamos el modulo readline-Sync para la entrada del usuario
const readlineSync = require('readline-sync');

// Importamos los controladores de autores, libros y editoriales
const authorController = require('./controllers/authorController');
const bookController = require('./controllers/booksController');
const publisherController = require('./controllers/publishersController'); 

// Establecer conexión con el servidor en el puerto 8080
const client = net.createConnection({ port: 8080 }, () => {
  console.log('Conectado al servidor');
  mainMenu(); // Llamamos al menú principal una vez que se haya creado la conexión con el servidor
});
//----------------------Menu principal----------------------
// Función del menu principal
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
              mostrarMenu(); // Llama al menú de autores
              break;
          case '2':
              mostrarMenuLibros(); // Llama al menú de libros
              break;
          case '3':
              mostrarMenuEditoriales(); // Llama al menú de editoriales
              break;
          case '4':
              console.log(`Cerrando conexion...\n`);
              client.end(); // Cierra conexión con el servidor
              process.exit(0); // Termina la ejecución del programa
          default:
              console.log('Opción no valida'); // Manejo de opción inválida
              break;
      }
  }
}

//----------------------Menu de autores----------------------
// Función de autores
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
      if(opcion === "5") { // Si el usuario elige volver, sale del bucle
          return;
      }

      // Envía la opción seleccionada al servidor
      client.write(JSON.stringify({
          type: 'author',
          action: opcion
      }));
      // Se escoge una opción y llama a la función por medio del controlador
        switch (opcion) {
          case '1':
            authorController.showAuthor(client);
            break;
        case '2':
            authorController.addAuthor(client);
            break;
        case '3':
            authorController.findAuthor(client);
            break;
        case '4':
            authorController.deleteAuthor(client);
            break;
        default:
                console.log('Opción no valida');
                break;
        }
    } catch (error) { // En caso de exitir error se maneja por try/catch
        console.error('Error:', error.message);
    }
}
}
//----------------------Menu de libros----------------------
// Función de libros
function mostrarMenuLibros() {
  while (true) {
    console.log('\n--- Menu de Libros ---');
    console.log('1. Mostrar libros');
    console.log('2. Agregar libro');
    console.log('3. Buscar libro');
    console.log('4. Eliminar libro');
    console.log('5. Volver al menú principal');

    const opcion = readlineSync.question('Ingrese su opcion: ').trim();

    try {
      if(opcion === "5") { // Si el usuario elige volver, sale del bucle
          return;
      }
      
      // Envía la opción seleccionada al servidor
      client.write(JSON.stringify({
          type: 'book',
          action: opcion
      }));

      // Llama a la función correspondiente en el controlador de libros por medio de opciones ennumeradas
      switch (opcion) {
          case '1':
              bookController.showBooks(client);
              break;
          case '2':
              bookController.addBook(client);
              break;
          case '3':
              bookController.findBook(client);
              break;
          case '4':
              bookController.deleteBook(client);
              break;
          default:
              console.log('Opción no valida');
              break;
      }
  } catch (error) { // Si el usuario elige volver, sale del bucle
      console.error('Error:', error.message);
  }
}
}
//-------------- Menu editoriales -----------------------
// Función de menú de editoriales
function mostrarMenuEditoriales() {
  while (true) {
    console.log('\n--- Menu de Editoriales ---');
    console.log('1. Mostrar Editoriales');
    console.log('2. Agregar Editorial');
    console.log('3. Buscar Editorial');
    console.log('4. Eliminar Editorial');
    console.log('5. Volver al menú principal');

    const opcion = readlineSync.question('Ingrese su opcion: ').trim();

    try {
      if(opcion === "5") { // // Si el usuario elige volver, sale del bucle
          return;
      }

      // // Envía la opción seleccionada al servidor
      client.write(JSON.stringify({
          type: 'publisher',
          action: opcion
      }));

      // Llama a la función correspondiente en el controlador de editoriales por medio de una ennumeración
      switch (opcion) {
          case '1':
            publisherController.showPublishers(client);
              break;
          case '2':
            publisherController.addPublisher(client);
            break;
          case '3':
            publisherController.findPublisher(client);
              break;
          case '4':
            publisherController.deletePublisher(client);
            break;
          default:
              console.log('Opción no valida');
              break;
      }
  } catch (error) { // Si el usuario elige volver, sale del bucle
      console.error('Error:', error.message);
  }
}
}

//----------- Eventos de la conexión ---------------------
client.on('data', (data) => {
try {
  const response = JSON.parse(data.toString()); // Intenta parsear la respuesta del servidor
  console.log("Mensaje recibido:", response);
} catch (error) {
  console.log("Mensaje recibido:", data.toString()); // Muestra el mensaje en caso de error
}
});

client.on('end', () => {
console.log('Desconectado del servidor'); // Mensaje cuando la conexión se cierra
process.exit(0);
});

client.on('error', (err) => {
console.error('Error del cliente:', err.message); // Mensaje cuando la conexión se cierra
process.exit(1);
});