const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/authors.json')

const authorModel ={
    readAuthor : () =>{
        const data = fs.readFileSync(dataPath) //leemos el archivo de forma sincrona
        return JSON.parse(data)
    },

    saveAuthor: (authors) =>{
        fs.writeFileSync(dataPath, JSON.stringify(authors, null, 2))
    },
}


module.exports = authorModel;
