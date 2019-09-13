<template>
    <div align="left">
        <Button type="primary" style="align:left;margin-bottom:15px;">维修申报</Button>
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
                        key: 'dormId'
                    },
                    {
                        title: '房间号',
                        key: 'roomId'
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
                                    on:{
                                        click:()=>{
                                            // define action here.
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
                                            // define action here.
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
