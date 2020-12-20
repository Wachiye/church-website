import http from "../http-common";

class MinistryDataService {
    getAll() {
        return http.get("/ministries");
    }

    get(id) {
        return http.get(`/ministries/${id}`);
    }

    create(data) {
        return http.post("/ministries", data);
    }

    update(id, data) {
        return http.put(`/ministries/${id}`, data);
    }

    delete(id) {
        return http.delete(`/ministries/${id}`);
    }

    deleteAll() {
        return http.delete(`/ministries`);
    }
}

export default new MinistryDataService();