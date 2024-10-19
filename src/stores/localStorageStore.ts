import { defineStore } from 'pinia'
import { type UserData } from '@/types/UserData';

// Local Storage
export const useLocalStorageStore = defineStore('local storage', () => {
    const localStorageName: string = 'User Data';

    const setUserData = (value: UserData) => {
        localStorage.setItem(localStorageName, JSON.stringify(value));
    }

    const getUserData = () => {
        return localStorage.getItem(localStorageName);
    }

    const delUserData = () => {
        return localStorage.removeItem(localStorageName);
    }

    return {setUserData, getUserData, delUserData}
})