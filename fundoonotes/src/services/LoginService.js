import axios from "axios";
import apiconstant from "../apiConstants/apiconstant";
export async function login(data) {
  //console.log(process.env);
  console.log(process.env.REACT_APP_BASEURL, apiconstant.REACT_APP_URL)
  try {
    const response = await axios.post(process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_URL, data);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}
//Calling the register API using axios
export async function register(data) {
  console.log(process.env.REACT_APP_URLREG);
  try {
    const response = await axios.post(process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_URLREG, data);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}
//Calling the Forgot Password API using axios
export async function forgotpassword(data) {
  try {
    const response = await axios.post(process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_URLFORGOT, data);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}
//Calling the ResetPAssword API using axios
export async function resetPassword(data, access_token) {
  // console.log(data,token);
  const localtoken = localStorage.getItem("token");
  // console.log(id);

  try {
    const response = await axios.post(process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_urlresetpassword, data, { params: { access_token } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}
