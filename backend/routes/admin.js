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

  router.post('/changeStatus',async(ctx,next)=>{
    let req = ctx.request.body
    let back = 'fail'
    let currentStatus = 0
    let newStatus = 0
    await knex('admin').where('id',req.id).select('status').then(e=>{
      currentStatus = e[0].status
    })
    currentStatus === 0?newStatus = 1:newStatus=0
    await knex('admin').where('id',req.id).update({
      status:newStatus
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
