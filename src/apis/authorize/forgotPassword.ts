import axios from '@/plugins/axios'
import { setCookie } from '@/stores/userCookie'
import router from '@/routers'

const forgotPassword = async (email: string, reCaptcha: string) => {
    const slug = '/Authorize/ForgotPassword'
    try {
        const response = await axios.post(slug, {
            email,
            reCaptcha
        })

        if (response.status === 200) {
            router.push({
                path: '/authorize/recoverpassword',
                query: { email }
            })
        }
    } catch (err) {
        console.log('Lỗi fetch dữ liệu')
    }
    return null
}

export default forgotPassword
