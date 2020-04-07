import axios from "axios";
const access_token = localStorage.getItem("id");
export async function getnotes() {
    // console.log(data,token);
    //const localtoken = localStorage.getItem("token");
    console.log(process.env.REACT_APP_getnotes);
  
    try {
      const response = await axios.get(process.env.REACT_APP_getnotes , {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }