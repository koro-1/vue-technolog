<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="id"
                    label="用户ID"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="用户名"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="role"
                    label="角色"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="gmtCreate"
                    label="创建时间"
                    width="120">
            </el-table-column>

            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">封禁</el-button>
                    <el-button type="text" size="small" @click="bianji(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-drawer
                title="我嵌套了表格!"
                :visible.sync="table"
                direction="rtl"
                size="50%">
            <el-table :data="gridData">
                <el-table-column property="date" label="日期" width="150"></el-table-column>
                <el-table-column property="name" label="姓名" width="200"></el-table-column>
                <el-table-column property="address" label="地址"></el-table-column>
            </el-table>
        </el-drawer>

        <el-drawer
                title="我嵌套了 Form !"
                :before-close="handleClose"
                :visible.sync="dialog"
                direction="ltr"
                custom-class="demo-drawer"
                ref="drawer"
        >
            <div class="demo-drawer__content">
                <el-form :model="form">
                    <el-form-item label="用户ID" :label-width="formLabelWidth">
                        <el-input v-model="form.id" ></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" :label-width="formLabelWidth">
                        <el-input v-model="form.username" ></el-input>
                    </el-form-item>
                   <!-- <el-form-item label="活动名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" ></el-input>
                    </el-form-item>-->

                    <el-form-item label="角色" :label-width="formLabelWidth">
                        <el-select v-model="form.role" placeholder="请选择活动区域">
                            <el-option label="管理员" value="shanghai"></el-option>
                            <el-option label="普通用户" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="demo-drawer__footer">
                    <el-button @click="cancelForm">取 消</el-button>
                    <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                </div>
            </div>
        </el-drawer>
    </div>



</template>

<script>
    import { getUserList, deleteUserByID, updateUser, queryRoleList, updateUserRole } from '../api/index'
    export default {
        methods: {
            handleClick(row) {
                this.form.id=row.id

                this.open()


            },
            handleClose(done) {
                if (this.loading) {
                    return;
                }
                this.$confirm('确定要提交表单吗？')
                    .then(_ => {
                        this.loading = true;
                        this.timer = setTimeout(() => {
                            done();


                            updateUser(this.form.id,this.form.username)
                            let params2 = new FormData()
                            var role =0;
                            params2.append('userId', this.form.id)
                            if (this.form.role==="院士") role=4
                            else if (this.form.role==="管理员") role=2
                            else if (this.form.role==="普通用户")role=1
                            params2.append('roleId', role)
                           updateUserRole(this.form.id,role)

                            // 动画关闭需要一定的时间
                            setTimeout(() => {
                                this.loading = false;
                            }, 400);
                        }, 2000);
                    })
                    .catch(_ => {});
            },
            cancelForm() {
                this.loading = false;
                this.dialog = false;
                clearTimeout(this.timer);
            },
            update(id,name){

                updateUser(id,name).then(res => {
                    console.log(res)


                })

            }
            ,
            delete(id){

                deleteUserByID(id).then(res => {
                    console.log(res)


                })

            }
            ,
            getList(){

                getUserList().then(res => {
                    console.log(res.list+'j8')
                    this.tableData=res.list;

                })
            }
            ,
            sumbit(){
                console.log(JSON.stringify(this.goodsOrder))
                axios.post('http://localhost:8081/order/saveOrder',JSON.stringify(this.goodsOrder),
                     {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                    }).then(function (response) {
console.log(response)
                })


            }
            ,
            bianji(row){
                console.log(row);
            this. dialog=true
                this.form.role=row.role

                this.form.username=row.username
                this.form.id=row.id

            }
            ,
            open2() {
                this.$message({
                    showClose: true,
                    message: '欢迎回来，'+this.username,
                    type: 'success'
                });
            },
            open() {
                this.$confirm('此操作将封禁该用户使其无法正常登陆, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                   /*   alert(this.form.id)*/
                       this.delete(this.form.id)
                    this.$message({
                        type: 'sucess',
                        message: '封禁成功'
                    });


                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
            ,
            open3() {

                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    alert(this.from.id)

                   /* this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });*/

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });

                });
            }
        }

,
        data() {
            return {
                tableData: []
                ,
                table: false,
                dialog: false,
                loading: false,
                username:'' ,
                gridData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                 goodsDetils1 : {goodsname:"辣条",
                    goodsnum:1 },
                 goodsDetils2 : {goodsname:"辣条2",
                    goodsnum:2 },
                  goodslist:[
                      { goodsname:"辣条2",
                          goodsnum:2,
                          orderid:2,
                      },
                      {goodsname:"辣条",
                          goodsnum:1,
                          orderid:3,}

                  ],

                 goodsOrder : {userid:1,

                    list:[]

                }

                ,
                form: {
                    id:'',
                    username:'',
                    role:'',
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '80px',
                timer: null,
            }
        },
        created() {
        this.getList()
             this.username=localStorage.getItem('userName')
         this.    open2()
            this.goodsOrder.list=this.goodslist;
            /*console.log(JSON.stringify(this.goodsOrder))
            console.log(JSON.stringify(this.goodslist))*/
               this.sumbit()
        }
    }
</script>