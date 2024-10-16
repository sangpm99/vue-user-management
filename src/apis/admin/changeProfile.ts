import axios from '@/plugins/axios';

const changeProfile = async (
    fullName: string,
    userName: string,
    email: string,
    phoneNumber: string,
    address: string,
    department: string ) => {
    try {
        const response = await axios.put('User/ChangeProfile', {
            fullName,
            userName,
            email,
            phoneNumber,
            address,
            department
        })

        if(response.status === 200) {
            return response.status
        }
    } catch (err) {
        console.log("An error occurred, please try again later", err)
        return null;
    }
}

export default changeProfile;