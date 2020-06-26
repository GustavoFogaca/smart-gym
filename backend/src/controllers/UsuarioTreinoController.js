const {query} = require('../database/connectionMysql');
const Treino = require("../models/treino");

module.exports = {

    index(req, res){
        let filter = '';
        if(req.headers.authorization) filter = ' WHERE a.idUsuarioFK=' + parseInt(req.headers.authorization);
        query("SELECT a.idTreinoFK, b.nomeTreino, b.duracaoTreino, b.valorEnergiaGerada FROM usuarioTreino AS a INNER JOIN treino AS b ON a.idTreinoFK = b.idTreino" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },

    economiaAdmin(req, res){
        query("SELECT valorEnergiaGerada, SUM(valorEnergiaGerada) FROM usuarioTreino AS a RIGHT JOIN treino AS b ON a.idTreinoFK = b.idTreino", function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },

    economiaUser(req, res){
        console.log("called");
        let filter = '';
        
        
        if(req.headers.authorization) filter = ' WHERE a.idUsuarioFK=' + parseInt(req.headers.authorization);
        console.log(filter);
        query("SELECT valorEnergiaGerada, SUM(valorEnergiaGerada) FROM usuarioTreino AS a INNER JOIN treino AS b ON a.idTreinoFK = b.idTreino" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },

    create(req, res){
        
        let idTreinoFK = req.body['idTreinoFK'];
        let idUsuarioFK = req.body['idUsuarioFK'];
        console.log(idTreinoFK);

        query(`INSERT INTO usuarioTreino (idTreinoFK, idUsuarioFK) VALUES 
        ('${idTreinoFK}', '${idUsuarioFK}')`,  
        function (error, result, field) {
            if (error) {
            res.json(error);    
            } else {
            res.json(result);

        }
    });
    }
}