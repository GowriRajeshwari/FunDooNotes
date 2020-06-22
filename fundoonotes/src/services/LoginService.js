import axios from "axios";
import apiconstant from "../apiConstants/apiconstant";
export async function login(data) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_URL,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
}
//Calling the register API using axios
export async function register(data) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_URLREG,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
}
//Calling the Forgot Password API using axios
export async function forgotpassword(data) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_URLFORGOT,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
}
//Calling the ResetPAssword API using axios
export async function resetPassword(data, access_token) {
  const localtoken = localStorage.getItem("token");

  try {
    const response = await axios.post(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_urlresetpassword,
      data,
      { params: { access_token } }
    );
    return response;
  } catch (error) {
    return error;
  }
}
