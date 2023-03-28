export const useMyFetch = (request, options) => {
    const config = useRuntimeConfig()

    return useFetch(request, {
        baseURL: config.apiUrl,
        onResponseError({ request, response, options }) {
            navigateTo('/')
        },
        ...options,
    })
}