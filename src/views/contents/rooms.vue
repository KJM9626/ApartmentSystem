<template>
    <div align="left">
        <Button type="primary" style="align:left;margin-bottom:15px;">新增房间</Button>
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
        data () {
            return {
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
                                        click:()=>{
                                            // define action here.
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
