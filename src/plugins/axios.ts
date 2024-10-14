import axios from 'axios'
import { useUserData } from '@/composables/useUserData'

const { userData } = useUserData()

axios.defaults.baseURL = 'https://api.cyberonegate.com/id'

axios.interceptors.request.use(
    (config) => {
        const token = userData?.data.token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axios
