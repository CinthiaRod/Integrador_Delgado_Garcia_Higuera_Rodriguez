const fs = require('fs');
const path = require('path'); 

const dataPath = path.join(__dirname, '../data/books.json'); 

const booksModel = { 
    readBooks: () => { 
        try { 
            const data = fs.readFileSync(dataPath);  
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer el archivo books.json:', error); 
            return; 
        }
    },

    saveBooks: (books) => { 
        try { 
            fs.writeFileSync(dataPath, JSON.stringify(books, null, 2)); 
        } catch (error) {
            console.error('Error al escribir en el archivo books.json:', error); 
        }
    }
}
module.exports = booksModel;