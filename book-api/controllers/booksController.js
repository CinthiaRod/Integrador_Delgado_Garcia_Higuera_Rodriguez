const bookModel = require('../models/booksModel');
const bookView = require('../views/booksView');

const bookController = {
    showAuthor: () => {
        const book = bookModel.readBook();
        bookView.showbook(book);
    },

    findBook: ()=> {
        //buscar por libro
    },

    addBook: () =>{
        const bookDescription = bookView.promptForAuthor(); 
        const book = bookModel.readBook();
        book.push({"id": book.length + 1, "title": bookDescription.title});
        bookModel.saveBook(book);
        bookView.confimationMessage('libro agregado con exito');
    },

    editBook: ()=>{
        //editar libro -- actualizar informacion
    },

    deleteBook: () =>{
        const book = bookModel.readBook();
        if(book.length === 0) {
            bookView.showBook('No hay libros para eliminar');
            return;
        }
        const bookId = bookView.promptForBookId(book);
        book.splice(bookId, 1);
        bookModel.saveBook(book);
        bookView.confimationMessage('Libro eliminado con exito');
    }
}

module.exports = bookController;