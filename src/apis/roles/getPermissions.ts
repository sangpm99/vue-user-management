import axios from '@/plugins/axios'

const getPermissions = async () => {
    const slug = '/Role/GetPermissions'

    try {
        const response = await axios.get(slug)

        if (response.status === 200) {
            return response.data
        }
    } catch (err) {
        console.log('Lỗi fetch dữ liệu:', err)
        return null
    }
}

export default getPermissions
