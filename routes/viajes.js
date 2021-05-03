var express = require('express');
var router = express.Router();
var viaje = require('../controllers/ViajeController.js');

router.get('/', function(req, res, next){
  if(req.session.email)
    res.render('inicio',{correo:req.session.email});
  else
    res.render('../views/viajes/index');
  });
router.post('/search', viaje.search);
router.get('/mviajes', viaje.mviajes);
router.post('/add', viaje.add);
router.get('/goToAdd', viaje.goToAdd);
router.post('/addAuto', viaje.addAuto);
router.post('/addTrip', viaje.addTrip);
router.get('/getAll', viaje.getAll);
router.get('/main', viaje.main);
router.post('/calificar', viaje.calificar);
router.post('/load',viaje.load);
router.post('/goTomap', viaje.goTomap);
router.get('/loadView',function(req, res, next){res.render('../views/viajes/loadData');});
module.exports = router;
