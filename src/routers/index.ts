import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/authorize/signin'
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
        },
        {
            path: '/admin/',
            component: AdminLayout,
            name: 'admin',
            children: [
                {
                    path: 'myprofile',
                    name: 'my profile',
                    component: () => import('../views/admin/MyProfile.vue')
                },
                {
                    path: 'changepassword',
                    name: 'Change Password',
                    component: () => import('../views/admin/ChangePassword.vue')
                },
                {
                    path: 'user',
                    name: 'User',
                    component: () => import('../views/admin/User.vue')
                }
            ]
        }
    ]
})

export default router
