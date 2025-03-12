//Importar modulos
const { log } = require('console');
const net =require('net');
//const readlineSync =require('readline-sync');
//NOTA AGREGAR-IMPORTAR CONTROLLERS

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = new net.Socket();

client.connect(8080, 'localhost', () => {
    console.log('Conectado al servidor');
    console.log(`\nMenú de comandos:\n`);
    console.log("1. Add");
    console.log("2. Delete");
    console.log("3. Modify");
    console.log("4. List");
    console.log("5. Exit");
    
    rl.question('Escribe un comando: ', (command) => {
        client.write(command);
        switch (command) {
            case "1":
                add();
                rl.question('Deseas agregar un libro, un autor o una editorial: ', (subcommand) => {
                    client.write(subcommand);
                    switch (subcommand) {
                        case "autor":
                            authorController.addAuthor();
                            break;
                        case "libro":
                            bookController.addBook();
                            break;
                        case "editorial":
                            publishersController.addPublisher();
                            break;
                        default:
                            console.log('Comando inválido');
                            break;
                    }
                });
                break;
                
            case "2":
                eliminate();
                rl.question('Deseas eliminar un libro, un autor o una editorial: ', (subcommand) => {
                    client.write(subcommand);
                    switch (subcommand) {
                        case "autor":
                            authorController.deleteAuthor();
                            break;
                        case "libro":
                            bookController.deleteBook();
                            break;
                        case "editorial":
                            publishersController.deletePublisher();
                            break;
                        default:
                            console.log('Comando inválido');
                            break;
                    }
                });
                break;
            case "3":
                modify();
                rl.question('Deseas modificar un libro, un autor o una editorial: ', (subcommand) => {
                    client.write(subcommand);
                    switch (subcommand) {
                        case "autor":
                            authorController.editAuthor();
                            break;
                        case "libro":
                            bookController.editBook();
                            break;
                        case "editorial":
                            publishersController.editPublisher();
                            break;
                        default:
                            console.log('Comando inválido');
                            break;
                    }
                });
                break;
            case "4":
                list();
                rl.question('Deseas imprimir la lista de libros, un autores o una editoriales: ', (subcommand) => {
                    client.write(subcommand);
                    switch (subcommand) {
                        case "autores":
                            authorController.showAuthor();
                            break;
                        case "libros":
                            bookController.showBook();
                            break;
                        case "editoriales":
                            publishersController.showPublisher();
                            break;
                        default:
                            console.log('Comando inválido');
                            break;
                    }
                });
                break;
            case "5":
                console.log("Exiting...");
                process.exit();  // Para salir correctamente
                break;
            default:
                console.log("Opción inválida.");
        }
    });
});


//client.on('data', (data) => {
  //  console.log('Respuesta del servidor: ');
    //console.log(data.toString());

    //rl.close();

   // client.destroy();
//});


//client.on('close', ()=>{
  //  console.log('Conexion cerrada');
//})


///////////////////////////////////////////////////
//PENDIENTE
// Función para enviar mensajes al servidor.
//function sendMessage() {
    // Solicita al usuario ingresar un mensaje para enviar al servidor.
  //  const message = readline.question('Ingrese un mensaje para enviar al servidor: ');
    // Si el mensaje es 'exit', cierra la conexión.
    //if (message.toLowerCase() === 'exit') {
     //   client.end();
    //} else {
        // Envía el mensaje al servidor.
      //  client.write(message);
    //}
//}


/////////////////////////////////////////////////////////
//Ejemplo Bernie (Solucion al simulacro de examen)
