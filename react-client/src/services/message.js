import http from "../http-common";

class MessageDataService {
    getAll() {
        return http.get("/messages");
    }

    get(id) {
        return http.get(`/messages/${id}`);
    }

    create(data) {
        return http.post("/messages", data);
    }

    update(id, data) {
        return http.put(`/messages/${id}`, data);
    }

    delete(id) {
        return http.delete(`/messages/${id}`);
    }

    deleteAll() {
        return http.delete(`/messages`);
    }

    getToday() {
        return http.get(`/messages/today`);
    }
}

export default new MessageDataService();