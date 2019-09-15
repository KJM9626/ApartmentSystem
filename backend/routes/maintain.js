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

module.exports = router
