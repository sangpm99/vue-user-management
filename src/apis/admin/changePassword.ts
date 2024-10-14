import axios from '@/plugins/axios'

const changePassword = async (
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string
) => {
    const slug = '/User/ChangePassword'

    try {
        const response = await axios.put(slug, {
            oldPassword,
            newPassword,
            confirmNewPassword
        })

        if (response.status === 200) {
            alert('Password has changed successfully!')
            return response.data
        }
    } catch (err) {
        console.log('Lỗi fetch dữ liệu:', err)
        return null
    }
}

export default changePassword
