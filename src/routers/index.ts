import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '',
            name: 'home',
            component: DefaultLayout,
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: () => import('../views/pages/Home.vue')
                },
                {
                    path: 'shop',
                    name: 'shop',
                    component: () => import('../views/pages/Shop.vue')
                },
                {
                    path: 'about',
                    name: 'about',
                    component: () => import('../views/pages/About.vue')
                },
                {
                    path: 'blog',
                    name: 'blog',
                    component: () => import('../views/pages/Blog.vue')
                },
                {
                    path: 'contact',
                    name: 'contact',
                    component: () => import('../views/pages/Contact.vue')
                }
            ]
        },
        {
            path: '/authorize/',
            component: AuthLayout,
            name: 'authorize',
            children: [
                {
                    path: 'signin',
                    name: 'sign in',
                    component: () => import('../views/authorize/SignIn.vue')
                },
                {
                    path: 'signup',
                    name: 'sign up',
                    component: () => import('../views/authorize/SignUp.vue')
                },
                {
                    path: 'forgotpassword',
                    name: 'forgot password',
                    component: () => import('../views/authorize/ForgotPassword.vue')
                },
                {
                    path: 'recoverpassword',
                    name: 'recover password',
                    component: () => import('../views/authorize/RecoverPassword.vue')
                }
            ]
        }
    ]
})

export default router
