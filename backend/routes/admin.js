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
  
  router.post('/add',async(ctx,next)=>{
    let req = ctx.request.body // req: name,gender,tel
    let back = 'fail'
    await knex('admin').insert({
      name:req.name,
      gender:req.gender,
      tel:req.tel
    }).then(e=>{
      back = 'success'
    })
    ctx.body = back
  })

  router.post('/delete',async(ctx,next)=>{
    let req = ctx.request.body // req: id
    let back = 'fail'
    await knex('admin').where('id',req.id).del().then(e=>{back = 'success'})
    ctx.body = back
  })
  module.exports = router