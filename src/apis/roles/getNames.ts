import axios from '@/plugins/axios'

const getNames = async (pageIndex?: Number, pageSize?: Number) => {
    const slug = '/Role/GetRoles'

    const params = {
        pageIndex: pageIndex || 1,
        pageSize: pageSize || 20
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

export default getNames
