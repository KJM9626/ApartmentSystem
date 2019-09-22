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

<<<<<<< HEAD
router.post('/changeStatus',async(ctx,next)=>{
  let req = ctx.request.body
  let back = 'fail'
  let currentStatus = 0
  let newStatus = 0
  await knex('room').where('id',req.id).select('status').then(e=>{
    currentStatus = e[0].status
  })
  currentStatus === 0?newStatus = 1:newStatus=0
  await knex('room').where('id',req.id).update({
    status:newStatus
  }).then(e=>{
    back = 'success'
  })
  ctx.body = back
})
=======
>>>>>>> 79af7fc8a5625eb8936f4013ecca92d380a79f15
router.post('/delete',async(ctx,next)=>{
  let req = ctx.request.body // req: id
  let back = 'fail'
  await knex('room').where('id',req.id).del().then(e=>{back = 'success'})
  ctx.body = back
})
module.exports = router
