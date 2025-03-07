const readlineSync = require('readline-sync');
const authorModel = require('../models/authorModel');
const booksModel = require('../models/booksModel');
const publisherModel = require('../models/publisherModel');

const bookView ={

    
    showBook: ()=>{
        //OPCION 1: Un IF para cada variable -- book, author, publisher
        const books = bookModel.readBook();
        
        if(books.length === 0){
            console.log('No hay libros para mostrar');
        } else {
            console.log('Libros: ');
            books.forEach((book, index) => {
                //OPCION 1:
                console.log(`${index + 1}. ${book.name}`)

                //OPCION 2: Usar el ID de publisher y author que estan en el archivo de BOOKS.JSON para obtener la información necesaria
                //console.log(`${index + 1}. ${book.name} ${book.authorId}, ${book.publisherId}.`);
                
            })
        } 

        const authors = authorModel.readAuthor();
        if(authors.length === 0){
            console.log('No hay autores para mostrar');
        } else {
            console.log('Autores: ');
            authors.forEach((author, index) => {
                console.log(`${index + 1}. ${author.name}`)
            })
        } 

        const publishers = publisherModel.readPublisher();
        if(publishers.length === 0){
            console.log('No hay editoriales para mostrar');
        } else {
            console.log('Editoriales: ');
            publishers.forEach((publisher, index) => {
                console.log(`${index + 1}. ${publisher.name}, ${publisher.anio}`)
            })
        }  
    },




    promptForBook: () =>{ 
        nombre = readlineSync.question('Ingrese el nombre del libro: ')
        autor = readlineSync.question('Ingrese el autor del libro: ')
        editorial = readlineSync.question('Ingrese el editorial del libro: ')
        anio = readlineSync.question('Ingrese el anio de publicacion del libro: ')
        return {nombre, autor, editorial, anio};
    },

    promptForBookId: (book) =>{ 
        const bookId = readlineSync.question('Ingrese el ID del libro a eliminar: ') -1;
        if(bookId < 1 || bookId > book.length) {
            console.log('ID de libro invalido');
            return 1;
        }
        return bookId
    },

    confimationMessage: (message) =>{
        console.log(message);
    }
};

module.exports = bookView;