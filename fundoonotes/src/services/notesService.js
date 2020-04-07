import axios from "axios";
const access_token = localStorage.getItem("id");
export async function resetPassword(data) {
 
  
    try {
      const response = await axios.post(process.env.REACT_APP_getnotes , data, {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }