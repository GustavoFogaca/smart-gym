const {query} = require('../database/connectionMysql');
const Admin = require("../models/admin");
let admin = new Admin;

module.exports = {
    index(req, res){
        let filter = ''
        if(req.params.idUsuario) filter = ' WHERE idUsuario=' + parseInt(req.params.idUsuario) + " AND admin = 1";
        query("SELECT * FROM usuario" + filter, function (error, result, field) {
            if (error) {
                res.json(error);
            } else {
                res.json(result);
            }
        });
    }
    }
