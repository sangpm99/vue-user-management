import { defineStore } from 'pinia'
import { AxiosError } from 'axios'
import { ref, type Ref } from 'vue'
import { useLocalStorageStore } from './localStorageStore'
import axios from '@/plugins/axios'
import { type UserData } from '@/types/UserData'

export const useUserStore = defineStore('users', () => {
    // Properties
    const isLoading: Ref<boolean> = ref(false)
    const localStorageStore = useLocalStorageStore()

    // Actions

    const changeProfile = async (
        userName: string,
        email: string,
        fullName?: string,
        phoneNumber?: string,
        address?: string,
        department?: string
    ): Promise<any> => {
        try {
            await axios.put('User/ChangeProfile', {
                fullName,
                userName,
                email,
                phoneNumber,
                address,
                department
            })
        } catch (err) {
            return err
        }
    }

    const changePassword = async (
        oldPassword: string,
        newPassword: string,
        confirmNewPassword: string
    ): Promise<any> => {
        const slug = '/User/ChangePassword'

        try {
            await axios.put(slug, {
                oldPassword,
                newPassword,
                confirmNewPassword
            })
        } catch (err) {
            return err
        }
    }

    const getCurrentUser = () => {
        const currentUser = localStorageStore.getUserData()
        if (currentUser) {
            const data: UserData = JSON.parse(currentUser)
            return data
        }
        return null
    }

    const getUser = async (id: string): Promise<any> => {
        const slug = '/User/GetUser'
        try {
            const response: UserData = await axios.get(`${slug}/?id=${id}`)
            return response
        } catch (err) {
            return err
        }
    }

    const getUsers = async (pageIndex: number, pageSize: number): Promise<any> => {
        try {
            const params = {
                pageIndex,
                pageSize
            }

            const response = await axios.get(`/User/GetUsers`, { params })
            return response
        } catch (err) {
            return err
        }
    }

    const updateUser = async (
        id: string,
        email: string,
        userName: string,
        fullName: string,
        address: string,
        phoneNumber: string,
        department: string,
        roles: Array<any>
    ): Promise<any> => {
        try {
            const body = { id, email, userName, fullName, address, phoneNumber, department, roles }
            await axios.put('/User/Update', body)
        } catch (err) {
            return err
        }
    }

    const getActivities = async (
        id: string,
        pageIndex?: number,
        pageSize?: number
    ): Promise<any> => {
        const params = {
            pageIndex,
            pageSize
        }
        try {
            const request = await axios.get(`/User/GetActivity/${id}`, { params })
            return Promise.resolve(request)
        } catch (err) {
            return err
        }
    }

    const revokeAllTokens = async (signInAt: string): Promise<any> => {
        try {
            await axios.put(`/User/RevokeAllTokens/${signInAt}`)
        } catch (err) {
            return err
        }
    }

    const revokeToken = async (id: string, signInAt: string): Promise<any> => {
        try {
            await axios.put(`/User/RevokeToken/${id}/${signInAt}`)
        } catch (err) {
            return err
        }
    }

    const createUser = async (
        email: string,
        userName: string,
        password: string,
        confirmPassword: string,
        fullName: string,
        phoneNumber?: string,
        address?: string,
        department?: string,
        roles?: Array<any>
    ): Promise<any> => {
        try {
            const body = {
                email,
                userName,
                password,
                confirmPassword,
                fullName,
                phoneNumber: phoneNumber || '',
                address: address || '',
                department: department || '',
                roles: roles || []
            }

            await axios.post(`/User/Create`, body)
        } catch (err) {
            return err
        }
    }

    const deleteUser = async (id: string): Promise<any> => {
        try {
            await axios.delete(`/User/Delete/${id}`)
        } catch (err) {
            return err
        }
    }

    const getAllUser = async (): Promise<any> => {
        try {
            const params = {
                pageIndex: 1,
                pageSize: 20
            }

            const response = await axios.get(`/User/GetUsers`, { params })
            return Promise.resolve(response)
        } catch (err) {
            return err
        }
    }

    const toggleTwoFactor = async () => {
        try {
            await axios.get('/User/ChangeTwoFactor')
        } catch (err) {
            return err
        }
    }

    const changeTwoFactor = async (verifyCode: string): Promise<any> => {
        try {
            await axios.put(`/User/ChangeTwoFactor/${verifyCode}`)
        } catch (err) {
            return err
        }
    }

    return {
        getUsers,
        changePassword,
        changeProfile,
        getCurrentUser,
        isLoading,
        updateUser,
        getActivities,
        revokeAllTokens,
        revokeToken,
        createUser,
        deleteUser,
        getAllUser,
        getUser,
        toggleTwoFactor,
        changeTwoFactor
    }
})
