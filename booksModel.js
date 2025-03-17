//IPaso 1: Importamos modulos para el manejo de archivos
const fs = require('fs');
const path = require('path'); 

//Paso 2: Importamos archivo que contiene la base de datos
const dataPath = path.join(__dirname, '../data/books.json'); 

//Paso 3: Generamos modulo del modelo para manipular la base de datos
const booksModel = { 
    //Paso 4: Generamos funcion para leer libros
    readBooks: () => { 
        try { 
            //Leemos la base de datos con modulo fs
            const data = fs.readFileSync(dataPath);
            //Desplegamos la base de datos convirtiendo de JSON a JS para su correcto
            //manejo en el proyecto  
            return JSON.parse(data);
        //Manejamos el error
        } catch (error) {
            //Mostrar el error
            console.error('Error al leer el archivo books.json:', error); 
            return; 
        }
    },

    //Paso 5: Generamos funcion para guardar en la base de datos
    saveBooks: (books) => { 
        try { 
            //Escribimos en la base de datos utilizando el modulo fs
            //convirtiendo los datos de JS a JSON
            fs.writeFileSync(dataPath, JSON.stringify(books, null, 2)); 
        //Manejo del error
        } catch (error) {
            //Mostrar el error
            console.error('Error al escribir en el archivo books.json:', error); 
        }
    }
}

//Paso 6: Exportamos el modulo correspondiente al modelo del libro para su uso en
//otros archivos
module.exports = booksModel;