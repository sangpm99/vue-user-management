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
            return response.status
        }
    } catch (err) {
        if (err instanceof Error) {
            console.log('Error fetching data', err)
            return (err as any).status
        }
    }
}

export default changePassword
