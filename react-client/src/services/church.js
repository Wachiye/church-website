import http from "../http-common";

class ChurchDataService {
    getAll() {
        return http.get("/church");
    }

    get(id) {
        return http.get(`/church/${id}`);
    }

    create(data) {
        return http.post("/church", data);
    }

    update(id, data) {
        return http.put(`/church/${id}`, data);
    }

    delete(id) {
        return http.delete(`/church/${id}`);
    }

    deleteAll() {
        return http.delete(`/church`);
    }

}

export default new ChurchDataService();