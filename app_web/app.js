const express = require('express'); // Requiere el módulo express

const port = (process.env.port || 5000); // Le asigna el puerto que encuentre libre en el S.O. o le da el puerto 5000

const app = express(); // Inicializa express

const path = require('path'); // Permite manejar las rutas tanto relativas como absolutas de nuestra PC y de nuestro proyecto

// Configuración
app.set('port', port); // Envía el puerto a la app

// Motor de plantillas
app.set('views engine', 'ejs'); // Establece el motor de plantilla con archivos ejs, en lugar de html normal
app.set('views', __dirname + '/views'); // Indica a express que las vistas estarán en la carpeta views

// Middlewares
// Define el directorio de recursos (estático) al mismo nivel que la carpeta views
app.use(express.static(path.join(__dirname, 'views/public')))
app.use(express.urlencoded({extended: false})); // Permite recuperar los valores publicados en un request
                                                // (sin esta línea no se podrían traer los datos guardados, se muestran en blanco)
app.use(express.json()); // Se utilizará el formato json

// Routes
app.use('/', require('./routes/router'));

module.exports = app;