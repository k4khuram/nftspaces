import axios from "axios";
const CONFIG = require("../config/config");

class AuthService {
    login(username, password) {
        return axios
            .post(CONFIG.API_URL + "/auth/signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(CONFIG.AUTH_URL + "/auth/signup", {
            username,
            email,
            password
        });
    }
    getCurrentUser ()  {
        return  JSON.parse(localStorage.getItem('user'));
    }
}
export default new AuthService();