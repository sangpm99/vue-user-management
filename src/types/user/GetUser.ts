export interface GetUser {
    id: string | null
    fullName: string | null
    avatar: string | null
    department: string | null
    address: string | null
    userName: string | null
    email: string | null
    emailConfirmed: boolean
    phoneNumber: string | null
    phoneNumberConfirmed: false
    twoFactorEnabled: false
    roles: string[]
    permissions: string[]
    token: string | null
    expiration: string | null
}
