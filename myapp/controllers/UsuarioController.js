const UsuarioModel = require("../models/UsuarioModel")

exports.login = async (req, res, next) => {
    const usuario = req.body.usuario
    const clave = req.body.clave
    let datos = { status: 404, data: [] };
    const result = await UsuarioModel.login(usuario, clave)
    if (result.length > 0) {
        datos = { status: 200, datos: result[0]};
    }
    res.json(datos)
}

