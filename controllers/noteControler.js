const noteModel = require("../models/noteModel");
const listModel = require("../models/listModel");
class noteControl {
    async loadMainPages(req, res) {
        try {
            const modelo = new noteModel(); // Crear una instancia del modelo
            //verifica que el usuario este authenticado
            const user =  req.session.username
            const userId =  req.session.userId
            if (user == undefined || userId == undefined) {
                res.status(401).send({code:401,errorName:"No autorizado",msg:"Debe Inciar Sesion"})
                return 401
            }
            //carga las notas
            const data = await modelo.getAllNotes([userId]);
            //carga las listas
                const modeloListas = new  listModel()
                const data2 = await modeloListas.getAllList([userId]);
                console.log(data2.rows)
                return res.render("main",{rows:data.rows,listas:data2.rows})
        } catch (error) {
            console.log(error); // Imprime el error para diagnosticar el problema
            return res.status(500).send(`<h1 style="color: red; text-align: center;">${error}</h1>`);
        }
    }

    async getNote(req, res) {
        try {
            const modelo = new noteModel(); // Crear una instancia del modelo
            //verifica que el usuario este authenticado
            const user =  req.session.username
            const userId =  req.session.userId
            if (user == undefined || userId == undefined) {
                res.status(401).send({code:401,errorName:"No autorizado",msg:"Debe Inciar Sesion"})
                return 401
            }
            //carga las notas
            const data = await modelo.getNote([req.params.notaId]);
            return res.render("nota",{rows:data.rows})
        } catch (error) {
            console.log(error); // Imprime el error para diagnosticar el problema
            return res.status(500).send(`<h1 style="color: red; text-align: center;">${error}</h1>`);
        }
    }


    async deleteNote(req, res) {
        try {
            const modelo = new noteModel(); // Crear una instancia del modelo
            //verifica que el usuario este authenticado
            //borra la nota las notas
            const data = await modelo.deleteNote([req.params.notaId]);
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

    async creteNote(req, res) {
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

            //carga las listas 
            const modeloListas = listModel()
            const data2 = await modeloListas.buscarNombre([userId,titulo,titulo]);
                return res.render("main",{rows:data.rows,listas:data2.rows})
        } catch (error) {
            console.log(error); // Imprime el error para diagnosticar el problema
            return res.status(500).send(`<h1 style="color: red; text-align: center;">${error}</h1>`);
        }
    }

}

module.exports = noteControl;