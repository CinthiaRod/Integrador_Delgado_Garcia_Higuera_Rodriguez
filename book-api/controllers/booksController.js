const booksModel = require('../models/booksModel');
const views = require('../views/responseFormatter');

const bookController = {
    showBooks: () => { 
        try { 
            const books = booksModel.readBooks(); 
            views.booksView.showBooks(books);
        } catch (error) {
            views.booksView.showError(error.message); 
        }
    },
    addBook: () => { 
        try {  
            const bookName = views.booksView.promptForBook();
            const books = booksModel.readBooks(); 

            const newBook = { id: books.length + 1, title: bookName }; 
            books.push(newBook); 
            booksModel.saveBooks(books); 
            views.booksView.confirmationMessage("Libro agregado con éxito!");
        } catch (error) {
            console.error('Error al agregar el libro:', error);
            throw error; 
        }
    },
    findBook: () => {
        try {
            const title = views.booksView.promptForBook();
            const books = booksModel.readBooks();
            
            
            if (!title || !books) {
                console.log("Datos inválidos para la búsqueda");
                return;
            }
            const results = books.filter(book => 
                book.title && typeof book.title === 'string' && book.title.toLowerCase().includes(title.toLowerCase())
            );
    
            if (results.length === 0) {
                console.log("No se encontró ningún libro con ese título.");
            } else {
                views.booksView.showBooks(results);
            }
        } catch (error) {
            console.error('Error al buscar el libro:', error.message);
            throw error;
        }
    },
    
    deleteBook: () => { 
        try { 
            const books = booksModel.readBooks(); 
            views.booksView.showBooks(books);          
            const bookId = views.booksView.promptForBookId();
            const bookIndex = books.findIndex(book => book.id === parseInt(bookId)); 
    
            if (bookIndex === -1) {
                console.log("Libro no encontrado");
            }
            books.splice(bookIndex, 1); 
            booksModel.saveBooks(books); 
            return views.booksView.confirmationMessage("Libro eliminado con exito!");
            
        } catch (error) {
            console.error('Error al eliminar el libro:', error.message);
            throw error;
        }
    }
}//Este cierra el controller

module.exports = bookController;