const authorModel = require('../models/authorModel'); //Importamos el modulo del modelo del autor
const views = require('../views/responseFormatter'); //Importamos el modulo de la vista del autor

const authorController = { //Declaramos una variable para manejar las funcionalidades
    showAuthor: () => { // Funcionalidad para listar los autores
        try { // Utilizamos try/catch para el manejo de errores
            const authors = authorModel.readAuthor(); //Leemos el archivo de athors.json tomado del modulo del modelo
            views.authorView.showAuthor(authors); //Llamamos a la función con la variable declarada
        } catch (error) {
            views.authorView.showError(error.message); //Mensaje para manejo de errores
        }
    },

    addAuthor: () => { //Función para agregar un nuevo autor
        try {  // Utilizamos try/catch para el manejo de errores
            const authorName = views.authorView.promptForAuthor();
            const authors = authorModel.readAuthor(); //Se lee la información //
            const newAuthor = { id: authors.length + 1, name: authorName }; //Se agrega la información del nuevo autor con el siguiente formato
            authors.push(newAuthor);  // Se hace push para enviar la información al archivo 
            authorModel.saveAuthor(authors); //Se guarda la información
            views.authorView.confirmationMessage("Autor agregado con éxito!");
            //Retorna el nuevo autor agregado
        } catch (error) {
            console.error('Error al agregar el autor:', error); //Mensaje de error
            throw error; // Menejo del error
        }
    },

    findAuthor: () => {
        try {
            // Solicita el nombre del autor desde la vista
            const name = views.authorView.promptForAuthor().trim().toLowerCase();
    
            // Lee la información desde el modelo
            const authors = authorModel.readAuthor();

            if (!name || !authors) {
                console.log("Datos inválidos para la búsqueda");
                return;
            }
    
            // Realiza la búsqueda ignorando mayúsculas/minúsculas
            const results = authors.filter(author => 
                author.name && typeof author.name === 'string' &&
                author.name.trim().toLowerCase().includes(name)
            );

            if (results.length === 0) {
                console.log('No se encontro ningun autor con ese nombre.');
            } else {
                views.authorView.showAuthor(results);
            }
        } catch (error) {
            console.error('Error al buscar el autor:', error.message);
            throw error;
        }
    },
    
    deleteAuthor: () => { //Funcionalidad para eliminar un autor
        try { // Utilizamos try/catch para el manejo de errores
            const authors = authorModel.readAuthor(); //Leemos la información
            views.authorView.showAuthor(authors);          
            const authorId = views.authorView.promptForAuthorId();
            const authorIndex = authors.findIndex(author => author.id === parseInt(authorId)); //Buscamos de acuerdo a su id/indice
    
            if (authorIndex === -1) {
                console.log("Autor no encontrado");
            }
            authors.splice(authorIndex, 1); //Modificamos la información del arreglo utilizando el metodo .splice()
            authorModel.saveAuthor(authors); //Guardamos las modificaciones
            return views.authorView.confirmationMessage("Autor eliminado con exito!");
            
        } catch (error) {
            console.error('Error al eliminar el autor:', error.message);
            throw error;
        }
    }
};

module.exports = authorController; //Exportamos el modulo de controlador de autores
