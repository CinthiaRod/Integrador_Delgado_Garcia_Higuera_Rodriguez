const fs = require('fs'); //Importamos el modulo fs
const path = require('path'); //Importamos el modulo path

const dataPath = path.join(__dirname, '../data/authors.json'); //Ruta del archivo JSON

const authorModel = { //Declaramos la constante
    readAuthor: () => { //Función para leer la información
        try { // Utilizamos try/catch para el manejo de errores
            const data = fs.readFileSync(dataPath);  //leemos la información dentro de la ruta declarada
            return JSON.parse(data); //Parseamos la información
        } catch (error) {
            console.error('Error al leer el archivo authors.json:', error); //Mensaje en caso de error
            return; 
        }
    },

    saveAuthor: (authors) => { //Función para guardar la información
        try { // Utilizamos try/catch para el manejo de errores
            fs.writeFileSync(dataPath, JSON.stringify(authors, null, 2)); //Se escribe la información en el archivo y se agrega el formato de la información a escribir
        } catch (error) {
            console.error('Error al escribir en el archivo authors.json:', error); //Mensaje en caso de error
        }
    }

    // editAuthor: (authorId, newName) => { //Función para editar el autor
    //     try { // Utilizamos try/catch para el manejo de errores
    //         const authors = authorModel.readAuthor();  //Se lee la información
    //         const authorIndex = authors.findIndex(author => author.id === authorId); //Buscamos de acuerdo a su id/indice
    //         if (authorIndex === -1) { //Condición en caso de que sea -1
    //             throw new Error("Autor no encontrado"); //Mensaje de error, no encontrado
    //         }
    //         authors[authorIndex].name = newName; //Actualizamos la información de acuerdo al indice
    //         authorModel.saveAuthor(authors); //Guardamos la información
    //     } catch (error) {
    //         console.error('Error al editar el autor:', error); //Mensaje para manejo del error
    //         throw error;
    //     }
    // },
};

module.exports = authorModel;