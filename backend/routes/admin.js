const router = require('koa-router')()
const knex = require('../utils/knex')

router.prefix('/admin')

router.get('/getAll',async(ctx,next)=>{
    let back ={
        message:'fail',
        data:[]
    }
    await knex('admin')
    .select(`id`,`name`,`gender`,`tel`).then(e=>{
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