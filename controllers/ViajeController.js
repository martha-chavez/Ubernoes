var mongoose = require('mongoose');
var Usuario = require("../models/Usuario");

var viajeController = {};

viajeController.search = function(req, res)
{
  //console.log(req.body.correo);
  Usuario.findOne({ correo: req.body.correo },'viajes').exec(function(err, viajes)
  {
    if( err ){console.log('Error: ',err); return;}
    //console.log(viajes);
    res.render('../views/viajes/list',{ viajes:viajes, correo:req.body.correo });
  });

};
viajeController.mviajes= function(req, res)
{
  if(req.session.email){
      Usuario.findOne({ correo: req.session.email },'viajes').exec(function(err, viajes)
    {
      if( err ){console.log('Error: ',err); return;}
      Usuario.findOne({ correo: req.session.email },'autos licencia').exec(function(err, obj2)
      {
        Usuario.find({correo: {$ne: req.session.email},viajes:{$elemMatch:{cupo:{ $gte: 1 }}}},'viajes').exec(function(err, usuarios)
        {
          let currentTime = new Date();
          let current = new Array();
          if( err ){console.log('Error: ',err); return;}
          for (usuario of usuarios)
          {
            for (viaje of usuario.viajes)
            {
              let b = "F";
              for (participante of viaje.participantes)
              {
                if (participante.correo === req.session.email)
                {
                  b = "T";
                  break;
                }
              }
              if ( (b === "T") && (viaje.horaFecha >= currentTime) )
                current.push(viaje);
            }
          }
          res.render('../views/MisViajes',{ viajes:viajes, cViajes:current, correo:req.session.email });
        });
      });
    });
  }else {
    res.redirect('/');
  }
};

viajeController.goTomap = function(req, res)
{
  if(req.session.email)
  {
    Usuario.findOne({viajes : {$elemMatch : {_id : req.body.idViaje}}}, {viajes : {$elemMatch : {_id : req.body.idViaje}}}).exec(function(err, usuario)
   {
     if( err ){console.log('Error: ',err); return;}
     let b = "F";
     for (var participante of usuario.viajes[0].participantes)
     {
       if(participante.correo === req.session.email)
       {
         b = "T";
         break;
       }
     }
     if(b === "T")
     {
       res.render('../views/mapa/mapa',{ o_latitud:usuario.viajes[0].origen.latitud,o_longitud:usuario.viajes[0].origen.longitud,d_latitud:usuario.viajes[0].destino.latitud,d_longitud:usuario.viajes[0].destino.longitud});
     }
   });
  }
  else {
    res.redirect('/');
  }
};
viajeController.calificar = function(req, res, next)
{
  if(req.session.email)
  {
    Usuario.findOne({viajes : {$elemMatch : {_id : req.body.idViaje}}}, {viajes : {$elemMatch : {_id : req.body.idViaje}}}).exec(function(err, usuario)
    {
      if( err ){console.log('Error: ',err); return;}
      let b = "F";
      for (var participante of usuario.viajes[0].participantes)
      {
        if(participante.correo === req.session.email)
        {
          b = "T";
          break;
        }
      }
      if(b === "T")
      {
        let c = parseInt(req.body.cChofer, 10);
        let v = parseInt(req.body.cViaje, 10);
        let califs = {
          chofer : c,
          viaje : v
        };
        console.log(califs);
        usuario.viajes[0].calificaciones.push( califs );
        usuario.save(function(err){ if( err ){ console.log('Error: ', err); res.send("F"); return; } });
        res.send("S");
      }
    });
  }
  else
  {
    res.redirect('/');
  }
};

viajeController.goToAdd = function(req, res, next)
{
  if(req.session.email){
    Usuario.findOne({ correo: 'master@mail.com' },'viajes.origen').exec(function(err, obj1)
    {
      if( err ){console.log('Error: ',err); return;}
      Usuario.findOne({ correo: req.session.email },'autos licencia').exec(function(err, obj2)
      {//Llenar en base al correo de la sesion
        res.render('../views/viajes/add',{ origenes:obj1.viajes, autos:obj2.autos, licencia:obj2.licencia, tittle:"Registro Viaje" });
      });
    });
  }
  else {
    res.redirect('/');
  }
};

viajeController.addAuto = function(req, res, next)
{
  if(req.session.email){
    Usuario.findOne({ correo: req.session.email }).exec(function(err, usuario)
    {
      var auto =
      {
        marca : req.body.marca,
        modelo : req.body.modelo,
        placas : req.body.placas,
        noCirculacion : req.body.noCirculacion
      };
      usuario.autos.push( auto );
      usuario.save(function(err)
      {
          if( err ){ console.log('Error: ', err); return; }
          console.log("Successfully added a car. :)");
          res.redirect('/viajes/goToAdd');
      });
    });
  }
  else{
    res.redirect('/');
  }
};

viajeController.add = function(req, res, next)
{
  if(req.session.email)
  {
    // if(req.body.origen !== req.body.destino)
    if(req.body.o_nombre !== req.body.d_nombre)

    {
      //Query > en el array viajes haz match con el elemento de origen.nombre igual a Yucatan y regresame solo ese punto
      //con todos sus datos, puede ser de cualquier usuario, el punto es el mismo, mientras no se modifique el original
      //Cuidado con los index, en este caso solo retornamos un elemento
      Usuario.findOne( {viajes:{$elemMatch:{'origen.nombre':req.body.o_nombre}}}, { 'viajes.$': 1 } ).exec(function(err, obj1)
      {
        if( err ){console.log('Error: ',err); return;}
        Usuario.findOne( {viajes:{$elemMatch:{'origen.nombre':req.body.d_nombre}}}, { 'viajes.$': 1 } ).exec(function(err, obj2)
        {
          if( err ){console.log('Error: ',err); return;}
          Usuario.findOne( {correo: req.session.email, autos:{$elemMatch:{'modelo':req.body.modelo}}}, { 'autos.$': 1 } ).exec(function(err, obj3)
          {
            if( err ){console.log('Error: ',err); return;}
            Usuario.findOne({ correo: req.session.email }).exec(function(err, usuario)
            {
              var viaje =
              {
                // origen : { nombre: obj1.viajes[0].origen.nombre, latitud : obj1.viajes[0].origen.latitud, longitud : obj1.viajes[0].origen.longitud },
                // destino : { nombre: obj2.viajes[0].origen.nombre, latitud : obj2.viajes[0].origen.latitud, longitud : obj2.viajes[0].origen.longitud },
                origen : { nombre: req.body.o_nombre, latitud : req.body.o_latitud, longitud : req.body.o_longitud },
                destino : { nombre: req.body.d_nombre, latitud : req.body.d_latitud, longitud : req.body.d_longitud },
                cupo : req.body.cupo,
                descripcion : req.body.descripcion,
                horaFecha : (req.body.fecha+" "+req.body.hora),
                tarifa : req.body.tarifa,
                placasAuto : obj3.autos[0].placas
              };
              usuario.viajes.push( viaje );
              usuario.licencia = req.body.licencia;
              usuario.save(function(err)
              {
                  if( err ){ console.log('Error: ', err); return; }
                  res.redirect('/viajes/mviajes');
              });
            });
          });
        });
      });
    }
    else {
      console.log("son iguales", req.body);
    }
  }
  else
  {
    res.redirect('/');
  }
};

viajeController.load = function(req, res, next)
{
  Usuario.findOne({ correo: req.body.correo }).exec(function(err, usuario)
  {
    var viaje =
    {
      origen : { nombre: req.body.o_nombre, latitud : req.body.o_latitud, longitud : req.body.o_longitud },
    };
    usuario.viajes.push( viaje );
    usuario.save(function(err)
    {if( err ){ console.log('Error: ', err); return; }});
  });
};

viajeController.getAll = function(req, res, next)
{
  if(req.session.email)
  {
    Usuario.find({correo: {$ne: req.session.email},viajes:{$elemMatch:{cupo:{ $gte: 1 }}}},'viajes').exec(function(err, usuarios)
    {
      let currentTime = new Date();
      let viajesAva = new Array();
      if( err ){console.log('Error: ',err); return;}
      for (usuario of usuarios)
      {
        for (viaje of usuario.viajes)
        {
          let b = "T";
          for (participante of viaje.participantes)
          {
            if (participante.correo === req.session.email)
            {
              b = "F";
              break;
            }
          }
          if ( (b === "T") && (viaje.horaFecha >= currentTime) )
            viajesAva.push(viaje);
        }
      }
      res.render('../views/viajes/all',{ viajes:viajesAva, title:"Viajes Disponibles"});
    });
  }
  else
  {
    res.redirect('/');
  }
};

viajeController.addTrip = function(req, res, next)
{
  if(req.session.email)
  {
    Usuario.findOne({viajes : {$elemMatch : {_id : req.body.idViaje}}}, {viajes : {$elemMatch : {_id : req.body.idViaje}}}).exec(function(err, usuario)
    {
      if( err ){console.log('Error: ',err); return;}
      let b = "T";
      for (var participante of usuario.viajes[0].participantes)
      {
        if(participante.correo === req.session.email)
        {
          b = "F";
          break;
        }
      }
      if(b === "T")
      {
        let newCupo = usuario.viajes[0].cupo - 1;
        Usuario.findOneAndUpdate
        (
          { _id: usuario._id, 'viajes._id': usuario.viajes[0]._id },
          { $set: { 'viajes.$.cupo': newCupo } },
          { new: true },
          (err, doc) => {}
        );
        usuario.viajes[0].participantes.push( {correo : req.session.email} );
        usuario.save(function(err){ if( err ){ console.log('Error: ', err); res.send("F"); return; } });
        res.send("S");
      }
      console.log("Salida>> "+b);
    });
  }
  else
  {
    res.redirect('/');
  }
};

viajeController.main = function(req, res, next){
  if(req.session.email)
  {
    res.render('inicio',{correo:req.session.email});
  }
  else {
    res.redirect('/');
  }
};
module.exports = viajeController;
