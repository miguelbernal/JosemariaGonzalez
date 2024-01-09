const UsuarioModel = require("../models/UsuarioModel")

exports.login = async (req, res, next) => {
    const usuario = req.body.usuario
    const clave = req.body.clave
    let datos = { status: 404, data: {} };
    const result = await UsuarioModel.login(usuario, clave)
    if (result.length > 0) {
        datos = { status: 200, datos: result[0]};
    }
    res.json(datos)
}

exports.getPage = async (req, res, next) => {
    let pag = req.query.pag;
    let buscar = req.query.buscar;
    let datos = { status: 404, datos: [] }
    const result = await UsuarioModel.getPage(pag, buscar)
    if (result.length > 0) {
        datos = { status: 200, datos: result }
    }
    res.json(datos)
}

exports.getOne = async (req, res, next) => {
    let id = req.params.id;
    let datos = { status: 404, datos: [] }
    const result = await UsuarioModel.getOne(id)
    if (result.length > 0) {
        datos = { status: 200, datos: result }
    }
    res.json(datos)
}

exports.insert = async (req, res, next) => {
    const nombre = req.body.nombre
    const usuario = req.body.usuario
    const clave = req.body.clave
    const id_rol = req.body.id_rol
    let datos = { status: 404, datos: [] }
    const result = await UsuarioModel.add(nombre, usuario, clave, id_rol)
    if (result.affectedRows > 0) {
        const data = {
            id_usuario: result.insertId,
            nombre: nombre,
            usuario: usuario,
            clave: clave,
            id_rol: id_rol
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.update = async (req, res, next) => {
    const nombre = req.body.nombre
    const usuario = req.body.usuario
    const clave = req.body.clave
    const id_rol = req.body.id_rol
    const id_usuario = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await UsuarioModel.update(nombre, usuario, clave, id_rol, id_usuario)
    if (result.affectedRows > 0) {
        const data = {
            id_usuario: id_usuario,
            nombre: nombre,
            usuario: usuario,
            clave: clave,
            id_rol: id_rol
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}

exports.delete = async (req, res, next) => {
    const id_usuario = req.params.id
    let datos = { status: 404, datos: [] }
    const result = await UsuarioModel.delete(id_usuario)
    if (result.affectedRows > 0) {
        const data = {
            id_usuario: id_usuario,
        }
        datos = { status: 200, data: data };
    }
    res.send(datos);
}
