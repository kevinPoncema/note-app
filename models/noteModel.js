const ConexionClass = require("./conexion");
class noteModel {
    async getAllNotes(params) {
    try {
        const conexion = new ConexionClass();
        await conexion.conectar();
        const data = await conexion.queryParams("SELECT	 *  FROM tbl_notas WHERE tbl_notas.id_user = ?",params);
        await conexion.desconectar(); // Cerrar la conexión después de usarla
        return  data;
    } catch (error) {
        console.error('Error al Obtener Notas:', error);
        throw error;
    }
}


    async getNote(params) {
        try {
            const conexion = new ConexionClass();
            await conexion.conectar();
            const data = await conexion.queryParams("SELECT * FROM tbl_notas WHERE tbl_notas.id_nota = ?",params);
            await conexion.desconectar(); // Cerrar la conexión después de usarla
            return  data;
        } catch (error) {
            console.error('Error al Obtener Notas:', error);
            throw error;
        }
    }

        async deleteNote(params) {
            try {
                const conexion = new ConexionClass();
                await conexion.conectar();
                await conexion.queryModifay("DELETE FROM tbl_notas WHERE tbl_notas.id_nota = ?",params);
                await conexion.desconectar(); // Cerrar la conexión después de usarla
                return  0;
            } catch (error) {
                console.error('Error al Obtener Notas:', error);
                throw error;
            }
        }

            async updateNot(params) {
                try {
                    const conexion = new ConexionClass();
                    await conexion.conectar();
                    await conexion.queryModifay("UPDATE tbl_notas SET titulo_nota = ?,cnitenido_nota = ?, tags = ? WHERE id_nota = ?;",params);
                    await conexion.desconectar(); // Cerrar la conexión después de usarla
                    return  0;
                } catch (error) {
                    console.error('Error al Obtener Notas:', error);
                    throw error;
                }
            }

            async createNote(params) {
                try {
                    console.log()
                    const conexion = new ConexionClass();
                    await conexion.conectar();
                    await conexion.queryModifay("INSERT INTO tbl_notas (titulo_nota,id_user,tags) VALUES (?,?,? );", params);
                    await conexion.desconectar(); // Cerrar la conexión después de usarla
                    return 0;
                } catch (error) {
                    console.error('Error al Crear Nota:', error);
                    throw error;
                }
            }

            async buscarNombre(params) {
                try {
                    const conexion = new ConexionClass();
                    await conexion.conectar();
                    const sql = `
                    SELECT * 
                    FROM tbl_notas 
                    WHERE tbl_notas.id_user = ? 
                    AND (
                        tbl_notas.titulo_nota LIKE CONCAT('%', ? , '%') 
                        OR (tbl_notas.tags IS NOT NULL AND tbl_notas.tags LIKE CONCAT('%', ? , '%'))
                    );
                `;                
                    const data = await conexion.queryParams(sql, params);
                    await conexion.desconectar(); // Cerrar la conexión después de usarla
                    return data;
                } catch (error) {
                    console.error('Error al Buscar Notas por Nombre:', error);
                    throw error;
                }
            }       
}

module.exports = noteModel;