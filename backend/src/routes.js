const express = require('express');
const cors = require('cors')

const UsuarioController = require('./controllers/UsuarioController');
const AdminController = require('./controllers/AdminController');
const AparelhoController = require('./controllers/AparelhoController');
const TreinoController = require('./controllers/TreinoController');
const UsuarioTreinoController = require('./controllers/UsuarioTreinoController');
const SessaoController = require('./controllers/SessaoController');

const routes = express.Router();

routes.get('/usuarios', UsuarioController.index);
routes.get('/usufull', UsuarioController.indexFull);
routes.post('/usuarios', UsuarioController.create);

routes.get('/admins', AdminController.index);
//routes.post('/admins', AdminController.create);

routes.get('/aparelhos', AparelhoController.index);
routes.post('/aparelhos', AparelhoController.create);

routes.get('/treinos', TreinoController.index);
routes.post('/treinos', TreinoController.create);


routes.get('/usuarioTreinos', UsuarioTreinoController.index);
routes.get('/economiaAdmin', UsuarioTreinoController.economiaAdmin);
routes.get('/economiaUser', UsuarioTreinoController.economiaUser);
routes.post('/usuarioTreinos', UsuarioTreinoController.create);


routes.get('/sessoes', SessaoController.index);
routes.post('/sessoes', SessaoController.create);


module.exports = routes;



