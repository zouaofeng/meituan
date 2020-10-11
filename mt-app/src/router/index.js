import Vue from 'vue'
import Router from 'vue-router'
import defaultPage from '@/layout/default'
import blankPage from '@/layout/blank'
import Index from '@/page/index'
import ChangeCity from '@/page/changeCity'
import GoodsList from '@/page/goodsList'
import Login from '@/page/login'
import Register from '@/page/register'
Vue.use(Router)
export default new Router({
  mode: 'history',
  params:[
    "name",
  ],
  routes: [
    {
      path: '/',
      name: 'defaultPage',
      component: defaultPage,
      redirect: '/index',
      children:[{
          path: '/index',
          name: 'index',
          component: Index
        }, 
        {
          path: '/changeCity',
          name: 'changeCity',
          component: ChangeCity,
        },
        {
          path: 's/:name',
          name: 'goods',
          component: GoodsList,
        },
      ]
    },
    {
      path: '/blank',
      name: 'blankPage',
      component: blankPage,
      children: [{
          path: 'login',
          name: 'login',
          component: Login
        },
        {
          path: 'register',
          name: 'register',
          component: Register
        }
      ]
    }
  ]
})
