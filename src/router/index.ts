import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/applicant/ApplicantLoginView.vue"
import ApplicantRegistrationView from "@/views/applicant/ApplicantRegistrationView.vue"
import ApplicationFormView from "@/views/applicant/ApplicationFormView.vue"
import { useAuthStore } from "@/stores/auth"
import { storeToRefs } from "pinia"
import ApplicationConfirmationView from "@/views/applicant/ApplicationConfirmationView.vue"
import AdminPanel from "@/views/recruiter/AdminPanel.vue"
import HandleApplication from "@/views/recruiter/HandleApplication.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/logout",
      name: "logout",
      component: HomeView
    },
    {
      path: "/register",
      name: "register",
      component: ApplicantRegistrationView
    },
    {
      path: "/application",
      meta: {
        requiresAuth: true,
        requiredRole: "Applicant"
      },
      children: [
        { path: "", name: "application", component: ApplicationFormView },
        { path: "confirmation", component: ApplicationConfirmationView }
      ]
    },
    {
      path: "/recruitment",
      name: "recruitment",
      meta: {
        requiresAuth: true,
        requiredRole: "Recruiter"
      },
      children: [
        { path: "", name: "recruitment", component: AdminPanel },
        { path: "handle", component: HandleApplication }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { role } = useAuthStore()

  if (to.meta.requiresAuth) {
    if (canAccessAsRecruiter()) {
      next()
    } else if (canAccessAsApplicant()) {
      next()
    } else {
      next("/")
    }
  } else {
    if (isRecruiter()) {
      next("recruitment")
    } else if (isApplicant()) {
      next("application")
    } else {
      next()
    }
  }

  function isRecruiter(): boolean {
    return role === "Recruiter"
  }

  function isApplicant(): boolean {
    return role === "Applicant"
  }

  function canAccessAsRecruiter(): boolean {
    return to.meta.requiredRole === "Recruiter" && isRecruiter()
  }

  function canAccessAsApplicant(): boolean {
    return to.meta.requiredRole === "Applicant" && isApplicant()
  }
})

export default router
