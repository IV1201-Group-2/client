import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/applicant/ApplicantLoginView.vue'
import ApplicantRegistrationView from '../views/applicant/ApplicantRegistrationView.vue'
import ApplicationFormView from '@/views/applicant/application_form/ApplicationFormView.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/logout',
      name: 'logout',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: ApplicantRegistrationView
    },
    {
      path: '/application',
      name: 'application',
      component: ApplicationFormView,
      meta: {
        requiresAuth: true,
        requiredRole: "Applicant"
      }
    },
    {
      path: '/recruitment',
      name: 'recruitment',
      component: HomeView,
      meta: {
        requiresAuth: true,
        requiredRole: "Recruiter"
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { role } = useAuthStore();

  function isRecruiter(): boolean {
    return role === 'Recruiter';
  }

  function isApplicant(): boolean {
    return role === 'Applicant';
  }

  function canAccessAsRecruiter(): boolean {
    return to.meta.requiredRole === "Recruiter" && isRecruiter();
  }

  function canAccessAsApplicant(): boolean {
    return to.meta.requiredRole === "Applicant" && isApplicant();
  }

  if(to.meta.requiresAuth) {
    if(canAccessAsRecruiter()) {
      next()
    } else if(canAccessAsApplicant()) {
      next()
    } else {
      next('/')
    }
  } else {
      if(isRecruiter()) {
        next('/recruitment')
      } else if(isApplicant()) {
        next('/application')
      } else {
        next()
      }
  }
})

export default router
