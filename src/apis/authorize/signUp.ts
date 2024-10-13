import axios from '@/plugins/axios'

const signUp = async (
    userName: string,
    email: string,
    password: string,
    confirmPassword: string,
    reCaptcha: string
) => {
    const slug = '/Authorize/SignUp'
    try {
        const response = await axios.post(slug, {
            userName,
            email,
            password,
            confirmPassword,
            reCaptcha
        })

        if (response.status === 200) {
            console.log(response.data)
        }
    } catch (err) {
        console.log('Lỗi fetch dữ liệu')
    }
}

export default signUp
