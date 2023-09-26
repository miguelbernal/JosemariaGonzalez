const pool = require('../databases/db')

module.exports = class ModuloModel {
    
    // Get Todos los Modulos
    static getPage = async (pag, buscar) => {
        const limit = 10
        const offset = (pag - 1) * limit
        const sql = `SELECT id, nombre
                            FROM modulos 
                            WHERE nombre LIKE ?
                            ORDER BY id DESC
                            LIMIT ? OFFSET ?`
        buscar = `%${buscar}%`
        return await pool.query(sql, [buscar, limit, offset])
    };

    // Get Un Modulo
    static getOne = async (id_modulo) => {
        const sql = `SELECT id, nombre
                            FROM modulos
                            WHERE id = ?`
        return await pool.query(sql, [id_modulo])
    };

    // Agregar
    static add = async (nombre) => {
        const sql = `INSERT INTO modulos(nombre) VALUES(?)`
        return await pool.query(sql, [nombre])
    };

    // Modificar
    static update = async (nombre, id_modulo) => {
        const sql = `UPDATE modulos SET nombre=? WHERE id=?`
        return await pool.query(sql, [nombre, id_modulo])
    };

    // Eliminar
    static delete = async (id_modulo) => {
        const sql = `DELETE FROM modulos WHERE id=?`
        return await pool.query(sql, [id_modulo])
    };

}