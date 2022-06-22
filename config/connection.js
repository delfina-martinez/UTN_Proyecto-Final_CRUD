const mysql = require('mysql'); // Requiere el módulo de MySQL

data = require('./userData.json'); // Llama a los datos del archivo json por medio de data

// Crea un objeto de conexión o configuración
objectConnection = { // Este objeto recibe los datos de conexión con la db
    host: data.mysql.host,
    port: data.mysql.port,
    user: data.mysql.user,
    password: data.mysql.password,
    database: data.mysql.database,
}

// Constante para utilizar el objeto de conexión, al cual recibe como parámetro
const myConnection = mysql.createConnection(objectConnection);

// Utiliza la const para hacer la conexión a la db y un callback
myConnection.connect((error) => {
    if (error) {
        console.error('Error de conexión: ' + error);
        return;
    }
    console.log('Conectado exitosamente a la base de datos.')
})

module.exports = myConnection; // Exporta la constante