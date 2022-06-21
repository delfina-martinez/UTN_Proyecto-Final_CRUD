/* Levanta el servidor */

const app = require('./app_web/app');

app.listen(app.get('port'), (error) => {
    if(error){
        console.error('Error de conexión: ' + error);
        return;
    }
    console.log("Servidor corriendo en http://localhost:5000");
})