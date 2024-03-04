import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/applicant/ApplicantLoginView.vue";
import ApplicantRegistrationView from "@/views/applicant/ApplicantRegistrationView.vue";
import ApplicationFormView from "@/views/applicant/ApplicationFormView.vue";
import { useAuthStore } from "@/stores/auth";
import ApplicationConfirmationView from "@/views/applicant/ApplicationConfirmationView.vue";
import AdminPanel from "@/views/recruiter/AdminPanel.vue";
import HandleApplication from "@/views/recruiter/HandleApplication.vue";
import ApplicantPasswordResetView from "@/views/applicant/ApplicantPasswordResetView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: LoginView
    },
    {
      path: "/login",
      name: "home",
      meta: {
        authenticatedPage: false
      },
      component: LoginView
    },
    {
      path: "/logout",
      name: "logout",
      meta: {
        authenticatedPage: true
      },
      component: LoginView
    },
    {
      path: "/register",
      name: "register",
      meta: {
        authenticatedPage: false
      },
      component: ApplicantRegistrationView
    },
    {
      path: "/password-reset",
      name: "password-reset",
      meta: {
        authenticatedPage: false
      },
      component: ApplicantPasswordResetView
    },
    {
      path: "/application",
      name: "application",
      meta: {
        authenticatedPage: true,
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
        authenticatedPage: true,
        requiredRole: "Recruiter"
      },
      children: [
        { path: "", name: "recruitment", component: AdminPanel },
        { path: "handle", component: HandleApplication }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  function isRecruiter(): boolean {
    return auth.role === "Recruiter";
  }

  function isApplicant(): boolean {
    return auth.role === "Applicant";
  }

  function isLoggedIn(): boolean {
    return isRecruiter() || isApplicant();
  }

  function canAccess(): boolean {
    return (
      (to.meta.requiredRole === "Recruiter" && isRecruiter()) || (to.meta.requiredRole === "Applicant" && isApplicant())
    );
  }

  function navigateDefault() {
    if (isRecruiter()) {
      next("/recruitment");
    } else if (isApplicant()) {
      next("/application");
    } else {
      next("/login");
    }
  }

  // Route not found
  if (to.path === "/" || to.matched.length === 0) {
    navigateDefault();
  } else if (isLoggedIn() && to.meta.authenticatedPage) {
    if (canAccess()) {
      next();
    } else {
      auth.logout();
      navigateDefault();
    }
  } else if (!isLoggedIn() && !to.meta.authenticatedPage) {
    next();
  } else {
    navigateDefault();
  }
});

export default router;
