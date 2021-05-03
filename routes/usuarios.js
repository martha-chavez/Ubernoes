var express = require('express');
var router = express.Router();
var usuario = require('../controllers/UsuarioController.js');

router.post('/', function(req, res, next) {
  req.session.email = req.body.mail;
  res.redirect('/viajes/main');
});

router.post('/index', function(req, res, next) {
  req.session.email = req.body.mail;
  res.redirect('/viajes/main');
});

router.get('/create', usuario.create);
router.get('/list', usuario.list);
router.get('/edit/:id', usuario.edit);
router.post('/update/:id', usuario.update);
router.post('/delete/:id', usuario.delete);
router.post('/save', usuario.save);
router.post('/login', usuario.login);
router.post('/loginregistro', usuario.loginregistro);
module.exports = router;
