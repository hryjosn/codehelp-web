import fetchApi from '~/utils/fetch'

export const callGetUserInfoHandler = async () => {
    try {
        const res = await fetchApi({
            url: '/api/user/getUserInfo',
            method: 'GET',
        })

        return res
    } catch (error) {
        console.error('Error fetching user info:', error)
        throw error
    }
}
