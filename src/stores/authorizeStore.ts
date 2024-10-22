import { defineStore } from 'pinia'
import axios, { ejectInterceptors, registerInterceptors } from '@/plugins/axios'

export const useAuthorizeStore = defineStore('authorize', () => {
    const signIn = async (
        email: string,
        password: string,
        reCaptcha: string,
        rememberMe: boolean
    ): Promise<any> => {
        const slug = '/id/Authorize/SignIn'
        try {
            ejectInterceptors()
            const response = await axios.post(slug, {
                email,
                password,
                reCaptcha,
                rememberMe
            })

            registerInterceptors()
            return response
        } catch (err) {
            return err
        }
    }

    const recoverPassword = async (
        email: string,
        newPassword: string,
        confirmNewPassword: string,
        token: string,
        reCaptcha: string
    ): Promise<any> => {
        if (newPassword === confirmNewPassword) {
            const slug = '/id/Authorize/RecoverPassword'
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
                return err
            }
        } else {
            return Promise.reject()
        }
    }

    const forgotPassword = async (email: string, reCaptcha: string): Promise<any> => {
        const slug = '/id/Authorize/ForgotPassword'
        try {
            return await axios.post(slug, {
                email,
                reCaptcha
            })
        } catch (err) {
            return err
        }
    }

    const twoFactor = async (
        email: string,
        token: string,
        twoFactorCode: string,
        rememberMe?: boolean
    ): Promise<any> => {
        const body = {
            email,
            token,
            twoFactorCode,
            rememberMe: rememberMe || false
        }
        try {
            return await axios.post('/id/Authorize/TwoFactor', body)
        } catch (err) {
            return err
        }
    }

    const signOut = async(): Promise<any> => {
        try {
            await axios.post('/id/Authorize/SignOut');
        } catch (err) {
            return err;
        }
    }

    return { signIn, recoverPassword, forgotPassword, twoFactor, signOut }
})
