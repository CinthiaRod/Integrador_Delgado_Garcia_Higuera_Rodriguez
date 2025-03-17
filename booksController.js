//Paso 1: Importamos modulos
//archivos con las funciones a utilizar que corresponden al modelo y la vista
//para el correcto funcionamiento y comunicación de nuestro sistema de gestión de biblioteca
//específicamente para libros.
const booksModel = require('../models/booksModel');
const views = require('../views/responseFormatter');

//Paso 2: Creamos el modulo que contendrá todo el funcionamiento del controlador para los libros
//Dentro del modulo se encuentran las funciones para el correcto funcionamiento del menú desplegado para el cliente
const bookController = {
    //Paso 3: Creamos función para mostrar libros
    showBooks: () => { 
        try { 
            //Creamos variable "libros" que lee la base de datos de libros según las instrucciones del modelo
            const books = booksModel.readBooks(); 
            //Utilizamops función de la vista para mostrar los libros
            views.booksView.showBooks(books);
        //manejamos el error utilizando una función de la vista
        } catch (error) {
            views.booksView.showError(error.message); 
        }
    },

    //Paso 4: Creamos función para añadir un libro
    addBook: () => { 
        try {  
            //Solicitamos al usuario libro que busca añadir mediante el uso de una pregunta
            //especificada en la vista
            const bookName = views.booksView.promptForBook();
            //leemos la base de datos con una función del modelo
            const books = booksModel.readBooks(); 

            //Generamos objeto del nuevo libro por añadir que contenga el ID y el nombre (provisto por el usuario)
            const newBook = { id: books.length + 1, title: bookName };
            //Agregamos el objeto al array de la base de datos de libros 
            books.push(newBook); 
            //Guardamos los cambio en la base de datos utilizando una función del modelo
            booksModel.saveBooks(books);
            //Mandamos un mensaje de confirmación al usuario 
            views.booksView.confirmationMessage("Libro agregado con éxito!");

        //Manejamos el error
        } catch (error) {
            //Muestra al usuario mensaje del error.
            console.error('Error al agregar el libro:', error);
            throw error; 
        }
    },

    //Paso 5: Creamos función para buscar un libro
    findBook: () => {
        try {
            //Solicitamos al usuario el nombre del libro a buscar con una función de la vista
            const title = views.booksView.promptForBook();
            //Leemos la base de datos de libros con una función del modelo
            const books = booksModel.readBooks();
            
            //Ciclo for para añadir la información
            //Si el titulo provisto por el usuario es diferente a los libros guardados
            if (!title || !books) {
                //Despliega el siguiente mensaje
                console.log("Datos inválidos para la búsqueda");
                return;
            }
            //En caso contrario, generamos variable con los resultados de la busqueda
            //El criterio de busqueda configura el titulo convirtiendolo a texto y en minusculas.
            const results = books.filter(book => 
                book.title && typeof book.title === 'string' && book.title.toLowerCase().includes(title.toLowerCase())
            );
    
            //Si la busqueda no arroja resultados
            if (results.length === 0) {
                //Muestra mensaje de que no existe ese libro
                console.log("No se encontró ningún libro con ese título.");
            } else {
                //Si la busqueda contiene elementos
                //Muestra el resultado según la vonfiguración de view
                views.booksView.showBooks(results);
            }

        //Manejamos el error
        } catch (error) {
            //Muestra al usuario el error
            console.error('Error al buscar el libro:', error.message);
            throw error;
        }
    },
    
    //Paso 6: Creamos funcion para borrar libro
    deleteBook: () => { 
        try { 
            //Leemos base de datos con funcion del modelo
            const books = booksModel.readBooks(); 
            //Mostramos los libros al usuario con función de la vista
            views.booksView.showBooks(books); 
            //Solicitamos al cliente el ID del libro a borrar         
            const bookId = views.booksView.promptForBookId();
            //Realizamos la busqueda del libro por ID
            //Configurando la respuesta del usuario a numero
            const bookIndex = books.findIndex(book => book.id === parseInt(bookId)); 
    
            //Si el ID del libro no se encuentra en la base de datos 
            if (bookIndex === -1) {
                //Retorna mensaje de no encontrarlo
                console.log("Libro no encontrado");
            }
            //Si el ID se encuentra en la base de datos, se elimina el objeto correspondiente al libro
            books.splice(bookIndex, 1); 
            //Guardamos los cambios
            booksModel.saveBooks(books); 
            //Generamos un mensaje de confirmación del proceso al cliente 
            return views.booksView.confirmationMessage("Libro eliminado con exito!");
            
        //Manejamos el error
        } catch (error) {
            //Enviamos mensaje de error al cliente
            console.error('Error al eliminar el libro:', error.message);
            throw error;
        }
    }
}

//Exportamos el modulo del Controlador para su uso en otro archivo
module.exports = bookController;