<template>
    <div align="left">
        <Modal
            v-model="addModal2"
            title="新增学生"
            @on-ok="submit"
            @on-cancel="addModal2 = false"
            align="center">
            <Input v-model="addInfo.id" placeholder="请输入学号" style="width:200px"/><br>
            <Input v-model="addInfo.name" placeholder="请输入姓名" style="width:200px"/><br>
            <Select v-model="addInfo.gender" style="width:200px">
                <Option v-for="item in genderList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select><br>
            <Input v-model="addInfo.dorm_id" placeholder="请输入楼号" style="width:200px"/><br>
            <Input v-model="addInfo.room" placeholder="请输入房间号" style="width:200px"/><br>
        </Modal>
        <Button type="primary" style="align:left;margin-bottom:15px;" @click="addModal2 = true">新增学生</Button>
        <Table :columns="columns1" :data="data1"></Table>
    </div>
</template>
<script>
    export default {
        inject:['reload'],
        mounted () {
            this.$axios.get('http://localhost:3000/students/getAll').then(r=>{
                if(r.data.message === 'success'){
                    let data = r.data.data
                    data.forEach(o=>{
                        o.gender === 0?o.gender='男':o.gender='女'
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
                genderList: [
                    {
                        value: 0,
                        label: '男'
                    },
                    {
                        value:1,
                        label:'女'
                    }
                ],
                addInfo:{
                    id:null,
                    name:null,
                    gender:null,
                    dorm_id:null,
                    room:null
                },
                addModal2:false,
                columns1: [
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
                    {
                        title:'楼号',
                        key:'dorm_id'
                    },
                    {
                        title:'房间号',
                        key:'room'
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
                                            this.$Modal.confirm({
                                                title:'删除确认',
                                                content:'<p>删除后不可恢复，确定要删除吗？</p>',
                                                onOk:()=>{
                                                    this.$axios.post('http://localhost:3000/students/delete',{
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
                data1: []
            }
        }
    }
</script>
