<template>
 <div class="login-vue" :style="bg">
    <div class="container">
      <p class="title">用户登录</p>
      <p style="color:red">{{msg}}</p>
      <div class="input-c">
        <el-input
                placeholder="请输入内容"
                v-model="account"
                clearable>
        </el-input>
        <p class="error">{{ accountError }}</p>
      </div>
      <div class="input-c">
        <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input>
        <p class="error">{{ pwdError }}</p>
      </div>
      <Button
        :loading="isShowLoading"
        class="submit"
        type="primary"
        @click="submit"
        >登陆</Button
      >
      <p class="account">
        <span @click="register">注册账号</span> |
        <span @click="forgetPwd">忘记密码</span>
      </p>
    </div>
  </div>

</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            account: '',
            pwd: '',
            accountError: '',
            pwdError: '',
            isShowLoading: false,
            bg: {},
            msg: '',
        }
    },
    created() {
    // eslint-disable-next-line no-useless-concat
     /* let params = new FormData()
      params.append('userid', "JXAU6020201773")
      params.append('pwd', "221813")
      params.append('code', '023G3bll2H0ty848Iell2BzTEJ3G3blh')

      this.axios({
        method:'get',

        url:'http://106.14.29.161:8080/getmessage'
        ,

        Authorization: 'Bearer '
    }).then(function(resp){
        console.log(resp.data);

      })*/



     /* this.axios
              .post('https://xsgzgl.zxhnzq.com/api/Login/WXAdminLogin', params, {
                headers: {
                  'Content-Type': 'application/json',
                },
              })
              .then((res) => {
                console.log(res.code)
              })*/




        this.bg.backgroundImage = 'url('
      + 'https://cn.bing.com/th?id=OHR.OceanHeart_ZH-CN2697021215_UHD.jpg'
      + ')'

    },
    watch: {
        $route: {
            handler(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true,
        },
    },
    methods: {
        verifyAccount() {
            if (this.account.length < 5) {
                this.accountError = '账号长度不少于5'
            } else {
                this.accountError = ''
            }
        },
        verifyPwd() {
            if (this.pwd.length < 5) {
                this.pwdError = '密码长度不少于5'
            } else {
                this.pwdError = ''
            }
        },
      openFullScreen2() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      }
      ,
        register() {
            this.$router.push({ path: this.redirect || '/register' })
        },
        forgetPwd() {},
        submit() {
            // let params = {
            //     username: this.account,
            //     password: this.pwd,
            // }
            // this.axios
            // .post('http://localhost:8081/user/login', JSON.stringify(params), {
            //     headers: {
            //         'Content-Type': 'application/json;charset=UTF-8',
            //     },
            // })
          this.openFullScreen2()
          console.log(this.account+""+this.pwd)
            let params = new FormData()
            params.append('username', this.account)
            params.append('password', this.pwd)
          console.log(params)
            this.axios
            .post('http://127.0.0.1:8081/user/login', params, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                console.log(res.data.toString())

                // 登录成功
              if (res.status == 200 && res.data.success == true) {
                // 解析jwt用户信息
                let token = res.data.token
                let roleId=res.data.roleId;

                let strings = token.split('.')
                console.log(strings[0]+'haha'+roleId)
                let userInfo = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, '+').replace(/_/g, '/')))))
                console.log(userInfo+'j8')
                this.isShowLoading = true
                // 登陆成功 设置用户信息
                localStorage.setItem(
                        'userImg',
                        'https://avatars3.githubusercontent.com/u/22117876?s=460&v=4'
                )
                localStorage.setItem('', userInfo.username)
                // 登陆成功 假设这里是后台返回的 token
                localStorage.setItem('token', token)
             /*   this.$router.push({ path: this.redirect || '/' })
              }*/   if (roleId===1){
                  this.$router.push({ path: this.redirect || '/navigation' ,query: {
                      id: this.account
                    }})
                }else {
                  this.$router.push({ path: this.redirect || '/shop' ,query: {
                      id: this.account
                    }})

                }


                }
                this.msg = res.data.msg
                this.pwd = ''
            })
            .catch((err) => {
                console.error(err)
            })
        },
    },
}
</script>

<style scoped>
.login-vue {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.login-vue .container {
  background: rgba(255, 255, 255, 0.5);
  width: 300px;
  text-align: center;
  border-radius: 10px;
  padding: 30px;
}
.login-vue .ivu-input {
  background-color: transparent;
  color: #fff;
  outline: #fff;
  border-color: #fff;
}
.login-vue ::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: rgba(255, 255, 255, 0.8);
}
.login-vue :-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgba(255, 255, 255, 0.8);
}
.login-vue ::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgba(255, 255, 255, 0.8);
}
.login-vue :-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: rgba(255, 255, 255, 0.8);
}
.login-vue .title {
  font-size: 16px;
  margin-bottom: 20px;
}
.login-vue .input-c {
  margin: auto;
  width: 200px;
}
.login-vue .error {
  color: red;
  text-align: left;
  margin: 5px auto;
  font-size: 12px;
  padding-left: 30px;
  height: 20px;
}
.login-vue .submit {
  width: 200px;
}
.login-vue .account {
  margin-top: 30px;
}
.login-vue .account span {
  cursor: pointer;
}
.login-vue .ivu-icon {
  color: #eee;
}
.login-vue .ivu-icon-ios-close-circle {
  color: #777;

}
</style>
