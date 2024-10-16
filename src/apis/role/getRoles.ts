import axios from '@/plugins/axios'

const getRoles = async (id: string) => {
    const slug = '/Role/GetRoles'

    try {
        const response = await axios.get(`${slug}/?id=${id}`)

        if (response.status === 200) {
            return response.data
        }
    } catch (err) {
        console.log('Lỗi fetch dữ liệu:', err)
        return null
    }
}

export default getRoles
