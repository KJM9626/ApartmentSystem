const router = require('koa-router')()
const knex = require('../utils/knex')

router.prefix('/dorm')

router.get('/getAll',async(ctx,next)=>{
  let back = {
    message:'fail',
    data:[]
  }
  await knex('dorm').join('admin','dorm.admin_id','=','admin.id')
  .select('dorm.id as id','population','empty_room','room','type','admin.id as adminid','name','gender','tel').then(e=>{
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
