// NOT USE
import axios from '@/plugins/axios'

const getAllUser = async () => {
    try {
        const params = {
            pageIndex: 1,
            pageSize: 20
        }

        const response = await axios.get(`/User/GetUsers`, {
            params
        })

        if (response.status === 200) {
            return response.data
        }
    } catch (err) {
        console.log('Lỗi fetch dữ liệu:', err)
        return null
    }
}

export default getAllUser
