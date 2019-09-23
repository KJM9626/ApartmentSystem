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
            <Input v-model="addInfo.name" placeholder="请输入房间编号" style="width:200px"/><br>
            <Select v-model="addInfo.dorm_id" style="width:200px;margin:10px" placeholder="请选择楼号">
                <Option v-for="item in dormList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select><br>
            <Input v-model="addInfo.max" placeholder="请输入最大容纳人数" style="width:200px"/>
        </Modal>
        <Button type="primary" style="align:left;margin-bottom:15px;" @click="addRoom">新增房间</Button>
        <Table :columns="columns1" :data="data1"></Table>
    </div>
</template>
<script>
    export default {
        inject:['reload'],
        mounted () {
            this.$axios.get('http://localhost:3000/room/getAll').then(r=>{
                if(r.data.message === 'success'){
                    let data = r.data.data
                    this.data1 = data
                }
            })
        },
        methods: {
            addRoom(){
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
                if(this.addInfo.name === null || this.addInfo.dorm_id === null || this.addInfo.max === null){
                    this.$Message.error('请填写完整信息')
                    return
                }
                this.$axios.post('http://localhost:3000/room/add',{
                    name:this.addInfo.name,
                    dorm_id:this.addInfo.dorm_id,
                    max:this.addInfo.max
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
                        title:'已入住学生',
                        key:'student_num'
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
                                            await this.$axios.get('http://localhost:3000/student/getByRoomId/'+params.row.id).then(r=>{
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
                                                        else if(r.data === 'restrict'){
                                                            this.$Message.error('该房间还有学生入住/维修记录/访客记录，无法删除')
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
