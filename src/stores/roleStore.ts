import axios from '@/plugins/axios'
import { defineStore } from 'pinia'
import { AxiosError } from 'axios'

export const useRoleStore = defineStore('role', () => {
    const getRoles = async (
        limitUsersPerRole?: Number,
        pageIndex?: Number,
        pageSize?: Number,
        searchValue?: string
    ): Promise<any> => {
        const slug = '/Role/GetRoles'

        const params = {
            limitUsersPerRole: limitUsersPerRole || 10,
            pageIndex: pageIndex || 1,
            pageSize: pageSize || 100,
            searchValue: searchValue || null
        }

        try {
            const response = await axios.get(slug, { params })
            return Promise.resolve(response)
        } catch (err) {
            return Promise.reject(err as AxiosError)
        }
    }

    const getRole = async(id: string): Promise<any> => {
        try {
            const res = await axios.get(`/Role/GetRole/${id}`)
            return res;
        } catch (err) {
            return Promise.reject(err as AxiosError);
        }
    }

    const getRolesName = async (pageIndex?: number, pageSize?: number): Promise<any> => {
        const params = {
            pageIndex,
            pageSize
        }

        try {
            const res = await axios.get('/Role/GetRoles', { params })
            const arr = []
            for (let i = 0; i < res.data.data?.items.length; i++) {
                arr.push(res.data.data?.items[i]?.name)
            }
            return Promise.resolve(arr)
        } catch (err) {
            return Promise.reject(err as AxiosError)
        }
    }

    const getPermissions = async (): Promise<any> => {
        try {
            const res = await axios.get('/Role/GetPermissions')
            return Promise.resolve(res)
        } catch (err) {
            return Promise.reject(err as AxiosError)
        }
    }

    const createRole = async (name: string, permissions: Array<string>): Promise<void> => {
        const body = {
            name,
            permissions
        }
        try {
            await axios.post('/Role/Create', body)
        } catch (err) {
            return Promise.reject(err as AxiosError)
        }
    }

    const updateRole = async(id: string, name: string, permissions: string[]): Promise<void> => {
        const body = {
            id,
            name,
            permissions
        }
        try {
            await axios.put('/Role/Update', body);
        } catch (err) {
            return Promise.reject(err as AxiosError);
        }
    }

    const deleteRole = async (id: string): Promise<void> => {
        try {
            await axios.delete(`/Role/Delete/${id}`)
        } catch (err) {
            return Promise.reject(err as AxiosError)
        }
    }

    return { getRoles, getRole, getPermissions, createRole, deleteRole, getRolesName, updateRole }
})
