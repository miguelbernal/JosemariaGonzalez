const PermisoModel = require("../models/PermisoModel")

exports.getRol = async (req, res, next) => {
    let datos = { status: 404, data: [] }

    let id_rol = 1
    result = await PermisoModel.getRol(id_rol)
    if (result.length > 0) {
        datos = { status: 200, data: result }
    }
    res.send(datos)
}

exports.insert = async (req, res, next) => {
    let datos = { status: 404, data: [] }
    const id_rol = req.body.id_rol
    const id_formulario = req.body.id_formulario
    const habilitar = req.body.habilitar
    const consultar = req.body.consultar
    const agregar = req.body.agregar
    const modificar = req.body.modificar
    const eliminar = req.body.eliminar
    const result = PermisoModel.add(id_rol, id_formulario, habilitar, consultar, agregar, modificar, eliminar)
    if (result.affectedRows > 0) {
        const data = {
            id_permiso: result.insertId,
            id_rol: id_rol,
            id_formulario: id_formulario,
            habilitar: habilitar,
            consultar: consultar,
            agregar: agregar,
            modificar: modificar,
            eliminar: eliminar
        }
        datos = { status: 200, data: data };
    }
    res.send(datos)
}

exports.update = async (req, res, next) => {
    let datos = { status: 404, data: [] }
    const id_rol = req.body.id_rol
    const id_formulario = req.body.id_formulario
    const habilitar = req.body.habilitar
    const consultar = req.body.consultar
    const agregar = req.body.agregar
    const modificar = req.body.modificar
    const eliminar = req.body.eliminar
    const id_permiso = req.params.id
    const result = PermisoModel.update(id_rol, id_formulario, habilitar, consultar, agregar, modificar, eliminar, id_permiso)
    if (result.affectedRows > 0) {
        const data = {
            id_rol: id_rol,
            id_formulario: id_formulario,
            habilitar: habilitar,
            consultar: consultar,
            agregar: agregar,
            modificar: modificar,
            eliminar: eliminar
        }
        datos = { status: 200, data: data };
    }
    res.send(datos)
}
