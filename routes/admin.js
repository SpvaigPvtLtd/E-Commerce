var express = require('express');

var router = express.Router();
var pool = require('./pool')
var table = 'admin';


router.get('/',(req,res)=>{
    res.render('admin_login',{msg : ''})
})


router.get('/logout',(req,res)=>{
    req.session.adminid = null;
    res.redirect('/admin')
})

router.post('/login',(req,res)=>{
    pool.query(`select * from ${table} where email = '${req.body.email}' and password = '${req.body.password}'`,(err,result)=>{
        if(err) throw err;
        else if(result[0]){
          req.session.adminid = result[0].id
          res.redirect('/category')
        }
        else {
            res.render('admin_login',{msg : 'Invalid Username & Password'})
        }
    })
})

module.exports = router;
