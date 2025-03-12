const publishersModel = require('../models/publishersModel');
const publishersView = require('../views/publishersView');

const publisherController = {
    showPublishers: () => {
        const publisher = publishersModel.readPublisher();
        publishersView.showPublishers(publisher);
    },

    findPublishers: ()=> {
        //buscar por autor
    },

    addPublisher: () =>{
        const publisherDescription = publishersView.promptForPublisher(); 
        const publisher = publishersModel.readPublisher();
        publisher.push({"id": publisher.length + 1, "publisher": publisherDescription.publisher});
        publishersModel.savePublisher(publisher);
        publishersView.confimationMessage('Editorial agregada con exito');
    },

    editPublisher: ()=>{
        //editar editorial -- actualizar informacion
    },

    deletePublisher: () =>{
        const publisher = publishersModel.readPublisher();
        if(publisher.length === 0) {
            publishersView.showPublishers('No hay editoriales para eliminar');
            return;
        }
        const publisherId = publishersView.promptForPublisherId(publisher);
        publisher.splice(publisherId, 1);
        publishersModel.savePublisher(publisher);
        publishersView.confimationMessage('Editorial eliminada con exito');
    }
}

module.exports = publisherController;