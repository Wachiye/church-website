import http from "../http-common";

class SermonDataService {
    getAll() {
        return http.get("/sermons");
    }

    get(id) {
        return http.get(`/sermons/${id}`);
    }

    create(data) {
        return http.post("/sermons", data);
    }

    update(id, data) {
        return http.put(`/sermons/${id}`, data);
    }

    delete(id) {
        return http.delete(`/sermons/${id}`);
    }

    deleteAll() {
        return http.delete(`/sermons`);
    }

}

export default new SermonDataService();