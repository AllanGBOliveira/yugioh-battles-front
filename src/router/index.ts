import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/auth/AuthView.vue'
import LoginView from '@/views/auth/login/LoginView.vue'
// import IndexGameView from '@/views/GameView/Index-game-view.vue'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,

      children: [
        {
          path: 'login',
          name: 'login',
          component: LoginView
        }
      ]
    },
    {
      path: '/game',
      name: 'game',
      // route level code-splitting
      // this generates a separate chunk (Dashboard.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GameView/Index-game-view.vue')
    },
    {
      path: '/error',
      name: 'error',
      // route level code-splitting
      // this generates a separate chunk (Dashboard.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ErrorsView.vue')
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

router.beforeEach(async (to, from) => {
  const useAuth = useAuthStore()

  const errors = computed(() => useAuth?.errors ?? null)
  const loading = computed(() => useAuth?.loading ?? false)
  const token = computed(() => useAuth?.token ?? null)
  const isAuthenticated = computed(() => useAuth?.isAuthenticated() ?? false)
  console.log(isAuthenticated.value)
  console.log('AQUI')

  if (
    // make sure the user is authenticated
    !isAuthenticated.value &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'login'
  ) {
    // redirect the user to the login page
    return { name: 'login' }
  }
})
export default router
