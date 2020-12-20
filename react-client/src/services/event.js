import http from "../http-common";

class EventDataService {
    getAll() {
        return http.get("/events");
    }

    get(id) {
        return http.get(`/events/${id}`);
    }

    create(data) {
        return http.post("/events", data);
    }

    update(id, data) {
        return http.put(`/events/${id}`, data);
    }

    delete(id) {
        return http.delete(`/events/${id}`);
    }

    deleteAll() {
        return http.delete(`/events`);
    }

    getToday() {
        return http.get(`/events/today`);
    }

    getUpcoming(){
        return http.get(`/events/upcoming`);
    }

    getFinished(){
        return http.get(`/events/finished`);
    }
    getTodayOrUpcoming(){
        return http.get(`/events/today-or-upcoming`);
    }

    getByMinistry(ministry_id){
        return http.get(`/events?ministry_id=${ministry_id}`);
    }
}

export default new EventDataService();