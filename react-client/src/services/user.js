import http from "../http-common";

class UserDataService {
    getAll() {
        return http.get("/users");
    }

    get(id) {
        return http.get(`/users/${id}`);
    }

    create(data) {
        return http.post("/users", data);
    }

    update(id, data) {
        return http.put(`/users/${id}`, data);
    }

    delete(id) {
        return http.delete(`/users/${id}`);
    }

    deleteAll() {
        return http.delete(`/users`);
    }

    getToday() {
        return http.get(`/users/today`);
    }

    getByRole(role){
        return http.get(`/users?role=${role}`)
    }

    getByType(type){
        return http.get(`/users?type=${type}`)
    }
    
    changePassword(id, data){
        return http.post(`/users/${id}/change-password`, data)
    }
    removeImage(id, data){
        return http.post(`/users/${id}/remove-image`, data)
    }
}

export default new UserDataService();