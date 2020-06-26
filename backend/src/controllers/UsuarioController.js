const {query} = require('../database/connectionMysql');
const Usuario = require("../models/usuario");
let usuario = new Usuario;

module.exports = {
    index(req, res){
        let filter = ''
            if(req.headers.authorization) filter = ' WHERE idUsuario=' + parseInt(req.headers.authorization);
        query("SELECT * FROM usuario" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });     
    },

    indexFull(req, res){
        let filter = ''
        query("SELECT * FROM usuario" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });     
    },

    create(req, res){
        console.log("create called");
        usuario = req.body;
        console.log(usuario)
        usuarioExiste = true;
        usuario.admin = 0;
 
        filter = " WHERE email='" + usuario.email + "'";        
        console.log(filter);
        query("SELECT * FROM usuario" + filter, function (error, result, field) {
            console.log(result);
            if (result.length < 1){
                query(`INSERT INTO usuario 
                (email, senha, cpf, altura, peso, telefone, admin) 
                VALUES 
                ('${usuario.email}', 
                '${usuario.senha}','${usuario.cpf}',
                '${usuario.altura}','${usuario.peso}',
                '${usuario.telefone}','${usuario.admin}')`,    
                   function (error, result, field) {
                    if (error) {
                        console.log("ruim");
                        console.log(result);
                        usuarioExiste = true;
                        res.json(usuarioExiste);
                    } else {
                        console.log("boa");
                        usuarioExiste = false;
                        console.log(result);
                        res.json(usuarioExiste);
                    }
                })
            } else {
                usuarioExiste = true;
                res.json(usuarioExiste);
            }
        });
    }
}