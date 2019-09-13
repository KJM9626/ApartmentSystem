<style scoped>
    .layout{
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
</style>
<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
                <MenuItem name="1" style="font-size:18px;" to="/home/welcome"><Icon type="ios-home" size="20"></Icon>公寓管理</MenuItem>
                <MenuItem name="2" style="font-size:18px;"><Icon type="ios-contact" size="20"></Icon>学生管理</MenuItem>
                <MenuItem name="3" style="font-size:18px;"><Icon type="ios-create" size="20"></Icon>房间管理</MenuItem>
                <MenuItem name="4" style="font-size:18px;"><Icon type="ios-hammer" size="20"></Icon>维修管理</MenuItem>
                <MenuItem name="5" style="font-size:18px;"><Icon type="ios-contacts" size="20"></Icon>访客管理</MenuItem>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                <span style="font-size:25px;">
                    学生公寓管理系统
                </span>
            </Header>
            <Content :style="{padding: '0 16px 16px'}">
                <Card :style="{margin:'10px 0 0 0'}">
                    <div style="height: 600px">
                        <router-view></router-view>
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>
<script>
    export default {
        
    }
</script>