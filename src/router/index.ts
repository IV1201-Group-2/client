import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/applicant/ApplicantLoginView.vue'
import ApplicantRegistrationView from '../views/applicant/ApplicantRegistrationView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/register',
      name: 'register',
      component: ApplicantRegistrationView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
