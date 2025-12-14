import axios, { AxiosInstance, AxiosResponse, isAxiosError } from 'axios'

export const baseURL = process.env.NEXT_PUBLIC_API_URL
// Create a new Axios instance
const instance: AxiosInstance = axios.create({
    baseURL,
    timeout: 60 * 1000,
})

// Set up an interceptor to intercept all requests
instance.interceptors.request.use(
    async (config) => {
        // config can be modified before sending the request
        // Add an authentication token to the request

        return config
    },
    (error) => {
        console.log('error>', error)
        // Handle errors when an error occurs before sending the request
        return error
    }
)

// Set up an interceptor to intercept all responses
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        // After receiving the response, the response can be modified
        return response
    },
    (error) => {
        if (isAxiosError(error)) {
            return Promise.reject(error.response?.data)
        }
        return Promise.reject(error)
    }
)

export default instance
