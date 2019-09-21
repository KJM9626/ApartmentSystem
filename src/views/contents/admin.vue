<template>
    <div align="left">
        <Button type="primary" style="align:left;margin-bottom:15px;">新增管理员</Button>
        <Table :columns="columns1" :data="data1"></Table>
    </div>
</template>
<script>
    export default {
        mounted () {
            this.$axios.get('http://localhost:3000/dorm/getAll').then(r=>{
                if(r.data.message === 'success'){
                    let data = r.data.data
                    data.forEach(o => {
                        o.type === 0?o.type='研究生宿舍':o.type='本科生宿舍'
                        o.gender===0?o.gender='男':o.gender='女'
                        o.admin = o.adminid+', '+o.name+','+o.gender+','+o.tel
                    })
                    this.data1 = data
                }
            })
        },
        data () {
            return {
                columns1: [
                    {
                        title: '管理员ID',
                        key: 'id',
                    },
                    {
                        title: '姓名',
                        key: 'name',
                    },
                    {
                        title: '性别',
                        key: 'gender',
                    },
                    {
                        title: '电话号码',
                        key: 'tel'
                    },
                    {
                        title:'操作',
                        key:'op',
                        render: (h, params)=> {
                            return h('div',[
                                h('Button',{
                                    props:{
                                        type:'error',
                                        size:'small'
                                    },
                                    on:{
                                        click:()=>{
                                            // define action here.
                                        }
                                    }
                                },'删除')
                            ])
                        }
                    }
                ],
                data1: []
            }
        }
    }
</script>
