var mongoose = require('mongoose');
var Usuario = require("../models/Usuario");
var logins = require("../app");
var usuarioController = {};

usuarioController.list = function(req, res)
{
  Usuario.find({}).exec(function(err, usuarios)
  {
    if( err ){console.log('Error: ',err); return;}
    console.log("The index");
    res.render('../views/usuarios/list',{usuarios:usuarios});
  });
};

usuarioController.create = function(req, res, next){res.render('../views/usuarios/create');};

usuarioController.save = function(req, res)
{
  console.log(req.body);
    req.body.nacimiento = req.body.nacimiento + " 00:00:00";
    var usuario = new Usuario( req.body );
    //parent.children[0].name = 'Matthew';
    //m.nested.stuff = 'good';
    //usuario.viajes.push({ name: 'Liesl' });
    usuario.save(function(err)
    {
        if( err ){ console.log('Error: ', err); return; }
        console.log("Successfully created a product. :)");
        res.redirect("/usuarios/list");
    });
};

usuarioController.edit = function(req, res)
{
  Usuario.findOne({_id: req.params.id}).exec(function (err, usuario)
  {
    if (err) { console.log("Error:", err); return; }

    res.render("../views/usuarios/edit", {usuario: usuario});

  });
};

usuarioController.update = function(req, res)
{
    Usuario.findByIdAndUpdate( req.params.id, {$set:{
        nombre: req.body.nombre,
        paterno: req.body.paterno,
        correo: req.body.correo,
        licencia: req.body.licencia
    }}, { new: true },
    function( err, usuario)
    {
        if( err )
        {
            console.log('Error: ', err);
            res.render('../views/usuarios/edit', {usuario: req.body} );
        }
        console.log( usuario );
        res.redirect('/usuarios/list');
    });
};

usuarioController.delete = function(req, res)
{
    Usuario.remove({_id: req.params.id}, function(err)
    {
        if( err ){ console.log('Error: ', err); return; }
        console.log("Product deleted!");
        res.redirect("/usuarios/list");
    });
};

usuarioController.login = function(req, res)
{
  Usuario.findOne({ correo:req.body.mail, pass:req.body.pass }, 'correo').exec(function(err, usuario)
  {
    if (usuario != null)
    {
      res.send("S");
    }
    else
      res.send("F");
  });
};

usuarioController.loginregistro = function(req, res)
{
  Usuario.findOne({ correo:req.body.mail}).exec(function(err, usuario)
  {
    if (usuario != null)
    {
      res.send("S");
    }
    else
      res.send("F");
  });
};

module.exports = usuarioController;
