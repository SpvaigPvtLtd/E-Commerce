var express = require('express');
var router = express.Router();
var pool = require('./pool')
var table = 'users';


//var todayDate = newdate.toLocaleDateString()




router.post('/signup',(req,res)=>{
    let body = req.body
    body['todayDate'] = todayDate
    pool.query(`select * from ${table} where number  = '${req.body.number}'`,(err,result)=>{
        if(err) {
            res.json({
                status:500,
                type : 'error',
                description:err
            })
        }
        else if(result[0]) {
          res.json({
              status : 100,
              type:'failed',
              description : 'already registered'
          })
        }
        else{
         pool.query(`insert into ${table} set ?`,body,(err,result)=>{
             if(err) {
                res.json({
                    status:500,
                    type : 'error',
                    description:err
                })
             }
             else {
                res.json({
                    status:200,
                    type : 'success',
                    description:'successfully registered'
                })
             }
         })
        }
    })
})



router.post('/login',(req,res)=>{
    pool.query(`select * from ${users} where number = '${req.body.number}'`,(err,result)=>{
        if(err) {
            res.json({
                status:500,
                type : 'error',
                description:err
            })
        }
        else if(result[0]){
            res.json({
                status:200,
                type : 'success',
                description:'send otp'
            })

        }
        else{
            res.json({
                status:100,
                type : 'error',
                description:'user not registered'
            })
        }
    })
})




router.post('/show',(req,res)=>{
    pool.query(`select * from ${table} order by id desc`,(err,result)=>{
        if(err) throw err;
        else res.json(result)
    })
})









module.exports = router