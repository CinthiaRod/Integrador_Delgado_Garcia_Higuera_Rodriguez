const fs = require('fs');// Importar el módulo fs para manejar operaciones de archivos
const path = require('path'); // Importar el módulo 'path' para manejar rutas de archivos y directorios

const dataPath = path.join(__dirname, '../data/publishers.json'); // Definir la ruta del archivo publishers.json usando path.join para asegurar compatibilidad entre sistemas

const publishersModel = { // Crear un objeto publishersModel que contiene métodos para leer y guardar datos de editoriales
    readPublishers: () => { // Método para leer los datos de las editoriales desde el archivo JSON
        try { // Leer el archivo 'publishers.json' de manera síncrona
            const data = fs.readFileSync(dataPath);  // Convertir los datos de formato JSON a un objeto JavaScript
            return JSON.parse(data);
        } catch (error) { // Manejar errores en caso de que la lectura del archivo falle
            console.error('Error al leer el archivo publishers.json:', error); 
            return; 
        }
    },
// Método para guardar los datos de las editoriales en el archivo JSON
    savePublisher: (publishers) => { 
        try { 
            fs.writeFileSync(dataPath, JSON.stringify(publishers, null, 3)); // Escribir los datos en el archivo publishers.json de manera síncrona
            // JSON.stringify convierte el objeto JavaScript a formato JSON con un formato legible (indentación de 3 espacios).
        } catch (error) {
            console.error('Error al escribir en el archivo publishers.json:', error); // Manejar errores en caso de que la escritura del archivo falle
            
        }
    }
}
module.exports = publishersModel;// Exportar el objeto publishersModel para que pueda ser utilizado en otros módulos
