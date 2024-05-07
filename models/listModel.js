const ConexionClass = require("./conexion");
class listModel {
    async getAllList(params) {
    try {
        const conexion = new ConexionClass();
        await conexion.conectar();
        const data = await conexion.queryParams("SELECT	 *  FROM tbl_list WHERE tbl_list.id_user = ?",params);
        await conexion.desconectar(); // Cerrar la conexión después de usarla
        return  data;
    } catch (error) {
        console.error('Error al Obtener Notas:', error);
        throw error;
    }
}


    async getList(params) {
        try {
            const conexion = new ConexionClass();
            await conexion.conectar();
            const data = await conexion.queryParams("SELECT * FROM titulo_list WHERE tbl_list.id_list = ?",params);
            await conexion.desconectar(); // Cerrar la conexión después de usarla
            return  data;
        } catch (error) {
            console.error('Error al Obtener Notas:', error);
            throw error;
        }
    }

        async deleteList(params) {
            try {
                const conexion = new ConexionClass();
                await conexion.conectar();
                await conexion.queryModifay("DELETE FROM tbl_list WHERE id_list = ?",params);
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

            async createList(params) {
                try {
                    console.log()
                    const conexion = new ConexionClass();
                    await conexion.conectar();
                    await conexion.queryModifay("INSERT INTO tbl_list (titulo_list,id_user,tags) VALUES (?,?,? );", params);
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
                    FROM tbl_list 
                    WHERE tbl_list.id_user = ? 
                    AND (
                        tbl_list.titulo_list LIKE CONCAT('%', ? , '%') 
                        OR (tbl_list.tags IS NOT NULL AND tbl_list.tags.tags LIKE CONCAT('%', ? , '%'))
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

module.exports = listModel;