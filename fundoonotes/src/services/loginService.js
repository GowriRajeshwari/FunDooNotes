import axios from "axios";
import apiconstant from "../apiConstants/apiconstant";
export function login(data) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_LOGIN,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
}
//Calling the register API using axios
export function register(data) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_USERSIGNUP,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
}
//Calling the Forgot Password API using axios
export function forgotpassword(data) {
  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_FORGOT,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
}
//Calling the ResetPAssword API using axios
export function resetPassword(data, access_token) {
  const localtoken = localStorage.getItem("token");

  try {
    const response = axios.post(
      process.env.REACT_APP_BASEURL + apiconstant.REACT_APP_RESETPASSWORD,
      data,
      { params: { access_token } }
    );
    return response;
  } catch (error) {
    return error;
  }
}
