var mysql = require('mysql')
require('dotenv').config()

const pool = mysql.createPool({

  host:'167.71.231.201',
 // host : 'localhost',
   user: 'root',
 password:'123a@8Anmanraspaa123a@*Anmanraspaa',
 // password : '123',
    database: 'e-commerce',
    port:'3306' ,
    multipleStatements: true
  })


module.exports = pool;
