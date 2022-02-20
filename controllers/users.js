const { request, response } = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');




const usuariosGet = (req = request, res = response) => {
    const { q, nombre, apellido, edad } = req.query;
    res.json({
        msg: 'get api usuarios',
        q,
        nombre,
        apellido,
        edad
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

    res.json({
        msg: 'Post api usuarios',
        usuario
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'Delete api usuarios'
    })
}

const usuariosPut = async (req, res = response) => {
    const { id } = req.params.id;
    const {password, google,correo,...resto} = req.body;
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    
    res.json({
        msg: 'Put api usuarios',
        id
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosDelete,
    usuariosPut
}