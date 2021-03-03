var express = require('express');
var router = express.Router();
var pool = require('./pool')
var table = 'booking';


//var todayDate = newdate.toLocaleDateString()



router.post('/',(req,res)=>{
    let body = req.body
    pool.query(`select id from ${table} where number = '${req.body.number}'`,(err,result)=>{
        if(err) {
            res.json({
                status:500,
                type : 'error',
                description:err
            })
        }
        else if(result[0]){
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
                        type:'success',
                        description:'booking success'
                    })
                }
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
                 pool.query(`select refferal_code from users where number = '${req.body.number}'`,(err,result)=>{
                     if(err){
                        res.json({
                            status:500,
                            type : 'error',
                            description:err
                        })
                     }
                     else {
                         pool.query(`select number from users where unique_code = '${result[0].refferal_code}'`,(err,result)=>{
                             if(err) {
                                res.json({
                                    status:500,
                                    type : 'error',
                                    description:err
                                })
                             }
                             else {
                                 pool.query(`update users set wallet = wallet+100 where number = '${result[0].number}'`,(err,result)=>{
                                     if(err) throw err;
                                     else {
                                         res.json({
                                             status : 200,
                                             type : 'success',
                                             description:'booking success'
                                         })
                                     }
                                 })
                             }
                         })
                     }
                 })   
                  
                }
            })

        }
    })
})



router.post('/user',(req,res)=>{
   pool.query(`select * from ${table} where number = '${req.body.number}' and status = 'pending'`,(err,result)=>{
       if(err) throw err;
       else res.json(result)
   })
})


router.post('/vendors',(req,res)=>{
    pool.query(`select * from ${table} where partner_number = '${req.body.number}' and status = 'pending'`,(err,result)=>{
        if(err) throw err;
        else res.json(result)
    })
 })


 router.post('/user-history',(req,res)=>{
     pool.query(`select * from ${table} where number = '${req.body.number}' and status = 'delievered'`,(err,result)=>{
         if(err) throw err;
         else {
            res.json(result)
         }
     })
 })



 router.post('/vendor-history',(req,res)=>{
    pool.query(`select * from ${table} where partner_number = '${req.body.number}' and status = 'delievered'`,(err,result)=>{
        if(err) throw err;
        else {
           res.json(result)
        }
    })
})




module.exports = router;