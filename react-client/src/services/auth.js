import http from "../http-common";

class AuthDataService {
    
    isAuthenticated(){
        return localStorage.getItem('access_token');
    }

    async login(data) {
        const res = await http
            .post("/auth/login", data);
        if (res.data.token) {
            localStorage.setItem('access_id', res.data.id);
            localStorage.setItem('access_token', res.data.token);
        }
        return res.data;
    }

    async logout() {
        const res = await http
            .post("/auth/logout");
        localStorage.removeItem('access_token');
        return res.data;
    }
    async changePassword(data){
        const res = await http
            .post("/auth/pwd/edit", data);
        return res;
    }
}

export default new AuthDataService();