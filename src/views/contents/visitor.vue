<template>
    <div align="left">
        <Modal
            v-model="addModal5"
            title="新增访客"
            @on-ok="submit"
            @on-cancel="addModal5 = false"
            align="center">
            <Input v-model="addInfo.name" placeholder="请输入访客姓名" style="width:200px;margin:5px"/><br>
            <Select v-model="addInfo.gender" style="width:200px;margin:5px" placeholder="性别">
                <Option v-for="item in genderList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select><br>
            <Input v-model="addInfo.idno" placeholder="请输入身份证号" style="width:200px;margin:5px"/><br>
            <Select v-model="addInfo.dorm_id" style="width:200px;margin:5px" placeholder="请选择楼号" @on-change="dormSelected">
                <Option v-for="item in dormList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select><br>
            <Select v-model="addInfo.room_id" style="width:200px;margin:5px" :disabled=roomDisable placeholder="请选择房间">
                <Option v-for="item in roomList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select><br>
            <Input v-model="addInfo.reason" placeholder="请输入访问理由" type="textarea" style="width:200px;margin:5px"/><br>
        </Modal>
        <Button type="primary" style="align:left;margin-bottom:15px;" @click="addVisitor">新增访客</Button>
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
            addVisitor(){
                this.addModal5 = true
                this.roomList.length = 0
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
                if(this.addInfo.name === null || this.addInfo.gender === null || this.addInfo.idno === null || this.addInfo.reason === null ||this.addInfo.dorm_id === null || this.addInfo.room_id === null || this.roomDisable === true){
                    this.$Message.error('请填写完整信息')
                    return
                }
                this.$axios.post('http://localhost:3000/visitor/add',{
                    name:this.addInfo.name,
                    gender:this.addInfo.gender,
                    idno:this.addInfo.idno,
                    dorm_id:this.addInfo.dorm_id,
                    room_id:this.addInfo.room_id,
                    reason:this.addInfo.reason,
                    status:0
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
                dormList:[],
                roomList:[],
                roomDisable:true,
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
                    name:null,
                    gender:null,
                    idno:null,
                    dorm_id:null,
                    room_id:null,
                    reason:null
                },
                addModal5:false,
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
