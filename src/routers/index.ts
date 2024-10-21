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
                    path: 'overview',
                    name: 'overview',
                    component: () => import('../views/admin/Overview.vue')
                },
                {
                    path: 'myprofile',
                    name: 'my profile',
                    component: () => import('../views/users/MyProfile.vue')
                }
            ]
        },
        {
            path: '/users/',
            component: AdminLayout,
            name: 'users',
            children: [
                {
                    path: 'getusers',
                    name: 'get users',
                    component: () => import('../views/users/GetUsers.vue')
                }
            ]
        },
        {
            path: '/roles/',
            component: AdminLayout,
            name: 'roles',
            children: [
                {
                    path: 'getroles',
                    name: 'get roles',
                    component: () => import('../views/roles/GetRoles.vue')
                }
            ]
        }
    ]
})

export default router
