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

router.post('/add',async(ctx,next)=>{
  let req = ctx.request.body // req: max,dorm_id,name
  let back = 'fail'
  await knex('room').insert({
    max:req.max,
    dorm_id:req.dorm_id,
    name:req.name
  }).then(e=>{
    back = 'success'
  })
  ctx.body = back
})

router.get('/getByDormId/:id',async(ctx,next)=>{
  let id = ctx.params.id
  let back = {
    message:'fail',
    data:[]
  }
  await knex('room').where('dorm_id',id).select('id','name').then(e=>{
    if(e.length === 0) back.message = 'empty'
    else{
      back.message = 'success'
      back.data = e
    }
  })
  ctx.body = back
})

router.post('/delete',async(ctx,next)=>{
  let req = ctx.request.body // req: id
  let back = 'fail'
  await knex('room').where('id',req.id).del().then(e=>{back = 'success'}).catch(er=>{
    back = 'restrict'
  })
  ctx.body = back
})
module.exports = router
