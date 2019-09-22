const router = require('koa-router')()
const knex = require('../utils/knex')

router.prefix('/dorm')

router.get('/getAll',async(ctx,next)=>{
  let back = {
    message:'fail',
    data:[]
  }
  await knex('dorm').join('admin','dorm.admin_id','=','admin.id')
  .select('dorm.id as id','room','type','admin.id as adminid','name','gender','tel').then(e=>{
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
  let req = ctx.request.body // req: room, type, admin_id
  let back = 'fail'
  await knex('dorm').insert({
    room:req.room,
    type:req.type,
    admin_id:req.admin_id
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
  await knex('dorm').where('id',req.id).select('status').then(e=>{
    currentStatus = e[0].status
  })
  currentStatus === 0?newStatus = 1:newStatus=0
  await knex('dorm').where('id',req.id).update({
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
  await knex('dorm').where('id',req.id).del().then(e=>{back = 'success'})
  ctx.body = back
})
<<<<<<< HEAD


=======
>>>>>>> 79af7fc8a5625eb8936f4013ecca92d380a79f15
module.exports = router
