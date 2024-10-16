import axios from '@/plugins/axios'
import { defineStore } from "pinia";

export const useUserStore = defineStore('users', () => {
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

    return {getUsers}
})