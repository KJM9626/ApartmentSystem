<template>
    <div align="left">
        <Button type="primary" style="align:left;margin-bottom:15px;">新增公寓</Button>
        <Table :columns="columns1" :data="data1"></Table>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                columns1: [
                    {
                        title: '楼号',
                        key: 'id',
                    },
                    {
                        title: '人数',
                        key: 'population',
                    },
                    {
                        title: '空房间数/总房间数',
                        key: 'rooms',
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
                data1: [{
                    id:1,
                    population:100,
                    rooms:20,
                    type:'研究生',
                    admin:'李三，男，18999009090'
                }]
            }
        }
    }
</script>
