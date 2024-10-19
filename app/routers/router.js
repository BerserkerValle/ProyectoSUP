
let express = require('express');
let router = express.Router();

 //constasntes de rutas 
const customers = require('../controllers/controller.js');
const usuarios = require('../controllers/usuario.js');

router.post('/api/customers/create', customers.create);
router.get('/api/customers/onebyid/:id', customers.getCustomerById);
router.put('/api/customers/update/:id', customers.updateById);
router.delete('/api/customers/delete/:id', customers.deleteById);

router.post('/api/usuarios/create', usuarios.create);
router.get('/api/usuarios/onebyid/:id', usuarios.getUsuarioById);
router.put('/api/usuarios/update/:id', usuarios.updateById);
router.delete('/api/usuarios/delete/:id', usuarios.deleteById);

module.exports = router;

