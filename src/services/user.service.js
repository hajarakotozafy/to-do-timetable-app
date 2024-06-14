import axios from "axios";

const API_URL = '';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }
    getUserBoard() {
        return axios.get(API_URL + 'user')
    }
}

export default new UserService();