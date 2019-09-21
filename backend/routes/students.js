const router = require('koa-router')()
const knex = require('../utils/knex')

router.prefix('/students')

router.get('/getAll',async(ctx,next)=>{
    let back ={
        message:'fail',
        data:[]
    }
    await knex('students')
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
  await knex('students').insert({
    name:req.name,
    gender:req.gender,
    dorm_id:req.dorm_id,
    room_id:req.room_id
  }).then(e=>{
    back = 'success'
  })
  ctx.body = back
})
module.exports = router
