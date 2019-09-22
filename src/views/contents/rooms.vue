<template>
    <div align="left">
        <Modal v-model="detailModal" title="所住学生">
            <Table :columns="columns2" :data="data2"></Table>
        </Modal>
        <Modal
            v-model="addModal3"
            title="新增房间"
            @on-ok="submit"
            @on-cancel="addModal3 = false"
            align="center">
            <Input v-model="addInfo.id" placeholder="请输入房间ID" style="width:200px"/><br>
            <Input v-model="addInfo.name" placeholder="请输入房间号" style="width:200px"/><br>
            <Input v-model="addInfo.dorm_id" placeholder="请输入楼号" style="width:200px"/><br>
            <Input v-model="addInfo.max" placeholder="请输入最大容纳数量" style="width:200px"/>
        </Modal>
        <Button type="primary" style="align:left;margin-bottom:15px;" @click="addModal3 = true">新增房间</Button>
        <Table :columns="columns1" :data="data1"></Table>
    </div>
</template>
<script>
    export default {
        mounted () {
            this.$axios.get('http://localhost:3000/room/getAll').then(r=>{
                if(r.data.message === 'success'){
                    let data = r.data.data
                    data.forEach(o=>{
                        
                    })
                    this.data1 = data
                }
            })
        },
        methods: {
            submit(){
                
            }
        },
        data () {
            return {
                addInfo:{
                    id:null,
                    name:null,
                    dorm_id:null,
                    max:null
                },
                addModal3:false,
                detailModal:false,
                columns2: [
                    {
                        title: '学号',
                        key: 'id'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '性别',
                        key: 'gender'
                    },
                ],
                columns1: [
                    {
                        title : '房间ID',
                        key:'id'
                    },
                    {
                        title: '房间号',
                        key: 'name'
                    },
                    {
                        title: '楼号',
                        key: 'dorm_id'
                    },
                    {
                        title: '最大容纳数量',
                        key: 'max'
                    },
                    {
                        title:'操作',
                        key:'op',
                        render: (h, params)=> {
                            return h('div',[h('Button',{
                                    props:{
                                        type:'primary',
                                        size:'small',
                                    },
                                    style:{
                                        marginRight:'10px'
                                    },
                                    on:{
                                        click:async ()=>{
                                            //console.log(params.row)
                                            await this.$axios.get('http://localhost:3000/students/getByRoomId/'+params.row.id).then(r=>{
                                                if(r.data.message === 'fail') this.$Message.error('获取失败')
                                                else if(r.data.message === 'empty') this.$Message.error('这间宿舍还未入住学生')
                                                else{
                                                    let data = r.data.data
                                                    data.forEach(e=>{
                                                        e.gender === 0?e.gender = '男':e.gender='女'
                                                    })
                                                    this.data2 = data
                                                    this.detailModal = true
                                                }
                                            })
                                        }
                                    }
                                },'查看所住学生'),
                                h('Button',{
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
                                                    this.$axios.post('http://localhost:3000/room/delete',{
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
                                },'删除')
                            ])
                        }
                    }
                ],
                data1: [],
                data2: []
            }
        }
    }
</script>
