import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/test/';
const CONFIG = require("../config/config");
class UserService {
    getPublicContent() {
        return axios.get(CONFIG.API_URL + '/test/all');
    }
    getUserBoard() {
        return axios.get(CONFIG.API_URL + '/test/user', { headers: authHeader() });
    }
    getModeratorBoard() {
        return axios.get(CONFIG.API_URL + '/test/mod', { headers: authHeader() });
    }
    getAdminBoard() {
        return axios.get(CONFIG.API_URL + '/test/admin', { headers: authHeader() });
    }
}
export default new UserService();