const listModel = require("../models/listModel");

class listControl {
    async getList(req, res) {
        try {
            const modelo = new listModel(); // Crear una instancia del modelo
            //verifica que el usuario esté autenticado
            const user = req.session.username;
            const userId = req.session.userId;
            if (user === undefined || userId === undefined) {
                res.status(401).send({ code: 401, errorName: "No autorizado", msg: "Debe iniciar sesión" });
                return 401;
            }
            //carga las notas
            const data = await modelo.getList([req.params.notaId]);
          //  console.log(data.rows)
            return res.render("list", { rows: data.rows });
        } catch (error) {
            console.log(error); // Imprime el error para diagnosticar el problema
            return res.status(500).send(`<h1 style="color: red; text-align: center;">${error}</h1>`);
        }
    }

    async deleteList(req, res) {
        try {
            const modelo = new listModel(); // Crear una instancia del modelo
            //verifica que el usuario esté autenticado
            //borra la lista
            const data = await modelo.deleteList([req.params.notaId]);
            return this.loadMainPages(req, res);
        } catch (error) {
            console.log(error); // Imprime el error para diagnosticar el problema
            return res.status(500).send(`<h1 style="color: red; text-align: center;">${error}</h1>`);
        }
    }

    async creteList(req, res) {
        try {
            const modelo = new listModel(); // Crear una instancia del modelo
            //crea la lista
            const titulo = req.body.tituloLista;
            const tags = req.body.tagsLista || null;
            const userId = req.session.userId;
            await modelo.createList([titulo, userId, tags]);
            return this.loadMainPages(req, res);
        } catch (error) {
            console.log(error); // Imprime el error para diagnosticar el problema
            return res.status(500).send(`<h1 style="color: red; text-align: center;">${error}</h1>`);
        }
    }

    async updateList(req, res) {
        try {
            const modelo = new listModel(); // Crear una instancia del modelo
            const data = req.body; // Obtener el objeto JSON del cuerpo de la solicitud
            let titulo = data.titulo;
            await modelo.updateList([titulo, data.contenido,data.id_lista]);
            res.send("ok")
        } catch (error) {
            console.log(error); // Imprime el error para diagnosticar el problema
            return res.status(500).send(`<h1 style="color: red; text-align: center;">${error}</h1>`);
        }
    }

    async loadMainPages(req, res) {
        res.redirect("/mainPages");
    }
}

module.exports = listControl;
