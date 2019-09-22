const router = require('koa-router')()
const knex = require('../utils/knex')

router.prefix('/maintain')

router.get('/getAll',async(ctx,next)=>{
  let back = {
    message:'fail',
    data:[]
  }
  await knex('maintain').join('room','maintain.room_id','=','room.id')
  .select('maintain.id','maintain.dorm_id','room.name','type','detail','status').then(e=>{
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
  let req = ctx.request.body // req: dorm_id,room_id,type,detail,status
  let back = 'fail'
  await knex('maintain').insert({
    dorm_id:req.dorm_id,
    room_id:req.room_id,
    type:req.type,
    detail:req.detail,
    status:req.status
  }).then(e=>{
    back = 'success'
  })
  ctx.body = back
})

router.post('/changeStatus',async(ctx,next)=>{
  let req = ctx.request.body
  let back = 'fail'
  let currentStatus = 0
  let newStatus = 0
  await knex('maintain').where('id',req.id).select('status').then(e=>{
    currentStatus = e[0].status
  })
  currentStatus === 0?newStatus = 1:newStatus=0
  await knex('maintain').where('id',req.id).update({
    status:newStatus
  }).then(e=>{
    back = 'success'
  })
  ctx.body = back
})

router.post('/delete',async(ctx,next)=>{
  let req = ctx.request.body // req: id
  let back = 'fail'
  await knex('maintain').where('id',req.id).del().then(e=>{back = 'success'})
  ctx.body = back
})
module.exports = router
