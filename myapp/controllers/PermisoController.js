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
