const fs = require('fs'); //Importamos el modulo fs
const path = require('path'); //Importamos el modulo path

//Ruta del archivo JSON
const dataPath = path.join(__dirname, '../data/authors.json'); 

const authorModel = { 
    //Función para leer la información
    readAuthor: () => { 
        // Utilizamos try/catch para el manejo de errores
        try { 
            //leemos la información dentro de la ruta declarada y la parseamos
            const data = fs.readFileSync(dataPath);  
            return JSON.parse(data); 

        //Mensaje para manejo de errores
        } catch (error) {
            console.error('Error al leer el archivo authors.json:', error); //Mensaje en caso de error
            return; 
        }
    },

    //Función para guardar la información
    saveAuthor: (authors) => { 
        // Utilizamos try/catch para el manejo de errores
        try { 
            //Se escribe la información en el archivo y se agrega el formato de la información a escribir
            fs.writeFileSync(dataPath, JSON.stringify(authors, null, 2)); 
        //Mensaje para manejo de errores 
        } catch (error) {
            console.error('Error al escribir en el archivo authors.json:', error); //Mensaje en caso de error
        }
    }
};

//Exportamos el modulo de modelo de autore
module.exports = authorModel;