export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useCurrentUserStore();
    console.log(to from.)
    if (!userStore.isLogged) {
        
        return navigateTo('/login')
        // return createError({
        //     fatal: true,
        //     statusCode: 403,
        //     statusMessage: "Kd boleh"
        // })
    }
})  
