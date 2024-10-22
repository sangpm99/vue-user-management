import axios from '@/plugins/axios'
import { defineStore } from 'pinia'

export const useRoleStore = defineStore('role', () => {
    const getRoles = async (
        limitUsersPerRole?: Number,
        pageIndex?: Number,
        pageSize?: Number,
        searchValue?: string
    ): Promise<any> => {
        const slug = '/id/Role/GetRoles'

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
            return err
        }
    }

    const getRole = async (id: string): Promise<any> => {
        try {
            const res = await axios.get(`/id/Role/GetRole/${id}`)
            return res
        } catch (err) {
            return err
        }
    }

    const getRolesName = async (pageIndex?: number, pageSize?: number): Promise<any> => {
        const params = {
            pageIndex,
            pageSize
        }

        try {
            const res = await axios.get('/id/Role/GetRoles', { params })
            const arr = []
            for (let i = 0; i < res.data.data?.items.length; i++) {
                arr.push(res.data.data?.items[i]?.name)
            }
            return Promise.resolve(arr)
        } catch (err) {
            return err
        }
    }

    const getPermissions = async (): Promise<any> => {
        try {
            const res = await axios.get('/id/Role/GetPermissions')
            return Promise.resolve(res)
        } catch (err) {
            return err
        }
    }

    const createRole = async (name: string, permissions: Array<string>): Promise<any> => {
        const body = {
            name,
            permissions
        }
        try {
            await axios.post('/id/Role/Create', body)
        } catch (err) {
            return err
        }
    }

    const updateRole = async (id: string, name: string, permissions: string[]): Promise<any> => {
        const body = {
            id,
            name,
            permissions
        }
        try {
            await axios.put('/id/Role/Update', body)
        } catch (err) {
            return err
        }
    }

    const deleteRole = async (id: string): Promise<any> => {
        try {
            await axios.delete(`/id/Role/Delete/${id}`)
        } catch (err) {
            return err
        }
    }

    return { getRoles, getRole, getPermissions, createRole, deleteRole, getRolesName, updateRole }
})
