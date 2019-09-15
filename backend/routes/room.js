const router = require('koa-router')()
const knex = require('../utils/knex')

router.prefix('/room')

router.get('/getAll',async(ctx,next)=>{
  let back = {
    message:'fail',
    data:[]
  }
  await knex('room')
  .select('id','max','name','dorm_id').then(e=>{
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
