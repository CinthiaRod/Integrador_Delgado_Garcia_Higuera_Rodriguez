const authorModel = require('../models/authorModel');
const authorView = require('../views/authorView');

const authorController = {
    showAuthor: () => {
        const author = authorModel.readAuthor();
        authorView.showAuthor(author);
    },

    findAuthor: ()=> {
        //buscar por autor.
    },

    addAuthor: () =>{
        const authorDescription = authorView.promptForAuthor(); 
        const author = authorModel.readAuthor();
        author.push({"id": author.length + 1, "name": authorDescription.name});
        authorModel.saveAuthor(author);
        authorView.confimationMessage('Autor agregado con exito');
    },

    editAuthor: ()=>{
        //editar autor -- actualizar informacion
    },

    deleteAuthor: () =>{
        const author = authorModel.readAuthor();
        if(author.length === 0) {
            authorView.showAuthor('No hay autores para eliminar');
            return;
        }
        const authorId = authorView.promptForAuthorId(author);
        author.splice(authorId, 1);
        authorModel.saveAuthor(author);
        authorView.confimationMessage('Autor eliminado con exito');
    }
}

module.exports = authorController;