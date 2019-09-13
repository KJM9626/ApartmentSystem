<template>
    <div align="left">
        <Button type="primary" style="align:left;margin-bottom:15px;">新增访客</Button>
        <Table :columns="columns1" :data="data1"></Table>
    </div>
</template>
<script>
    export default {
        data () {
            return {
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
                        key: 'id'
                    },
                    {
                        title:'访问楼号/房间号',
                        key:'destId'
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
