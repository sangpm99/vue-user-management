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

    return { getUsers, getCurrentUser, isLoading, updateUser}
})
