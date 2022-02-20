const Role = require('../models/role');
const Usuario = require('../models/usuario')

const esRoleValido = async (rol = "") => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol: ${rol}, no se encuentra registrado en la base de datos`);
    }
}

const emailExiste = async (correo = "") => {
    const existe = await Usuario.findOne({ correo });

    if (existe) {
        console.log(existe)
        throw new Error(`El correo: ${correo}, ya se encuentra registrado`);
    }
}

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        console.log(existeUsuario)
        throw new Error(`El id: ${id}, no existe`);
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}