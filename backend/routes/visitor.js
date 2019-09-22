const router = require('koa-router')()
const knex = require('../utils/knex')

router.prefix('/visitor')

router.get('/getAll',async(ctx,next)=>{
    let back ={
        message:'fail',
        data:[]
    }
    await knex('visitor').join('room','visitor.room_id','=','room.id')
    .select(`visitor.id`,`visitor.name`,`gender`,`idno`,`visitor.dorm_id`,`reason`,`status`,'room.name as room_name').then(e=>{
      if(e.length === 0){
        back.message = 'empty'
      }
      else{
        back.message = 'success'
        back.data = e
      }
    })
    ctx.body = back
  })
  
  router.post('/add',async(ctx,next)=>{
    let req = ctx.request.body // req: name,gender,idno,dorm_id,room_id,reason,status
    let back = 'fail'
    await knex('visitor').insert({
      name:req.name,
      gender:req.gender,
      idno:req.idno,
      dorm_id:req.dorm_id,
      room_id:req.room_id,
      reason:req.reason,
      status:req.status
    }).then(e=>{
      back = 'success'
    })
    ctx.body = back
  })
<<<<<<< HEAD
  
=======

>>>>>>> 79af7fc8a5625eb8936f4013ecca92d380a79f15
  router.post('/changeStatus',async(ctx,next)=>{
    let req = ctx.request.body
    let back = 'fail'
    let currentStatus = 0
    let newStatus = 0
    await knex('visitor').where('id',req.id).select('status').then(e=>{
      currentStatus = e[0].status
    })
    currentStatus === 0?newStatus = 1:newStatus=0
    await knex('visitor').where('id',req.id).update({
      status:newStatus
    }).then(e=>{
      back = 'success'
    })
    ctx.body = back
  })

  router.post('/delete',async(ctx,next)=>{
    let req = ctx.request.body // req: id
    let back = 'fail'
    await knex('visitor').where('id',req.id).del().then(e=>{back = 'success'})
    ctx.body = back
  })
  module.exports = router