var express = require('express');
var router = express.Router();
var pool = require('./pool')
var table = 'cart';


//var todayDate = newdate.toLocaleDateString()



router.post('/',(req,res)=>{
    let body = req.body
    console.log(req.body)
    pool.query(`select * from service where id = "${req.body.booking_id}" `,(err,result)=>{
      if(err) {
        res.json({
            status:500,
            type : 'error',
            description:err
        })
      }
      else {
        body['categoryid'] = result[0].categoryid
        body['subcategoryid'] = result[0].subcategoryid
        body['price'] = result[0].our_price
        body['oneprice'] =  result[0].our_price
           body['quantity'] = '1'
        body['price'] = req.body.price
        body['todayDate'] = todayDate
        var qua = '1'
  pool.query(`select * from ${table} where usernumber = '${req.body.usernumber}'`,(err,result)=>{
  if(err){
    res.json({
        status:500,
        type : 'error',
        description:err
    })
  }
  else if(result[0]) {
    if(req.body.partnerid==result[0].partnerid){
      if(req.body.booking_id ==result[0].booking_id){
  pool.query(`update ${table} set quantity = quantity+${qua} , price = price+${req.body.price} where booking_id = '${req.body.booking_id}' and usernumber = '${req.body.usernumber}'`,(err,result)=>{
  if(err) {
    res.json({
        status:500,
        type : 'error',
        description:err
    })
  }
  else{
    res.json({
        status:200,
        type : 'success',
        description : 'updated sucessfully'
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
        else{
          res.json({
            status:200,
            type : 'success',
            description : 'updated sucessfully'
          })
        }
      })
    }
    }
    else{
      res.json({
        msg : 'Can not book two different partner services simultaneously. Replace Cart ?'
      })
    }
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
            description : 'updated sucessfully'
        })
      }
    })
  }
  
  })
  }
  })
 
  
  })



  
  router.post('/cart/replace',(req,res)=>{
    let body = req.body
    console.log(req.body)
    body['todayDate'] = todayDate
    pool.query(`select * from services where id = "${req.body.booking_id}" `,(err,result)=>{
      if(err) {
        res.json({
            status:500,
            type : 'error',
            description:err
        })
      }
      else {
        body['categoryid'] = result[0].categoryid
        body['subcategoryid'] = result[0].subcategoryid
        body['price'] = result[0].our_price
        body['oneprice'] =  result[0].our_price
           body['quantity'] = '1'
        body['price'] = req.body.price
  
    pool.query(`delete from ${table} where usernumber = '${req.body.usernumber}'`,(err,result)=>{
      if(err) {
        res.json({
            status:500,
            type : 'error',
            description:err
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
                description : 'updated sucessfully'
            })
          }
        })
      }
     
    })
  }
  })
  
  })
  
  
  
  router.post('/cart/all',(req,res)=>{
  pool.query(`select usernumber from ${table} where usernumber = '${req.body.usernumber}'`,(err,result)=>{
      if(err) throw err;
      else res.json(result)
    })
  
  
  })


  
  
  router.post('/mycart',(req,res)=>{
    
      var query = `select c.*,(select s.name from services s where s.id = c.booking_id) as servicename
      from ${table} c where c.usernumber = '${req.body.usernumber}';`
      var query1 = `select count(id) as counter from ${table} where usernumber = '${req.body.usernumber}';`
      var query2 = `select sum(price) as total_ammount from ${table}  where usernumber = '${req.body.usernumber}'; `
         pool.query(query+query1+query2,(err,result)=>{
        if(err) {
            res.json({
                status:500,
                type : 'error',
                description:err
            })
        }
        else if(result[0][0]) {
               req.body.mobilecounter = result[1][0].counter
               console.log("MobileCounter",req.body.mobilecounter)
               res.json({
                status:200,
                type : 'success',
                description:result
            })
          
        }
        else{
            res.json({
                status:100,
                type : 'failed',
                description:'cart empty'
            })
        }
      })
    
  })
  
  
  router.post('/cartupdate',(req,res)=>{
    
    pool.query(`select id,price,oneprice,quantity from ${table} where id = "${req.body.id}"`,(err,result)=>{
      if(err) {
        res.json({
            status:500,
            type : 'error',
            description:err
        })
      }
      else{
        console.log(result[0])
        pool.query(`update ${table} set price = price + oneprice , quantity = quantity+1  where id = "${req.body.id}"`,(err,result)=>{
                  if(err){
                    res.json({
                        status:500,
                        type : 'error',
                        description:err
                    })
                  }
                  else{
                    res.json({
                        status:200,
                        type : 'success',
                        description:'updated successfully'
                    })
                  }
            
        })
      }
    })

  })
  
  router.post('/cartdelete',(req,res)=>{
   
    pool.query(`select id,price,quantity from ${table} where id = "${req.body.id}"`,(err,result)=>{
      if(err) {
        res.json({
            status:500,
            type : 'error',
            description:err
        })
      }
      else if(result[0].quantity > 1 ){
        console.log(result[0])
        pool.query(`update ${table} set price = price - (price/quantity) , quantity = quantity-1  where id = "${req.body.id}"`,(err,result)=>{
            if(err){
                res.json({
                    status:500,
                    type : 'error',
                    description:err
                })
              }
              else{
                res.json({
                    status:200,
                    type : 'success',
                    description:'deleted successfully'
                })
              }
        
           
        })
      }
  
      else{
        pool.query(`delete from ${table} where id = "${req.body.id}"`,(err,result)=>{
            if(err){
                res.json({
                    status:500,
                    type : 'error',
                    description:err
                })
              }
              else{
                res.json({
                    status:200,
                    type : 'success',
                    description:'deleted successfully'
                })
              }
      
        })
      }
  
    })

  })
  
  



  module.exports = router;
       

