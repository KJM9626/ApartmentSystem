const router = require('koa-router')()
const knex = require('../utils/knex')

router.prefix('/visitor')

router.get('/getAll',async(ctx,next)=>{
    let back ={
        message:'fail',
        data:[]
    }
    await knex('visitor').join('room','visitor.room_id','=','room.id')
    .select(`visitor.id`,`visitor.name`,`gender`,`idno`,`visitor.dorm_id`,`reason`,`status`,'room.name').then(e=>{
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