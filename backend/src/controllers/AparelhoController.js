const {query} = require('../database/connectionMysql');
const Aparelho = require("../models/aparelho");
let aparelho = new Aparelho;

module.exports = {
    index(req, res){
        let filter = ''
        if(req.params.idAparelho) filter = ' WHERE idAparelho=' + parseInt(req.params.idAparelho);
        query("SELECT * FROM aparelho" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },

    create(req, res){
        aparelho = req.body;
        aparelhoExiste = true;
        filter = " WHERE nomeAparelho= '" + aparelho.nomeAparelho;        
        query("SELECT * FROM aparelho" + filter + "'", function (error, result, field) {
        if (result.length < 1){
            query(`INSERT INTO aparelho
            (nomeAparelho, modelo, consumoEnergia) 
            VALUES 
            ('${aparelho.nomeAparelho}', '${aparelho.modelo}', '${aparelho.consumoEnergia}')`,
            function (error, result, field) {
                if (error) {
                    res.json(error);
                } else {
                    res.json(result);
                }
            })
        }else{
            aparelhoExiste = true;
            res.json(aparelhoExiste);
        }
        });
    }
}
