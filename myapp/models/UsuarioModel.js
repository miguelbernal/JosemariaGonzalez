const pool = require('../databases/db')

module.exports = class UsuarioModel {
    
    // Login
    static login = async(usuario, clave) => {
        const sql = `SELECT id, nombre, usuario 
                         FROM usuarios
                         WHERE usuario = ? AND clave = ?`
        return await pool.query(sql, [usuario, clave])
    }
    
}