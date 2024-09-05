const API_URL = process.env.NEXT_PUBLIC_API_URL

interface IParams {
    apiEndpoint: string
    id?: string
    pageParams?: { page: string; count: string }
}

export const formatFullURL = ({
    apiEndpoint,
    id = '',
    pageParams,
}: IParams) => {
    let requestURL = new URL(API_URL!)
    if (pageParams) {
        const searchParams = new URLSearchParams({
            ...pageParams,
        })
        requestURL.search = searchParams.toString()
    }
    requestURL.pathname = `${apiEndpoint}/${id}`
    return requestURL
}
