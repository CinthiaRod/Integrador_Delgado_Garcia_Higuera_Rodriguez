const publishersModel = require('../models/publishersModel');
const views = require('../views/responseFormatter');


const pController = {
    showPublishers: () => {
        try {
            const publishers = publishersModel.readPublishers();
            views.publishersView.showPublishers(publishers);
        } catch (error) {
            views.publishersView.showError(error.message);
        }
    },

    addPublisher: () => {
        try {
            const publisherName = views.publishersView.promptForPublisher();
            const publishers = publishersModel.readPublishers();
            const publisherAnio = views.publishersView.promptForPublisherAnio();
            const newPublisher = { 
                id: publishers.length + 1, 
                publisher: publisherName,
                anio: publisherAnio
            };
            
            publishers.push(newPublisher);
            publishersModel.savePublisher(publishers);
            views.publishersView.confirmationMessage("Editorial agregada con éxito!");
        } catch (error) {
            console.error('Error al agregar la editorial:', error);
            throw error;
        }
    },

    findPublisher: () => {
        try {
            const name = views.publishersView.promptForPublisher().trim().toLowerCase();
            const publishers = publishersModel.readPublishers();

            if (!name || !publishers) {
                console.log("Datos inválidos para la búsqueda");
                return;
            }
    
            const results = publishers.filter(publisher => 
                publisher.publisher && typeof publisher.publisher === 'string' &&
                publisher.publisher.trim().toLowerCase().includes(name)
            );
    
            if (results.length === 0) {
                console.log("No se encontró ninguna editorial con ese nombre.");
            } else {
                views.publishersView.showPublishers(results);
            }
        } catch (error) {
            console.error('Error al buscar la editorial:', error.message);
            throw error;
        }
    },
    
    // findPublisher: () => {
    //     try {
    //         const name = views.publishersView.promptForPublisher().trim().toLowerCase();
    //         const publishers = publishersModel.readPublishers();

    //         if (!name || !publishers) {
    //             console.log("Datos inválidos para la búsqueda");
    //             return;
    //         }

    //         const results = publishers.filter(publisher => 
    //             publisher.name && typeof publisher.name === 'string' && 
    //             publisher.name.trim().toLowerCase().includes(name)
    //         );

    //         if (results.length === 0) {
    //             console.log("No se encontró ninguna editorial con ese nombre.");
    //         } else {
    //             views.publishersView.showPublishers(results);
    //         }
    //     } catch (error) {
    //         console.error('Error al buscar la editorial:', error.message);
    //         throw error;
    //     }
    // },

    deletePublisher: () => {
        try {
            const publishers = publishersModel.readPublishers();
            views.publishersView.showPublishers(publishers);
            const publisherId = views.publishersView.promptForPublisherId();
            
            const publisherIndex = publishers.findIndex(pub => pub.id === parseInt(publisherId));
            
            if (publisherIndex === -1) {
                console.log("Editorial no encontrada");
                return;
            }

            publishers.splice(publisherIndex, 1);
            publishersModel.savePublisher(publishers);
            return views.publishersView.confirmationMessage("Editorial eliminada con éxito!");
        } catch (error) {
            console.error('Error al eliminar la editorial:', error.message);
            throw error;
        }
    }
}

module.exports = pController;