const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/books.json')

const bookModel ={
    readBook : () =>{
        const data = fs.readFileSync(dataPath) //leemos el archivo de forma sincrona
        return JSON.parse(data)
    },

    saveBook: (books) =>{
        fs.writeFileSync(dataPath, JSON.stringify(books, null, 2))
    },
}


module.exports = bookModel;