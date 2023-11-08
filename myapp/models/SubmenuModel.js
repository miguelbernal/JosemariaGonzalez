const pool = require('../databases/db')

module.exports = class SubmenuModel {
    
    // Get Todos los Submenus
    static getPage = async (pag, buscar) => {
        const limit = 10
        const offset = (pag - 1) * limit
        const sql = `SELECT id, nombre
                            FROM submenus 
                            WHERE nombre LIKE ?
                            ORDER BY id DESC
                            LIMIT ? OFFSET ?`
        buscar = `%${buscar}%`
        return await pool.query(sql, [buscar, limit, offset])
    };

    // Get Un Submenu
    static getOne = async (id_submenu) => {
        const sql = `SELECT id, nombre
                            FROM submenus
                            WHERE id = ?`
        return await pool.query(sql, [id_submenu])
    };

    // Agregar
    static add = async (nombre) => {
        const sql = `INSERT INTO submenus(nombre) VALUES(?)`
        return await pool.query(sql, [nombre])
    };

    // Modificar
    static update = async (nombre, id_submenu) => {
        const sql = `UPDATE submenus SET nombre=? WHERE id=?`
        return await pool.query(sql, [nombre, id_submenu])
    };

    // Eliminar
    static delete = async (id_submenu) => {
        const sql = `DELETE FROM submenus WHERE id=?`
        return await pool.query(sql, [id_submenu])
    };

}