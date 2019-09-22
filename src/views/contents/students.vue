<template>
    <div align="left">
        <Modal
            v-model="addModal2"
            title="新增学生"
            @on-ok="submit"
            @on-cancel="addModal2 = false"
            align="center">
            <Input v-model="addInfo.id" placeholder="请输入学号" style="width:200px;margin:10px"/><br>
            <Input v-model="addInfo.name" placeholder="请输入姓名" style="width:200px;margin:10px"/><br>
            <Select v-model="addInfo.gender" style="width:200px;margin:10px" placeholder="请选择性别">
                <Option v-for="item in genderList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select><br>
            <Select v-model="addInfo.dorm_id" style="width:200px;margin:10px" placeholder="请选择楼号" @on-change="dormSelected">
                <Option v-for="item in dormList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select><br>
            <Select v-model="addInfo.room_id" style="width:200px;margin:10px" :disabled=roomDisable placeholder="请选择房间">
                <Option v-for="item in roomList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select><br>
        </Modal>
        <Button type="primary" style="align:left;margin-bottom:15px;" @click="addStudent">新增学生</Button>
        <Table :columns="columns1" :data="data1"></Table>
    </div>
</template>
<script>
    export default {
        inject:['reload'],
        mounted () {
            this.$axios.get('http://localhost:3000/student/getAll').then(r=>{
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
            dormSelected(){
                this.roomDisable = true
                this.roomList.length = 0
                this.$axios.get('http://localhost:3000/room/getByDormId/'+this.addInfo.dorm_id).then(r=>{
                    console.log(r.data)
                    if(r.data.message === 'success'){
                        let data = r.data.data
                        data.forEach(e=>{
                            this.roomList.push({label:e.name,value:e.id})
                        })
                        this.roomDisable = false
                    }
                    else if(r.data.message === 'empty'){
                        this.$Message.error('这栋楼没有房间')
                    }
                    else{
                        this.$Message.error('未知错误')
                    }
                })
            },
            addStudent(){
                this.addModal2 = true
                this.dormList.length = 0
                this.$axios.get('http://localhost:3000/dorm/getAll').then(r=>{
                    if(r.data.message === 'success'){
                        let data = r.data.data
                        data.forEach(e=>{
                            this.dormList.push({label:e.id+'号楼',value:e.id})
                        })
                        this.addModal3 = true
                    }
                })
            },
            submit(){
                this.$axios.post('http://localhost:3000/student/add',{
                    id:this.addInfo.id,
                    name:this.addInfo.name,
                    gender:this.addInfo.gender,
                    dorm_id:this.addInfo.dorm_id,
                    room_id:this.addInfo.room_id
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
                roomDisable:true,
                dormList:[],
                roomList:[],
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
                    room_id:null
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
                                                    this.$axios.post('http://localhost:3000/student/delete',{
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
