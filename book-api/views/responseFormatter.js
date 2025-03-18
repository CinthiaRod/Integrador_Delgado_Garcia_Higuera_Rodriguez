// Importamos modulos readlineSync para leer la entrada del usurioo
const readlineSync = require('readline-sync');

// Importamos los modelos de autores, libros y editoriales
const authorModel = require('../models/authorModel');
const booksModel = require('../models/booksModel');
const publishersModel = require('../models/publishersModel');

// -------------- View para autores ----------------
const authorView = {
    // Busca y muestra lista de autores
    showAuthor: (authors) => {
        if (authors.length === 0) {
            console.log('No hay autores para mostrar.');
            return;
        }

        console.log('\nAutores:');
        authors.forEach((author, index) => {
            console.log(`${index + 1}. ${author.name}`);
        });
    },
    // Solicita al usuario ingresar el nombre del autor
    promptForAuthor: () => {
        const name = readlineSync.question('Ingrese el nombre del autor: ');
        return name;
    },
    // Solicita al usuario ingresar el ID del usuario a eliminar. Primero se despliega la lista y el usuario decidirá que autor eliminar
    promptForAuthorId: () => {
        const authorId = readlineSync.question('Ingrese el ID del autor a eliminar: ');
        return authorId;
    },
    // Muestra mensaje de confirmación
    confirmationMessage: (message) => {
        console.log(message);
    },
    // Muestra todos los autores que existe en el JSON por medio del modelo
    showAllAuthors: () => {
        const authors = authorModel.readAuthor();
        authorView.showAuthor(authors);
    },
    // Muestra mensaje de error
    showError: (error) => {
        console.log(`Error: ${error}`);
    }
};

//--------------- View para libros ----------------------
const booksView = {
    // Muestra la lista de libros existentes en el JSON
    showBooks: (books) => {
    if (books.length === 0) {
        console.log('No hay libros para mostrar.');
        return;
    }

    console.log('\nLibros:');
    books.forEach((book, index) => {
        console.log(`${index + 1}. ${book.title}`);
    });

    },
    // Solicita al usuario ingresar un titulo de libro
    promptForBook: () => {
        const title = readlineSync.question('Ingrese el titulo del libro: ');
        return title.trim();
    },
    // Solicita al usuario ingresar el ID del libro a eliminar. Primero se despliega la lista y después el usuario decidirá que libro eliminar.
    promptForBookId: () => {
        const bookId = readlineSync.question('Ingrese el ID del libro a eliminar: ');
        return bookId;
    },
    // Mensaje de confirmación
    confirmationMessage: (message) => {
        console.log(message);
    },
    // Muestra todos los libros guardados en el JSON llamando al modelo
    showAllBooks: () => {
        const books = booksModel.readBooks();
        booksView.showBooks(books);
    },
    // Mensaje de error
    showError: (error) => {
        console.log(`Error: ${error}`);
    }
};

//------------View para Editoriales -------------------

const publishersView = {
    // Muestra la lista de editoriales
    showPublishers: (publishers) => {
    if (publishers.length === 0) {
        console.log('No hay Editoriales para mostrar.');
        return;
    }

    console.log('\nEditoriales:');
    
    publishers.forEach((publisher, index) => {
        console.log(`${index + 1}. ${publisher.publisher} ${publisher.anio}`);
    });
    
    },
    // Solicita al usuario ingresar el ID de la editorial 
    promptForPublisherId: () => {
        const publisherId = readlineSync.question('Ingrese el ID de la Editorial: ');
        return publisherId;
    },
    // Solicita al usuario ingresar el nombre de editorial
    promptForPublisher : () => {
        const publisher = readlineSync.question('Ingrese el nombre de la Editorial: ');
        return publisher;
    },
    // Solicita al usuario el año de la editorial
    promptForPublisherAnio: () => {
        const publisherAnio = readlineSync.question('Ingrese el anio de la Editorial ');
        return publisherAnio;
    
    },
    // Muestra mensaje de confirmación
    confirmationMessage: (message) => {
        console.log(message);
    },
    // En esta sección muestra el listado de editoriales.
    showAllPublishers: () => {
        const publishers = publishersModel.readPublishers();
        publishersView.showPublishers(publishers);
    },
    // Muestra mensaje de error
    showError: (error) => {
        console.log(`Error: ${error}`);
    }
};
// Exportamos los módulos para que puedan ser utilizados en otras partes de la aplicación
module.exports = {
    authorView,
    booksView,
    publishersView
};