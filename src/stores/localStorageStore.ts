import { defineStore } from 'pinia'
import { type UserData } from '@/types/UserData'

// Local Storage
export const useLocalStorageStore = defineStore('local storage', () => {
    const localStorageName: string = 'User Data'

    const setUserData = (value: UserData) => {
        localStorage.setItem(localStorageName, JSON.stringify(value))
    }

    const getUserData = () => {
        return localStorage.getItem(localStorageName)
    }

    const delUserData = () => {
        localStorage.removeItem(localStorageName)
        window.location.href = '/authorize/signin'
    }

    return { setUserData, getUserData, delUserData }
})
