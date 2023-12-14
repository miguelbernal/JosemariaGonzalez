const pool = require('../databases/db')

module.exports = class UsuarioModel {
    
    // Login
    static login = async(usuario, clave) => {
        const sql = `SELECT id, nombre, usuario 
                         FROM usuarios
                         WHERE usuario = ? AND clave = ?`
        return await pool.query(sql, [usuario, clave])
    }

    // Get Todos los Usuarios
    static getPage = async (pag, buscar) => {
        const limit = 10
        const offset = (pag - 1) * limit
        const sql = `SELECT id, nombre, usuario, clave, id_rol
                            FROM usuarios
                            WHERE nombre LIKE ?
                            ORDER BY id DESC
                            LIMIT ? OFFSET ?`
        buscar = `%${buscar}%`
        return await pool.query(sql, [buscar, limit, offset])
    };

    // Get Usuario
    static getOne = async (id_usuario) => {
        const sql = `SELECT id, nombre, usuario, clave, id_rol
                            FROM usuarios
                            WHERE id = ?`
        return await pool.query(sql, [id_usuario])
    };

    // Agregar
    static add = async (nombre, usuario, clave, id_rol) => {
        const sql = `INSERT INTO modulos(nombre, usuario, clave, id_rol) VALUES(?,?,?,?)`
        return await pool.query(sql, [nombre,usuario,clave,id_rol])
    };

    // Modificar
    static update = async (nombre,usuario,clave,id_rol,id_usuario) => {
        const sql = `UPDATE usuarios SET nombre=?, 
                                         usuario=?, 
                                         clave=?, 
                                         id_rol=? 
                     WHERE id=?`
        return await pool.query(sql, [nombre,usuario,clave,id_rol,id_usuario])
    };

    // Eliminar
    static delete = async (id_usuario) => {
        const sql = `DELETE FROM usuarios WHERE id=?`
        return await pool.query(sql, [id_usuario])
    };
    
}