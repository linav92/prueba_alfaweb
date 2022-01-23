import Vue from 'vue'
import VueRouter from 'vue-router'
import { observador } from '../firebase/auth.js'



Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import( '../views/Login.vue'),
  },
  {
    path: '/register',
    component: () => import( '../views/Register.vue'),
  },
  {
    path: '/home',
    component: () => import( '../views/Home.vue'),
  },
  {
    path: '/admin',
    component: () => import( '../views/Admin.vue'),
  },
  {
    path:'/admin/:id',
    name: 'edit',
    component: () => import( '../views/EditCourses.vue'),
    props: true
  },
  {
    path: '/aboutus',
    component: () => import( '../views/AcercaDe.vue'),
  },
  {
    path: '*',
    component: () => import( '../views/NotFound.vue'), 
  },
] 

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  observador(to, next);
});



export default router