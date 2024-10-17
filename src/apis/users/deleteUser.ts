// Note: Can't Delete Myself
import axios from '@/plugins/axios'

const deleteUser = async (id: string) => {
    try {
        const response = await axios.delete(`/User/Delete/${id}`)

        if (response.status === 200) {
            return response.data
        }
    } catch (err) {
        console.log('Lỗi fetch dữ liệu:', err)
        return null
    }
}

export default deleteUser
