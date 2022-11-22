import axios from "axios"
const CONFIG = require("../config/config");

export const postTwitterCallback = async(code,codeVerifier) =>{

    try {
        // configure header's Content-Type as JSON
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        // make request to backend
        await axios.post(
            CONFIG.API_URL+'/auth/twitter/callback',
            { code, codeVerifier },
            config
        )
      } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
            //return error.response.data.message
        } else {
           // return error.message
        }
      }
       
}

export const getSpaces = async(query,state) =>{
  
    try {
        
        const { data } = await axios.get(CONFIG.API_URL+'/twitter/getspaces',{params:{q:query,state:state}})
        return data;

      } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
            //return (error.response.data.message)
        } else {
           // return (error.message)
        }
     }
}