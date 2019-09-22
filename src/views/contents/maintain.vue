<template>
    <div align="left">
        <Modal
            v-model="addModal4"
            title="维护申报"
            @on-ok="submit"
            @on-cancel="addModal4 = false"
            align="center">
            <Select v-model="addInfo.dorm_id" style="width:200px;margin:5px" placeholder="请选择楼号" @on-change="dormSelected">
                <Option v-for="item in dormList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select><br>
            <Select v-model="addInfo.room_id" style="width:200px;margin:5px" :disabled=roomDisable placeholder="请选择房间">
                <Option v-for="item in roomList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select><br>
            <Select v-model="addInfo.type" style="width:200px;margin:5px" placeholder="请选择维修类型">
                <Option v-for="item in map" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select><br>
            <Input v-model="addInfo.detail" type="textarea" placeholder="请输入维修内容" style="width:200px;margin:5px"/><br>
        </Modal>
        <Button type="primary" style="align:left;margin-bottom:15px;" @click="addMaintain">维修申报</Button>
        <Table :columns="columns1" :data="data1"></Table>
    </div>
</template>
<script>
    let map = ['厕所','电器','门具','其他']
    export default {
        inject:['reload'],
        mounted () {
            this.$axios.get('http://localhost:3000/maintain/getAll').then(r=>{
                console.log(r.data)
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
            addMaintain(){
                this.addModal4 = true
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
                this.$axios.post('http://localhost:3000/maintain/add',{
                    dorm_id:this.addInfo.dorm_id,
                    room_id:this.addInfo.room_id,
                    type:this.addInfo.type,
                    detail:this.addInfo.detail,
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
                map:[{
                    label:'厕所',
                    value:0
                },{
                    label:'电器',
                    value:1
                },{
                    label:'门具',
                    value:2
                },{
                    label:'其他',
                    value:3
                }],
                roomDisable:true,
                dormList:[],
                roomList:[],
                addInfo:{
                    dorm_id:null,
                    room_id:null,
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
