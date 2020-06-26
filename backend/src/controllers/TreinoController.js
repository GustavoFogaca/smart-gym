const {query} = require('../database/connectionMysql');
const Treino = require("../models/treino");
let treino = new Treino;

module.exports = {
    index(req, res){
        let filter = '';
        if(req.params.idTreino) filter = ' WHERE a.idTreino=' + parseInt(req.params.idTreino);
        query("SELECT a.idTreino, a.nomeTreino, a.duracaoTreino, a.valorEnergiaGerada, c.idAparelho, c.nomeAparelho, c.modelo FROM treino AS a INNER JOIN treinoAparelho AS b ON a.idTreino = b.idTreinoFK INNER JOIN aparelho AS c ON b.idAparelhoFK = c.idAparelho" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    },

    

   create(req, res){  
        treino = req.body;
        aparelhos = req.body.aparelhoAgrup;
        console.log(req.body);
        console.log(aparelhos);

        query(`INSERT INTO treino (nomeTreino, duracaoTreino, valorEnergiaGerada) VALUES 
        ('${treino.nomeTreino}', '${treino.duracaoTreino}','${treino.valorEnergiaGerada}')`,
        function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
                treino.idTreino = result['insertId'];
                
                for (let index = 0; index < aparelhos.length; index++) {
                    element = aparelhos[index];
                    idAparelhoFK = element;
                   query(`INSERT INTO treinoAparelho (idTreinoFK, idAparelhoFK) VALUES
                   ('${treino.idTreino}', '${idAparelhoFK}')`,
                   function (error, results, field) {
                       if (error) {
                           console.log("revisar")
                       } else {
                           console.log("ok")
                    }
                  });
               }
            }
        });
    }
}