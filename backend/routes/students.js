const router = require('koa-router')()
const knex = require('../utils/knex')

router.prefix('/students')

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
module.exports = router