import axios from "axios"
const CONFIG = require("../config/config");

export const marketCapsVolumes = async(query,state) => {

    try {
        var result;
        // configure header's Content-Type as JSON
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        // make request to backend
        await axios.get(
            CONFIG.API_URL+'/graph/market/caps/volumes',
            {},
            config
        ).then(response => {
            // console.log(response);
            result = response.data;
        })

        return result;
      } catch (error) {
        if (error) {
        } else {
        }
      }
}