<template>
    <div align="left">
        <Button type="primary" style="align:left;margin-bottom:15px;">新增访客</Button>
        <Table :columns="columns1" :data="data1"></Table>
    </div>
</template>
<script>
    export default {
        inject:['reload'],
        mounted () {
            this.$axios.get('http://localhost:3000/visitor/getAll').then(r=>{
                if(r.data.message === 'success'){
                    let data = r.data.data
                    data.forEach(o=>{
                        o.gender === 0?o.gender='男':o.gender='女'
                        o.status === 0?o.status='正在探访':o.status='已离开'
                    })
                    this.data1 = data
                }
            })
        },
        data () {
            return {
                columns1: [
                    {
                        title: '访客姓名',
                        key: 'name'
                    },
                    {
                        title: '性别',
                        key: 'gender'
                    },
                    {
                        title: '身份证号',
                        key: 'idno'
                    },
                    {
                        title:'访问楼号',
                        key:'dorm_id'
                    },
                    {
                        title:'访问房间号',
                        key:'room_name'
                    },
                    {
                        title:'访问理由',
                        key:'reason'
                    },
                    {
                        title:'当前状态',
                        key:'status'
                    },
                    {
                        title:'操作',
                        key:'op',
                        render: (h, params)=> {
                            return h('div',[
                                h('Button',{
                                    props:{
                                        type:'success',
                                        size:'small'
                                    },
                                    on:{
                                        click:()=>{
                                            this.$axios.post('http://localhost:3000/visitor/changeStatus',{
                                                id:params.row.id
                                            }).then(r=>{
                                                if(r.data === 'success'){
                                                    this.$Message.success('修改探访状态成功')
                                                    this.reload()
                                                }
                                                else this.$Message.error('修改失败')
                                            })
                                        }
                                    }
                                },'修改状态')
                            ,h('Button',{
                                    props:{
                                        type:'error',
                                        size:'small'
                                    },
                                    on:{
                                        click:()=>{
                                            this.$Modal.confirm({
                                                title:'删除确认',
                                                content:'<p>删除后不可恢复，确定要删除吗？</p>',
                                                onOk:()=>{
                                                    this.$axios.post('http://localhost:3000/visitor/delete',{
                                                        id:this.data1[params.index].id
                                                    }).then(r=>{
                                                        if(r.data === 'success'){
                                                            this.$Message.success('删除成功')
                                                            this.reload()
                                                        }
                                                    })
                                                },
                                            })
                                        }
                                    }
                                },'删除')])
                        }
                    }
                ],
                data1: []
            }
        }
    }
</script>
