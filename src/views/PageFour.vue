<template>
    <div>
        <div class="layout">
            <Layout>
                <Header>
                    <Menu mode="horizontal" theme="dark" active-name="1">
                        <div class="layout-logo">

                        </div>
                        <div class="layout-nav">
                            <MenuItem name="1">
                                <Icon  type="ios-navigate"></Icon>
                                <router-link to="/other" tag="span">首页</router-link>
                            </MenuItem>
                            <MenuItem name="2">
                                <Icon type="ios-keypad"></Icon>
                                <span @click="showFK=true">反馈</span>
                                <Modal
                                        v-model="showFK"
                                        title="反馈bug"
                                        @on-ok="say()">
                                    <Row>
                                        <Col span="12" offset="5">
                                            <Input v-model="fk" placeholder="Enter something..." clearable style="width: 300px" />
                                        </Col>
                                    </Row>
                                </Modal>
                            </MenuItem>
                            <!-- <MenuItem name="3">
                                <Icon type="ios-analytics"></Icon>
                                登录
                            </MenuItem>
                            <MenuItem name="4">
                                <Icon type="ios-paper"></Icon>
                                注册
                            </MenuItem> -->
                        </div>
                    </Menu>
                </Header>
                <Content :style="{padding: '0 50px'}">
                    <div :style="{margin: '20px 0'}">


                    </div>
                    <Card>
                        <div style="min-height: 200px;">
                            <Row>
                                <Col span="8">
                                    <Input v-model="matrix" autofocus :rows="8"
                                           type="textarea"
                                           placeholder="输入矩阵，以空格隔开" />
                                </Col>
                                <Col span="7" offset="1" >
                                    <Select v-model="algoID" style="width:200px">
                                        <Option v-for="item in algoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    &nbsp;
                                    <Button @click="inputMatrix" type="primary">Calculate</Button>
                                    <Button @click="clearMatrix">Clear</Button>
                                    <br><br>

                                    <p>行：</p><Input v-model="row"  style="width: 100px" />
                                    <p>列：</p><Input v-model="col"  style="width: 100px" />
                                </Col>
                                <Col span="8">
                                    <Input v-model="result" readonly :rows="8" type="textarea"  placeholder="此处显示结果" />
                                </Col>
                            </Row>
                            <Row>
                                <Col flex span="14" offset="5" >
                                    <div id="SOHUCS"></div>
                                </Col>
                            </Row>
                        </div>

                    </Card>
                </Content>
                <Footer class="layout-footer-center">2020-2021 &copy; zcpsama</Footer>
            </Layout>
        </div>
    </div>
</template>

<script>

    import { createComment } from '../utils/createComment'

    import { addComment } from '../api/index'

    export default {

        name: 'other',
        data() {
            return {
                showFK: false,
                algoList: [
                    {
                        value: '',
                        label: '',
                    },
                ],
                algoID: '',
                matrix: '',
                result: '',
                row: '',
                col: '',
                fk: '',
            }
        },
        created() {
            this.getAlgoList()
        },
        methods: {
            say() {
                addComment(this.fk)
                this.$Message.success('反馈成功!')
                this.fk = ''
            },
            inputMatrix() {
                let params = new FormData()
                params.append('matrix', this.matrix)
                params.append('row', this.row)
                params.append('col', this.col)
                params.append('algo', this.algoID)

                this.axios.post('http://localhost:8081/matrix/getMatrix', params, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                    .then((response) => {
                        console.log(response)
                        this.result = response.data
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            getAlgoList() {
                this.axios.get('http://localhost:8081/algo/getAlgoList')
                    .then(res => {
                        this.algoList = res.data
                    })
                    .catch(err => {
                        console.error(err)
                    })
            },
            clearMatrix() {
                this.matrix = ''
                this.result = ''
            },
            clearContent() {
                this.editor.txt.clear()
            },

        },
        mounted() {
            // eslint-disable-next-line no-undef
            // div.addEventListener('scroll', () => {})
            createComment()
            // const editor = new E('#wang')

            // // 去掉不需要的菜单
            // editor.config.excludeMenus = [
            //     'image',
            //     'video',
            //     'todo',
            //     'undo',
            //     'redo',
            //     'indent',
            // ]
            // editor.create()
        },
        beforeDestroy() {
            // 销毁编辑器
            // this.editor.destroy()
            // this.editor = null
        },
        components: {

        },
    }
</script>

<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        /* overflow: scroll; */
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }
    .layout-footer-center{
        text-align: center;
    }
</style>
