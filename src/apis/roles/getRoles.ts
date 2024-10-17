import axios from '@/plugins/axios'

const getRoles = async (
    limitUsersPerRole?: Number,
    pageIndex?: Number,
    pageSize?: Number,
    searchValue?: string
) => {
    const slug = '/Role/GetRoles'

    const params = {
        limitUsersPerRole: limitUsersPerRole || 10,
        pageIndex: pageIndex || 1,
        pageSize: pageSize || 100,
        searchValue: searchValue || null
    }

    try {
        const response = await axios.get(slug, { params })

        if (response.status === 200) {
            return response.data
        }
    } catch (err) {
        console.log('Lỗi fetch dữ liệu:', err)
        return null
    }
}

export default getRoles
