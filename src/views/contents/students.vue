<template>
    <div align="left">
        <Button type="primary" style="align:left;margin-bottom:15px;">新增学生</Button>
        <Table :columns="columns1" :data="data1"></Table>
    </div>
</template>
<script>
    export default {
        data () {
            return {
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
                        key:'dormId'
                    },
                    {
                        title:'房间号',
                        key:'roomId'
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
