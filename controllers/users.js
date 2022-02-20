const { request, response } = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');




const usuariosGet = async (req = request, res = response) => {
    //const { q, nombre, apellido, edad } = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const queryDB = { estado: true };
    //Se ejecutan peticiones esperando a que termine para procesar la siguiente
    /*
    const usuarios = await Usuario.find(queryDB)
        .skip(desde)
        .limit(limite);
    const total = await Usuario.countDocuments(queryDB);
    */
    //Se ejecutan peticiones simultaneamente y entrega el resultado en cuanto la ultima finalice
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(queryDB),
        Usuario.find(queryDB)
            .skip(desde)
            .limit(limite)
    ])
    res.json({
        total,
        usuarios

    })
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptar la contraseña

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en DB

    await usuario.save();

    res.json(usuario)
}

const usuariosDelete = async (req, res = response) => {

    const {id} = req.params;

    //Borrar fisicamente un registro
    //const usuario = await Usuario.findByIdAndDelete(id);
    //Inactivar logicamente el registro sin borrarlo
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})
    res.json({
        usuario
    })
}

const usuariosPut = async (req, res = response) => {
    const { id } = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findOneAndUpdate(id, resto, { new: true });

    res.json({
        usuario
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosDelete,
    usuariosPut
}