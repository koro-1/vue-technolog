<template>

    <div id="app">
        <el-container style="height: 800px; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu :default-openeds="['1', '3']">
                  <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>导航一</template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                    <el-menu-item index="1-3">选项3</el-menu-item>

                  </el-submenu>
                  <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>导航二</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>

                  </el-submenu>

                </el-menu>
                <el-menu router :default-openeds="['0', '1']">
                    <el-submenu v-for="(item,index) in $router.options.routes" :index="index+''" >
                        <template slot="title"><i class="el-icon-message"></i>{{item.name}}</template>
                        <el-menu-item v-for="(item2,index2) in item.children":index="item2.path" :class="$route.path===item2.path?'is-active':''">{{item2.name}}</el-menu-item>
                    </el-submenu>


                </el-menu>
            </el-aside>

            <el-container>
                <el-header style="text-align: right; font-size: 12px">


                </el-header>

                <el-main>
                    <router-view>

                    </router-view>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                arrowUp: false, // 用户详情向上箭头
                arrowDown: true, // 用户详情向下箭头
                userName: '',
                userImg: '',
            }

    },
        created() {
            this.userName = localStorage.getItem('userName')
            this.userImg = localStorage.getItem('userImg')
        }
    }
</script>

<style scoped>
    .user-img-c {
        width: 34px;
        height: 34px;
        background: #ddd;
        border-radius: 50%;
        margin: 0 40px;
        overflow: hidden;
    }
    .h-right {
        display: flex;
        align-items: center;
    }
</style>