import axios from 'axios'
import { useUserStore } from '@/stores/userStore'

axios.defaults.baseURL = 'https://api.cyberonegate.com/id'
let requestInterceptorId: number | null = null

export const registerInterceptors = () => {
    requestInterceptorId = axios.interceptors.request.use(
        (config) => {
            const userStore = useUserStore()
            const currentUser = userStore.getCurrentUser()
            const token = currentUser?.token
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`
            }
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )
}

export const ejectInterceptors = () => {
    if (requestInterceptorId !== null) {
        axios.interceptors.request.eject(requestInterceptorId)
        requestInterceptorId = null
    }
}

registerInterceptors()

export default axios
