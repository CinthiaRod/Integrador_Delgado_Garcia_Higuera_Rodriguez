const readlineSync = require('readline-sync');
const authorModel = require('../models/authorModel');
const booksModel = require('../models/booksModel');
const publishersModel = require('../models/publishersModel');
const authorView = {
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

    promptForAuthor: () => {
        const name = readlineSync.question('Ingrese el nombre del autor: ');
        return name;
    },

    promptForAuthorId: () => {
        const authorId = readlineSync.question('Ingrese el ID del autor a eliminar: ');
        return authorId;
    },

    confirmationMessage: (message) => {
        console.log(message);
    },

    showAllAuthors: () => {
        const authors = authorModel.readAuthor();
        authorView.showAuthor(authors);
    },
    showError: (error) => {
        console.log(`Error: ${error}`);
    }
};

//--------------- View para libros ----------------------
const booksView = {
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

    promptForBook: () => {
        const title = readlineSync.question('Ingrese el título del libro: ');
        return title.trim();
    },
    promptForBookId: () => {
        const bookId = readlineSync.question('Ingrese el ID del libro a eliminar: ');
        return bookId;
    },

    confirmationMessage: (message) => {
        console.log(message);
    },

    showAllBooks: () => {
        const books = booksModel.readBooks();
        booksView.showBooks(books);
    },

    showError: (error) => {
        console.log(`Error: ${error}`);
    }
};

//------------View para Editoriales -------------------

const publishersView = {
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
    promptForPublisherId: () => {
        const publisherId = readlineSync.question('Ingrese el ID de la Editorial: ');
        return publisherId;
    },
    promptForPublisher : () => {
        const publisher = readlineSync.question('Ingrese el nombre de la Editorial: ');
        return publisher;
    },
    promptForPublisherAnio: () => {
        const publisherAnio = readlineSync.question('Ingrese el anio de la Editorial ');
        return publisherAnio;
    
    },
    confirmationMessage: (message) => {
        console.log(message);
    },

    showAllPublishers: () => {
        const publishers = publishersModel.readPublishers();
        publishersView.showPublishers(publishers);
    },

    showError: (error) => {
        console.log(`Error: ${error}`);
    }
};

module.exports = {
    authorView,
    booksView,
    publishersView
};