<template>
    <div align="left">
        <Button type="primary" style="align:left;margin-bottom:15px;">新增房间</Button>
        <Table :columns="columns1" :data="data1"></Table>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                columns1: [
                    {
                        title: '房间号',
                        key: 'roomId'
                    },
                    {
                        title: '楼号',
                        key: 'dormId'
                    },
                    {
                        title: '最大容纳数量',
                        key: 'max'
                    },
                    {
                        title:'所住学生信息',
                        key:'studentsInfo'
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
