const pool = require('../databases/db')

module.exports = class PermisoModel {

    // Buscar por rol
    static getRol = async (id_rol) => {
        const sql = `SELECT f.id id_formulario, f.nombre nombre_formulario, f.url, 
                            f.id_modulo, m.nombre nombre_modulo,
                            f.id_submenu, s.nombre nombre_submenu,
                            p.agregar, p.modificar, p.eliminar 
                            FROM formularios f
                            LEFT JOIN permisos p ON f.id = p.id_formulario
                            LEFT JOIN submenus s ON f.id_submenu = s.id
                            LEFT JOIN modulos m ON f.id_modulo = m.id
                            WHERE p.id_rol = ?
                            ORDER BY f.id_modulo, f.id_submenu, f.id`
        return await pool.query(sql, [id_rol])
    };

    // Agregar
    static add = async (id_rol, id_formulario, habilitar, consultar, agregar, modificar, eliminar) => {
        const sql = `INSERT INTO permisos(id_rol, id_formulario, habilitar, consultar, agregar, modificar, eliminar) 
                                   VALUES(?,?,?,?,?,?,?)`
        return await pool.query(sql, [id_rol, id_formulario, habilitar, consultar, agregar, modificar, eliminar])
    };

    // Modificar
    static update = async (id_rol, id_formulario, habilitar, consultar, agregar, modificar, eliminar, id_permiso) => {
        const sql = `UPDATE permisos SET id_rol = ?, id_formulario = ?, habilitar = ?, consultar = ?, agregar = ?, modificar = ?, eliminar = ? WHERE id = ?`
        return await pool.query(sql, [id_rol, id_formulario, habilitar, consultar, agregar, modificar, eliminar, id_permiso])
    };

}