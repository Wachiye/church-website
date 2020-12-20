export function requireAuth() {
   if(localStorage.getItem('access_token') !== null)
        return true;
    else
        return false;
}
export default requireAuth;