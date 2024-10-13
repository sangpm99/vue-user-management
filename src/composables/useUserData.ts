import { getCookie } from '@/stores/userCookie'
import type { UserData } from '@/types/UserData'

const useUserData = () => {
    const dataJson = getCookie('User Data')
    const userData: UserData | null = dataJson ? JSON.parse(dataJson) : null
    return { userData }
}

export { useUserData }
