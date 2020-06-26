const mysql = require('mysql');

const connection = mysql.createConnection({
  host:'mysql669.umbler.com',
  port:41890,
  user:'admin_smartgym',
  password:'testesenha',
  database : 'ws_smartgym'
  });

const query = (sql, callBack) => {
  return connection.query(sql, callBack);
  };

module.exports = {
    connection,
    query,
};