import axios from '@/plugins/axios'
import { setCookie } from '@/stores/userCookie'

const signIn = async (email: string, password: string) => {
    const slug = '/accounts';
        try {
        const response = await axios.get(`${slug}?email=eq.${email}&password=eq.${password}`, {
            headers: {
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3cGR6Z3h4bGt6YmtyaWp3c2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4MDc0MTAsImV4cCI6MjA0NDM4MzQxMH0.9Qimpm_zhXZL_lMZWglLF6ZSdy09H3b62B5dHnd8hEE'
            }
        })

        if (response.status === 200) {
            if (Array.isArray(response.data) && response.data.length > 0) {
                setCookie('User Data', response.data, 1);
                window.location.href = '/';
            } else {
                alert("Email or password incorrect")
            }
        }
    } catch (err) {
        console.log('Lỗi fetch dữ liệu')
    }
}

export default signIn
