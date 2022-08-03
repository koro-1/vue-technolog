import Vue from 'vue'
import VueRouter from 'vue-router'

import App from '../App.vue'
import PageOne from "../views/PageOne";
import PageFive from "../views/PageFive";
import PageFour from "../views/PageFour";
import PageThree from "../views/PageThree";
import PageSix from "../views/PageSix";
import PageTwo from "../views/PageTwo";
import index from "../views/index";
import Login from "../views/Login";
import Register from "../components/Register";
import shop from "../viewscustmer/shop";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '登陆',
    component:Login,

  },
  {
    path: '/shop',
    name: '商店',
    component: shop,

  }
  ,{
    path: '/register',
    name: '注册',
    component:Register
  },

  {
    path: '/navigation',
    name: '导航1',
    component: index,
    redirect:"/PageOne",
    children:[
      {
        path: '/pageOne',
        name: '用户管理',
        component: PageOne,

      },
      {
        path: '/pageTwo',
        name: '订单管理',
        component: PageTwo,

      },
      {
        path: '/pageThree',
        name: '反馈管理',
        component: PageThree,

      }


    ]
  },
  {
    path: '/navigation2',
    name: '商品管理',
     component: index,
    children:[
  {
    path: '/pageFour',
    name: '页面4',
    component: PageFour,

  },
  {
    path: '/pageFive',
    name: '页面5',
    component: PageFive,

  },
  {
    path: '/pageSix',
    name: '页面6',
    component: PageSix,

  }


]
  }
]

const router = new VueRouter({
  routes,
})

export default router
