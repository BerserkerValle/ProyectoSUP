const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./app/config/db.config.js');
const cors = require('cors');
let router = require('./app/routers/router.js');

// Configurar CORS
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Middleware para parsear JSON
app.use(bodyParser.json());

// Sincronizar la base de datos
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync with { force: true }');
});

// Usar las rutas
app.use('/', router);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "Servicio activo" });
});

// Crear el servidor
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});

// Manejo de errores
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Aplicar lógica para finalizar la aplicación, si es necesario
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
  // Aplicar lógica para finalizar la aplicación, si es necesario
  process.exit(1);
});
