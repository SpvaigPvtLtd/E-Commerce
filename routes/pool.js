var mysql = require('mysql')
require('dotenv').config()

const pool = mysql.createPool({

  
  host : 'localhost',
   user: 'root',
 
  password : '123',
    database: 'e-commerce',
    port:'3306' ,
    multipleStatements: true
  })


module.exports = pool;
