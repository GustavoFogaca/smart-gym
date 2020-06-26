const {query} = require('../database/connectionMysql');
const Sessao = require("../models/sessao");

let sessao = new Sessao;

module.exports = {    
    index(req, res){
        let filter = ''
        if(req.params.idUsuario) filter = ' WHERE idUsuario=' + parseInt(req.params.idUsuario);
        query("SELECT * FROM usuario" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },

    create(req, res){
        sessao = req.body;
        filter = " WHERE email='";
        console.log(filter);
        console.log(sessao);
        query("SELECT * FROM usuario" + filter + sessao.email + "'" + "AND senha='" + sessao.senha + "'", function (error, result, field) {
            if (result.length < 1) {
                    console.log(result);
                    res.json(error);
                    
            } else {
                console.log(result);
                res.json(result);
            }
        });
    }
}