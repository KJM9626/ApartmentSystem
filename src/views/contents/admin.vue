<template>
    <div align="left">
        <Modal
            v-model="addModal6"
            title="新增管理员"
            @on-ok="submit"
            @on-cancel="addModal6 = false"
            align="center">
            <Input v-model="addInfo.id" placeholder="请输入管理员ID" style="width:200px"/><br>
            <Input v-model="addInfo.name" placeholder="请输入姓名" style="width:200px"/><br>
            <Select v-model="addInfo.gender" style="width:200px">
                <Option v-for="item in genderList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select><br>
            <Input v-model="addInfo.tel" placeholder="请输入电话号码" style="width:200px"/>
        </Modal>
        <Button type="primary" style="align:left;margin-bottom:15px;" @click="addModal6 = true">新增管理员</Button>
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
        methods: {
            submit(){
                this.$axios.post('http://localhost:3000/admin/add',{
                    id:this.addInfo.id,
                    name:this.addInfo.name,
                    gender:this.addInfo.gender,
                    tel:this.addInfo.tel
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
                    tel:null
                },
                addModal6:false,
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
                                            this.$Modal.confirm({
                                                title:'删除确认',
                                                content:'<p>删除后不可恢复，确定要删除吗？</p>',
                                                onOk:()=>{
                                                    this.$axios.post('http://localhost:3000/admin/delete',{
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
