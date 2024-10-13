import axios from '@/plugins/axios'

const recoverPassword = async (
    email: string,
    newPassword: string,
    confirmNewPassword: string,
    token: string,
    reCaptcha: string
) => {
    if (newPassword === confirmNewPassword) {
        const slug = '/Authorize/RecoverPassword'
        try {
            const response = await axios.post(slug, {
                email,
                newPassword,
                confirmNewPassword,
                token,
                reCaptcha
            })

            if (response.status === 200) {
                console.log(response.data)
                alert('Password Has Change Successfully')
                window.location.href = '/authorize/signin'
            }
        } catch (err) {
            console.log('Lỗi fetch dữ liệu')
        }
        return false
    } else {
        return true
    }
}

export default recoverPassword
