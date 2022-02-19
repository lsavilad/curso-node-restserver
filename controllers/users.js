const {request, response } = require('express');

const usuariosGet = (req =request, res = response) => {
    const {q,nombre,apellido,edad} = req.query;
    res.json({
        msg: 'get api usuarios',
        q,
        nombre,
        apellido,
        edad
    })
}

const usuariosPost = (req,res = response) =>{
    const {nombre,edad,id,apellido} = req.body;
    res.json({
        msg: 'Post api usuarios',
        nombre,
        edad,
        id,
        apellido
    })
}

const usuariosDelete = (req,res = response) => {
    res.json({
        msg:'Delete api usuarios'
    })
}

const usuariosPut = (req,res = response) => {
    const id = req.params.id;
    res.json({
        msg:'Put api usuarios',
        id
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosDelete,
    usuariosPut
}