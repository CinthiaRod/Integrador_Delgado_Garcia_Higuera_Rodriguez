const publishersModel = require('../models/publishersModel'); // Importa el modelo de editoriales para operaciones de base de datos
const views = require('../views/responseFormatter'); // Importa las vistas para formatear y mostrar respuestas

// Define el objeto controlador de editoriales
const pController = {
    showPublishers: () => { 
        try {// Lee todas las editoriales de la base de datos
            const publishers = publishersModel.readPublishers();
             // Muestra las editoriales usando la vista
            views.publishersView.showPublishers(publishers);
        } catch (error) {  // Si ocurre un error, lo muestra usando la vista
            views.publishersView.showError(error.message);
        }
    },

    addPublisher: () => {    // Función para agregar una nueva editorial
        try {
            const publisherName = views.publishersView.promptForPublisher();// Solicita el nombre de la editorial
            const publishers = publishersModel.readPublishers();// Lee todas las editoriales existentes
            const publisherAnio = views.publishersView.promptForPublisherAnio();// Solicita el año de la editorial
            const newPublisher = {   // Crea un nuevo objeto editorial
                id: publishers.length + 1, 
                publisher: publisherName,
                anio: publisherAnio
            };
            
            publishers.push(newPublisher);// Agrega la nueva editorial al array
            publishersModel.savePublisher(publishers);// Guarda el array actualizado de editoriales
            views.publishersView.confirmationMessage("Editorial agregada con éxito!");// Muestra un mensaje de confirmación
        } catch (error) {
            console.error('Error al agregar la editorial:', error); // Si ocurre un error, lo registra y lo lanza
            throw error;
        }
    },

    findPublisher: () => {// Función para buscar una editorial por nombre
        try {
            const name = views.publishersView.promptForPublisher().trim().toLowerCase(); // Solicita el nombre de la editorial y lo normaliza
            const publishers = publishersModel.readPublishers(); // Lee todas las editoriales
            // Verifica si los datos de búsqueda son válidos
            if (!name || !publishers) {
                console.log("Datos inválidos para la búsqueda");
                return;
            }
            // Filtra las editoriales basándose en el nombre de búsqueda
            const results = publishers.filter(publisher => 
                publisher.publisher && typeof publisher.publisher === 'string' &&
                publisher.publisher.trim().toLowerCase().includes(name)
            );
             // Muestra los resultados o un mensaje de "no encontrado"
            if (results.length === 0) {
                console.log("No se encontró ninguna editorial con ese nombre.");
            } else {
                views.publishersView.showPublishers(results);
            }
        } catch (error) {// Si ocurre un error, lo registra y lo lanza
            console.error('Error al buscar la editorial:', error.message);
            throw error;
        }
    },
    // Función para eliminar una editorial
    deletePublisher: () => {
        try {
            const publishers = publishersModel.readPublishers();// Lee todas las editoriales
            views.publishersView.showPublishers(publishers);// Muestra todas las editoriales
            const publisherId = views.publishersView.promptForPublisherId();// Solicita el ID de la editorial a eliminar
             // Encuentra el índice de la editorial con el ID dado
            const publisherIndex = publishers.findIndex(pub => pub.id === parseInt(publisherId));
            
            if (publisherIndex === -1) {// Si no se encuentra la editorial, muestra un mensaje y retorna
                console.log("Editorial no encontrada");
                return;
            }
            
            publishers.splice(publisherIndex, 1);// Elimina la editorial del array
            publishersModel.savePublisher(publishers);// Guarda el array actualizado de editoriales
            return views.publishersView.confirmationMessage("Editorial eliminada con éxito!");// Muestra un mensaje de confirmación
        } catch (error) {// Si ocurre un error, lo registra y lo lanza
            console.error('Error al eliminar la editorial:', error.message);
            throw error;
        }
    }
}
// Exporta el controlador de editoriales
module.exports = pController;
