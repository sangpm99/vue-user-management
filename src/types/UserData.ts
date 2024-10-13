export interface UserData {
    data: {
        id: string
        fullName: string
        avatar: null | string
        department: string
        address: null | string
        userName: string
        email: string
        emailConfirmed: boolean
        phoneNumber: null | string
        phoneNumberConfirmed: boolean
        twoFactorEnabled: boolean
        roles: Array<string>
        permissions: Array<string>
        token: string
    }
    success: boolean
}
