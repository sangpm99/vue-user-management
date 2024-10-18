import axios from '@/plugins/axios'

const changeProfile = async (
    userName: string,
    email: string,
    fullName?: string,
    phoneNumber?: string,
    address?: string,
    department?: string
) => {
    try {
        const response = await axios.put('User/ChangeProfile', {
            fullName,
            userName,
            email,
            phoneNumber,
            address,
            department
        })

        return response.data;
    } catch (err) {
        console.log('An error occurred, please try again later', err)
        return false;
    }
}

export default changeProfile