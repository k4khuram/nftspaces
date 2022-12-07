import axios from "axios"
const CONFIG = require("../config/config");

export const postTwitterCallback = async(code,codeVerifier,user) => {

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
            { code, codeVerifier, user },
            config
        ).then(res => {
            if(res.status == 200){
                window.location.replace('/');
            }
            console.log(res);
        })
      } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
            //return error.response.data.message
        } else {
           // return error.message
        }
      }
       
}

export const getSpaces = async(query,state,userInfo) => {
  
    try {
        
        const { data } = await axios.get(CONFIG.API_URL+'/twitter/getspaces',{params:{q:query,state:state,user_id:userInfo.id}})
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

export const spaceRemind = async(user, spaceId) => {
  
    try {

        const { data } = await axios.post(CONFIG.API_URL+'/twitter/space/remind', {user_id: user.id, space_id: spaceId})
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