import axios from '@/plugins/axios'

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
) => {
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

        const response = await axios.post(`/User/Create`, body)

        if (response.status === 200) {
            return response.data
        }
    } catch (err) {
        console.log('Lỗi fetch dữ liệu:', err)
        return null
    }
}

export default createUser
