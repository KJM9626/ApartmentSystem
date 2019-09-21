<template>
    <div align="left">
        <Modal
            v-model="addModal"
            title="新增公寓"
            @on-ok="submit"
            @on-cancel="addModal = false"
            align="center">
            <Input v-model="addInfo.room" placeholder="请输入总房间数" style="width:200px"/><br>
            <Select v-model="addInfo.type" style="width:200px">
                <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select><br>
            <Select v-model="addInfo.admin_id" style="width:200px" placeholder="选择管理员">
                <Option v-for="item in adminList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </Modal>
        <Button type="primary" style="align:left;margin-bottom:15px;" @click="addModal = true">新增公寓</Button>
        <Table :columns="columns1" :data="data1"></Table>
    </div>
</template>
<script>
    export default {
        mounted() {
            this.$axios.get('http://localhost:3000/dorm/getAll').then(r => {
                if (r.data.message === 'success') {
                    let data = r.data.data
                    data.forEach(o => {
                        o.type === 0 ? o.type = '研究生宿舍' : o.type = '本科生宿舍'
                        o.gender === 0 ? o.gender = '男' : o.gender = '女'
                        o.admin = o.name + ',' + o.gender + ',' + o.tel
                    })
                    this.data1 = data
                }
            })
            this.$axios.get('http://localhost:3000/admin/getAll').then(r => {
                if (r.data.message === 'success') {
                    r.data.data.forEach(e => {
                        this.adminList.push({
                            value: e.id,
                            label: e.name
                        })
                    })
                }
            })
        },
        methods: {
            submit(){
                this.$axios.post('http://localhost:3000/dorm/add',{
                    room:this.addInfo.room,
                    type:this.addInfo.type,
                    admin_id:this.addInfo.admin_id
                }).then(r=>{
                    console.log(r.data)
                    if(r.data === 'success'){
                        this.$Message.success('添加成功');
                    }
                })
            }
        },
        data () {
            return {
                adminList:[],
                typeList: [
                    {
                        value: 0,
                        label: '本科生宿舍'
                    },
                    {
                        value:1,
                        label:'研究生宿舍'
                    }
                ],
                addInfo:{
                    room:null,
                    type:0,
                    admin_id:0
                },
                addModal:false,
                columns1: [
                    {
                        title: '楼号',
                        key: 'id',
                    },
                    {
                        title: '总房间数',
                        key: 'room'
                    },
                    {
                        title:'公寓类型',
                        key:'type',
                    },
                    {
                        title:'管理员',
                        key:'admin'
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
