const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/books.json')

const publisherModel ={
    readPublisher : () =>{
        const data = fs.readFileSync(dataPath) //leemos el archivo de forma sincrona
        return JSON.parse(data)
    },

    savePublisher: (publishers) =>{
        fs.writeFileSync(dataPath, JSON.stringify(publishers, null, 2))
    },
}


module.exports = publisherModel;