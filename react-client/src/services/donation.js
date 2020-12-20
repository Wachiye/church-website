import http from "../http-common";

class DonationDataService {
    pay(data) {
        return http.post("/donations/pay", data);
    }

    create(data) {
        return http.post("/donations", data);
    }
    
    getAll() {
        return http.get("/donations");
    }

    get(id) {
        return http.get(`/donations/${id}`);
    }

    

    update(id, data) {
        return http.put(`/donations/${id}`, data);
    }

    delete(id) {
        return http.delete(`/donations/${id}`);
    }

    deleteAll() {
        return http.delete(`/donations`);
    }

    getToday() {
        return http.get(`/donations/today`);
    }

    getByDonationId(Donation_id){
        return http.get(`/donations?Donation_id=${Donation_id}`)
    }

    getByType(type){
        return http.get(`/donations?type=${type}`)
    }
}

export default new DonationDataService();