import axios from '@/plugins/axios'

const getUser = async (id: string) => {
    const slug = '/User/GetUser'

    try {
        const response = await axios.get(`${slug}/?id=${id}`)

        // 200, 201, 204, 
        return response.data
    } catch (err) {
        console.log('Lỗi fetch dữ liệu:', err)
        return null
    } finally{
    }
}

export default getUser
