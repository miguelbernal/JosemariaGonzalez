const pool = require('../databases/db')

module.exports = class FormularioModel {
    
    // Get Todos los Formularios
    static getPage = async (pag, buscar) => {
        const limit = 10
        const offset = (pag - 1) * limit
        const sql = `SELECT f.id, f.nombre, f.url, f.id_modulo, m.nombre nombre_modulo, f.id_submenu, s.nombre nombre_submenu
                            FROM formularios f
                            LEFT JOIN modulos m ON f.id_modulo = m.id
                            LEFT JOIN submenus s ON f.id_submenu = s.id
                            WHERE f.nombre LIKE ?
                            ORDER BY f.id DESC
                            LIMIT ? OFFSET ?`
        buscar = `%${buscar}%`
        return await pool.query(sql, [buscar, limit, offset])
    };

    // Get Un Rol
    static getOne = async (id_formulario) => {
        const sql = `SELECT id, nombre
                            FROM formularios
                            WHERE id = ?`
        return await pool.query(sql, [id_formulario])
    };

    // Get Permisos
    static getPermisos = async (id_rol) => {
        const sql = `SELECT f.id id_formulario, f.nombre nombre_formulario,
                            f.id_modulo, m.nombre nombre_modulo,
                            f.id_submenu, s.nombre nombre_submenu,
                            p.id id_permiso, p.habilitar, p.consultar, p.agregar, p.modificar, p.eliminar
                            FROM formularios f
                            LEFT JOIN modulos m ON f.id_modulo = m.id
                            LEFT JOIN submenus s ON f.id_submenu = s.id
                            LEFT JOIN permisos p ON f.id = p.id_formulario AND p.id_rol = ?
                            ORDER BY f.id_modulo, f.id_submenu, f.id`
        return await pool.query(sql, [id_rol])
    };

    // Agregar
    static add = async (nombre, url, id_modulo, id_submenu) => {
        const sql = `INSERT INTO formularios(nombre, url, id_modulo, id_submenu) VALUES(?,?,?,?)`
        return await pool.query(sql, [nombre, url, id_modulo, id_submenu])
    };

    // Modificar
    static update = async (nombre, url, id_modulo, id_submenu, id_formulario) => {
        const sql = `UPDATE formularios SET nombre=?, url=?, id_modulo=?, id_submenu=? WHERE id=?`
        return await pool.query(sql, [nombre, url, id_modulo, id_submenu, id_formulario])
    };

    // Eliminar
    static delete = async (id_formulario) => {
        const sql = `DELETE FROM formularios WHERE id=?`
        return await pool.query(sql, [id_formulario])
    };

}