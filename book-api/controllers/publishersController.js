const publishersModel = require('../models/publishersModel');
const publishersView = require('../views/publishersView');

const publisherController = {
    showAuthor: () => {
        const author = vehicleModel.readVehicle();
        vehicleView.showAuthor(author);
    },

    findAuthor: ()=> {
        //buscar por autor
    },

    addAuthor: () =>{
        const authorDescription = authorView.promptForAuthor(); 
        const author = authorModel.readAuthor();
        vehicle.push({"id": author.length + 1, "name": vehicleDescription.marca});
        vehicleModel.saveVehicle(vehicle);
        vehicleView.confimationMessage('Autor agregado con exito');
    },

    editAuthor: ()=>{
        //editar autor -- actualizar informacion
    },

    deleteVehicle: () =>{
        const vehicle = vehicleModel.readVehicle();
        if(vehicle.length === 0) {
            vehicleView.showVehicle('No hay vehiculos para eliminar');
            return;
        }
        const vehicleId = vehicleView.promptForVehicleId(vehicle);
        vehicle.splice(vehicleId, 1);
        vehicleModel.saveVehicle(vehicle);
        vehicleView.confimationMessage('Vehiculo eliminado con exito');
    }
}

module.exports = publisherController;