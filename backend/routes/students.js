const router = require('koa-router')()
const knex = require('../utils/knex')

router.prefix('/student')

router.get('/getAll',async(ctx,next)=>{
    let back ={
        message:'fail',
        data:[]
    }
    await knex('student')
    .join('room','student.room_id','=','room.id')
    .select('student.id','student.name as name','gender','student.dorm_id','room.name as room').then(e=>{
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
  let req = ctx.request.body // req: name,gender,dorm_id,room_id
  let back = 'fail'
  await knex('student').insert({
    name:req.name,
    gender:req.gender,
    dorm_id:req.dorm_id,
    room_id:req.room_id
  }).then(e=>{
    back = 'success'
  })
  ctx.body = back
})

router.get('/getByRoomId/:id',async(ctx,next)=>{
  let id = ctx.params.id
  let back = {
    message:'fail',
    data:[]
  }
  await knex('student').select('id','name','gender').where('room_id',id).then(e=>{
    if(e.length === 0) back.message = 'empty'
    else{
      console.log(e)
      back.message = 'success'
      back.data = e
    }
  })
  ctx.body = back
})


router.post('/changeStatus',async(ctx,next)=>{
  let req = ctx.request.body
  let back = 'fail'
  let currentStatus = 0
  let newStatus = 0
  await knex('student').where('id',req.id).select('status').then(e=>{
    currentStatus = e[0].status
  })
  currentStatus === 0?newStatus = 1:newStatus=0
  await knex('student').where('id',req.id).update({
    status:newStatus
  }).then(e=>{
    back = 'success'
  })
  ctx.body = back
})

router.post('/delete',async(ctx,next)=>{
  let req = ctx.request.body // req: id
  let back = 'fail'
  await knex('student').where('id',req.id).del().then(e=>{back = 'success'})
  ctx.body = back
})
module.exports = router
