import axios from '@/plugins/axios'
import { getCookie } from '@/stores/userCookie';
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue';

export const useUserStore = defineStore('users', () => {
    // Properties
    const isLoading: Ref<boolean> = ref(false);

    // Actions
    const getUsers = async (pageIndex: number, pageSize: number) => {
        try {
            const params = {
                pageIndex,
                pageSize
            }

            const response = await axios.get(`/User/GetUsers`, {
                params
            })

            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            return null
        }
    }

    const getCurrentUser = computed(() => {
        const currentUser = getCookie('User Data');
        return currentUser ? JSON.parse(currentUser) : null;
    })

    const updateUser = async(
        id: string,
        email: string,
        userName: string,
        fullName: string,
        address: string,
        phoneNumber: string,
        department: string,
        roles: Array<any> ) => {
            try {
                const body = { id, email, userName, fullName, address, phoneNumber, department, roles }
                const request = await axios.put('/User/Update', body)
                return request.status;
            } catch (err) {
                console.log(err);
                return false;
            } finally {

            }
    }

    const getRolesName = async(pageIndex?: number, pageSize?: number) => {
        const params = {
            pageIndex,
            pageSize
        }

        try {
            const res = await axios.get('/Role/GetRoles',{params})
            const arr = [];
                for(let i = 0; i < res.data.data?.items.length; i++) {
                    arr.push(res.data.data?.items[i]?.name);
                }
            return arr;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    const getActivities = async(
        id: string,
        pageIndex?: number,
        pageSize?: number) => {
            const params = {
                pageIndex,
                pageSize
            }
            try {
                const request = await axios.get(`/User/GetActivity/${id}`, {params})
                return request.data;

            } catch (err) {
                console.log(err);
                return false;
            } finally {

            }
        }

    const revokeAllTokens = async(signInAt: string) => {
        try {
            return await axios.put(`/User/RevokeAllTokens/${signInAt}`)
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    const revokeToken = async(id: string, signInAt: string) => {
        try {
            const res = await axios.put(`/User/RevokeToken/${id}/${signInAt}`)
            return res.data;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    return { getUsers, getCurrentUser, isLoading, updateUser, getActivities, revokeAllTokens, revokeToken, getRolesName}
})
