import axios from '@/plugins/axios'

const getUser = async (id: string) => {
    const slug = '/User/GetUser'

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

export default getUser
