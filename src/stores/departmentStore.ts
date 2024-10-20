import { defineStore } from 'pinia'

export const useDepartmentStore = defineStore('department', () => {
    const getDepartment = (): string[] => {
        return [
            'CEO',
            'ASSISTANCE',
            'SALE',
            'DESIGN',
            'DESIGN_MANAGER',
            'ACCOUNTING',
            'FULFILLMENT',
            'CUSTOMER_SERVICE',
            'SUPPORT',
            'IT',
            'BUILD_ACC'
        ]
    }

    return { getDepartment }
})
