export const useMyFetch =  (request, options) => {
    const config = useRuntimeConfig()
    const router = useRouter()

    return  useFetch(request, {
        baseURL: config.apiUrl,
       
        ...options,
    })
}