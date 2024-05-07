const listModel = require("../models/listModel");

class listControl {
async getList(req, res) {
        try {
            const modelo = new listModel(); // Crear una instancia del modelo
            //verifica que el usuario este authenticado
            const user =  req.session.username
            const userId =  req.session.userId
            if (user == undefined || userId == undefined) {
                res.status(401).send({code:401,errorName:"No autorizado",msg:"Debe Inciar Sesion"})
                return 401
            }
            //carga las notas
            const data = await modelo.getList([req.params.notaId]);
            return res.render("list",{rows:data.rows})
        } catch (error) {
            console.log(error); // Imprime el error para diagnosticar el problema
            return res.status(500).send(`<h1 style="color: red; text-align: center;">${error}</h1>`);
        }
    }


    async deleteList(req, res) {
        try {
            const modelo = new noteModel(); // Crear una instancia del modelo
            //verifica que el usuario este authenticado
            //borra la nota las notas
            const data = await modelo.deleteList([req.params.notaId]);
            return  this.loadMainPages(req,res)
        } catch (error) {
            console.log(error); // Imprime el error para diagnosticar el problema
            return res.status(500).send(`<h1 style="color: red; text-align: center;">${error}</h1>`);
        }
    }

    async updateNote(req, res) {
        try {
            const modelo = new noteModel(); // Crear una instancia del modelo
            //actualiza la nota las notas
            const titulo = req.body.titulo;
            const contenido = req.body.contenido; 
            const notaID = req.params.notaId;
            const tags = req.body.tags || null;

        await modelo.updateNot([titulo,contenido,tags,notaID]);
            return  this.loadMainPages(req,res)
        } catch (error) {
            console.log(error); // Imprime el error para diagnosticar el problema
            return res.status(500).send(`<h1 style="color: red; text-align: center;">${error}</h1>`);
        }
    }

    async creteList(req, res) {
        try {
            const modelo = new noteModel(); // Crear una instancia del modelo
            //actualiza la nota las notas
            const titulo = req.body.titulo;
            const tags = req.body.tags || null;
            const userId =  req.session.userId
        await modelo.createNote([titulo,userId,tags]);
            return  this.loadMainPages(req,res)
        } catch (error) {
            console.log(error); // Imprime el error para diagnosticar el problema
            return res.status(500).send(`<h1 style="color: red; text-align: center;">${error}</h1>`);
        }
    }

    async buscarxNombre(req, res) {
        try {
            const modelo = new noteModel(); // Crear una instancia del modelo
            //verifica que el usuario este authenticado
            const userId =  req.session.userId
            if (userId == undefined) {
                res.status(401).send({code:401,errorName:"No autorizado",msg:"Debe Inciar Sesion"})
                return 401
            }
            //carga las notas
            const titulo = req.body.parametro
            const data = await modelo.buscarNombre([userId,titulo,titulo]);
                return res.render("main",{rows:data.rows})
        } catch (error) {
            console.log(error); // Imprime el error para diagnosticar el problema
            return res.status(500).send(`<h1 style="color: red; text-align: center;">${error}</h1>`);
        }
    }

    async loadMainPages(req,res){
        res.redirect("/mainPages")
    }

}

module.exports = listControl;