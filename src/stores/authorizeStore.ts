import { defineStore } from 'pinia'
import axios, {ejectInterceptors, registerInterceptors} from '@/plugins/axios'
import { AxiosError } from 'axios';
import router from '@/routers'
import { useLocalStorageStore } from './localStorageStore';

export const useAuthorizeStore = defineStore('authorize', () => {
    const localStorageStore = useLocalStorageStore();

    const signIn = async (email: string, password: string, reCaptcha: string, rememberMe: boolean): Promise<void> => {
        const slug = '/Authorize/SignIn'
        try {
            ejectInterceptors();
            const response = await axios.post(slug, {
                email,
                password,
                reCaptcha,
                rememberMe
            })

            localStorageStore.setUserData(response.data.data);
            registerInterceptors();
            window.location.href = '/admin/overview'
        } catch (err) {
            return Promise.reject(err as AxiosError);
        }
    }

    const signUp = async (
        userName: string,
        email: string,
        password: string,
        confirmPassword: string,
        reCaptcha: string
    ): Promise<void> => {
        const slug = '/Authorize/SignUp'
        try {
            await axios.post(slug, {
                userName,
                email,
                password,
                confirmPassword,
                reCaptcha
            })
        } catch (err) {
            return Promise.reject(err as AxiosError);
        }
    }

    const recoverPassword = async (
        email: string,
        newPassword: string,
        confirmNewPassword: string,
        token: string,
        reCaptcha: string
    ): Promise<void> => {
        if (newPassword === confirmNewPassword) {
            const slug = '/Authorize/RecoverPassword'
            try {
                await axios.post(slug, {
                    email,
                    newPassword,
                    confirmNewPassword,
                    token,
                    reCaptcha
                    })
                window.location.href = '/authorize/signin'
            } catch (err) {
                return Promise.reject(err as AxiosError)
            }
        } else {
            return Promise.reject();
        }
    }

    const forgotPassword = async (email: string, reCaptcha: string) => {
        const slug = '/Authorize/ForgotPassword'
        try {
            await axios.post(slug, {
                email,
                reCaptcha
            })
    
            router.push({
                path: '/authorize/recoverpassword',
                query: { email }
            })

        } catch (err) {
            return Promise.reject(err as AxiosError);
        }
    }

    return {signIn, signUp, recoverPassword, forgotPassword}
})