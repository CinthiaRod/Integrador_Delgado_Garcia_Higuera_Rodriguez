const fs = require('fs');
const path = require('path'); 

const dataPath = path.join(__dirname, '../data/publishers.json'); 

const publishersModel = { 
    readPublishers: () => { 
        try { 
            const data = fs.readFileSync(dataPath);  
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al leer el archivo publishers.json:', error); 
            return; 
        }
    },

    savePublisher: (publishers) => { 
        try { 
            fs.writeFileSync(dataPath, JSON.stringify(publishers, null, 3)); 
            //return true;
        } catch (error) {
            console.error('Error al escribir en el archivo publishers.json:', error); 
            //throw error;
        }
    }
}
module.exports = publishersModel;