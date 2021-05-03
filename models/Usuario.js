var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ViajeSchema = new Schema
({
   origen : { nombre: String, latitud : String, longitud : String },
   destino : { nombre: String, latitud : String, longitud : String },
   cupo : Number,
   descripcion : String,
   horaFecha : Date,
   tarifa : Number,
   placasAuto : String, //(placas)
   calificaciones : [{chofer : Number, viaje : Number}],
   participantes : [{correo : String}] //arreglo de correos de usuarios.
});


var UsuarioSchema = new Schema
({
    nombre : {type: String, required: true, max: 40},
    paterno : {type: String, required: true, max: 40},
    materno : {type: String, required: true, max: 40},
    correo : {type: String, required: true, max: 40},
    pass : {type: String, required: true, max: 40},
    nacimiento : {type: Date, required: true},
    autos : [{ marca : String, modelo : String, placas : String, noCirculacion : String}],
    licencia : { type: String, default: "" },
    viajes : [ViajeSchema]
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
