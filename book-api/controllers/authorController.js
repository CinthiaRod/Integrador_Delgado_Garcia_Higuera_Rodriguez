const authorModel = require('../models/authorModel'); //Importamos el modulo del modelo del autor
const views = require('../views/responseFormatter'); //Importamos el modulo de la vista del autor

const authorController = { 

    // Función para listar los autores
    showAuthor: () => { 
        // Utilizamos try/catch para el manejo de errores
        try { 
            //Leemos el archivo de athors.json tomado del modulo del modelo y ejecutamos la función para listar los autores
            const authors = authorModel.readAuthor(); 
            views.authorView.showAuthor(authors); 

        //Mensaje para manejo de errores
        } catch (error) {
            views.authorView.showError(error.message);
        }
    },
    //Función para agregar un nuevo autor
    addAuthor: () => {
        // Utilizamos try/catch para el manejo de errores
        try {  
            //Utilizamos prompt para el ingreso de datos por parte del cliente, leemos la información, agregamos el nuevo autor con el ID y guardamos la información en el archivo
            const authorName = views.authorView.promptForAuthor();  
            const authors = authorModel.readAuthor(); 
            const newAuthor = { id: authors.length + 1, name: authorName }; 
                authors.push(newAuthor);  
                authorModel.saveAuthor(authors); 
            views.authorView.confirmationMessage("Autor agregado con éxito!"); 

         //Mensaje para manejo de errores
        } catch (error) {
            console.error('Error al agregar el autor:', error); 
            throw error; 
        }
    },

    //Función para buscar autores
    findAuthor: () => { 
        // Utilizamos try/catch para el manejo de errores
        try {

            // Solicita el nombre del autor a buscar, leemos la información del archivo
            const name = views.authorView.promptForAuthor().trim().toLowerCase();
            const authors = authorModel.readAuthor();

            //Utilizamos una condición para manejar si los datos ingresados son invalidos
            if (!name || !authors) {
                console.log("Datos inválidos para la búsqueda");
                return;
            }
    
            // Realiza la búsqueda ignorando mayúsculas/minúsculas
            const results = authors.filter(author => 
                author.name && typeof author.name === 'string' &&
                author.name.trim().toLowerCase().includes(name)
            );

            //Utilizamos una condición para validar los datos ingresados para la busqueda y sus posibles resultados
            if (results.length === 0) {
                console.log('No se encontro ningun autor con ese nombre.');
            } else {
                views.authorView.showAuthor(results);
            }

        //Mensaje para manejo de errores
        } catch (error) {
            console.error('Error al buscar el autor:', error.message);
            throw error;
        }
    },
    
    //Función para eliminar un autor
    deleteAuthor: () => { 
        // Utilizamos try/catch para el manejo de errores
        try { 
            //Se lee la informacion del archivo y se ingresa el ID del autor a eliminar
            const authors = authorModel.readAuthor(); 
                views.authorView.showAuthor(authors);          
            const authorId = views.authorView.promptForAuthorId();
            //Buscamos de acuerdo a su id/indice
            const authorIndex = authors.findIndex(author => author.id === parseInt(authorId)); 
                //Utilizamos una condición en caso de dato ingresado no encontrado
                if (authorIndex === -1) {
                    console.log("Autor no encontrado");
            }

            //Modificamos la información del arreglo utilizando el metodo .splice() y guardamos la información en el archivo con las actualizaciones
            authors.splice(authorIndex, 1); 
            authorModel.saveAuthor(authors); 
            return views.authorView.confirmationMessage("Autor eliminado con exito!");

        //Mensaje para manejo de errores  
        } catch (error) {
            console.error('Error al eliminar el autor:', error.message);
            throw error;
        }
    }
};

//Exportamos el modulo de controlador de autores
module.exports = authorController; 
