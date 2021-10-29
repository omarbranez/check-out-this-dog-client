export const isUserLoggedIn = () => {
    if (localStorage.getItem('token')) {
        return true 
    } else {
        return false}
}