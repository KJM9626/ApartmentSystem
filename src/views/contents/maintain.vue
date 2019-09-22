<template>
    <div align="left">
        <Modal
            v-model="addModal4"
            title="维护申报"
            @on-ok="submit"
            @on-cancel="addModal4 = false"
            align="center">
            <Input v-model="addInfo.id" placeholder="请输入房间ID" style="width:200px"/><br>
            <Input v-model="addInfo.dorm_id" placeholder="请输入楼号" style="width:200px"/><br>
            <Input v-model="addInfo.name" placeholder="请输入房间号" style="width:200px"/><br>
            <Input v-model="addInfo.type" placeholder="请输入维修类型" style="width:200px"/><br>
            <Input v-model="addInfo.detail" placeholder="请输入维修内容" style="width:200px"/><br>
        </Modal>
        <Button type="primary" style="align:left;margin-bottom:15px;" @click="addModal4 = true">维修申报</Button>
        <Table :columns="columns1" :data="data1"></Table>
    </div>
</template>
<script>
    let map = ['厕所','电器','门具','其他']
    export default {
        inject:['reload'],
        mounted () {
            this.$axios.get('http://localhost:3000/maintain/getAll').then(r=>{
                if(r.data.message === 'success'){
                    let data = r.data.data
                    data.forEach(o=>{
                        o.type = map[o.type]
                        o.status === 0?o.status='等待维修':o.status='维修完毕'
                    })
                    this.data1 = data
                }
            })
        },
        methods: {
            submit(){
                this.$axios.post('http://localhost:3000/maintain/add',{
                    id:this.addInfo.id,
                    dorm_id:this.addInfo.dorm_id,
                    name:this.addInfo.name,
                    type:this.addInfo.type,
                    detail:this.addInfo.detail
                }).then(r=>{
                    console.log(r.data)
                    if(r.data === 'success'){
                        this.$Message.success('添加成功');
                        this.reload()
                    }
                })
                
            }
        },
        data () {
            return {
                addInfo:{
                    id:null,
                    dorm_id:null,
                    name:null,
                    type:null,
                    detail:null
                },
                addModal4:false,
                columns1: [
                    {
                        title:'维修ID',
                        key:'id'
                    },
                    {
                        title: '楼号',
                        key: 'dorm_id'
                    },
                    {
                        title: '房间号',
                        key: 'name'
                    },
                    {
                        title: '维修类型',
                        key: 'type'
                    },
                    {
                        title:'维修内容',
                        key:'detail'
                    },
                    {
                        title:'维修状态',
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
                                    style:{
                                        marginRight:'10px'
                                    },
                                    on:{
                                        click:()=>{
                                            this.$axios.post('http://localhost:3000/maintain/changeStatus',{
                                                id:params.row.id
                                            }).then(r=>{
                                                if(r.data === 'success'){
                                                    this.$Message.success('修改维修状态成功')
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
                                                    this.$axios.post('http://localhost:3000/maintain/delete',{
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
