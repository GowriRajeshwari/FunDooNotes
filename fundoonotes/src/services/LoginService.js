import axios from "axios";
require('dotenv').config();
export async function login(data) {
  //console.log(process.env);
  console.log(process.env.REACT_APP_URL)
  try {
    const response = await axios.post(process.env.REACT_APP_URL, data);
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
    const response = await axios.post(process.env.REACT_APP_URLREG,data);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}
// //Calling the Forgot Password API using axios
// export async function forgotpassword(data) {
//   try {
//     const response = await axios.post(process.env.REACT_APP_urlforgot, data, {
//       headers: {
//         "Content-Type": "application/json"
//       }
//     });
//     return response;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }
// //Calling the ResetPAssword API using axios
// export async function resetPassword(data,token) {
//   try {
//     const response = await axios.post(process.env.REACT_APP_urlresetpassword, data, {
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization" : `Bearer ${token}`
//       }
//     });
//     return response;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }
// //Calling the ResetPAssword API using axios
// export async function getUser() {
//   console.log(process.env.REACT_APP_getuser)

//   try {
//     const response = await axios.get(process.env.REACT_APP_getuser);
//     return response;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }

// export async function getChat(data) {
//   try {
//     const response = await axios.post(process.env.REACT_APP_getchat, data, {
//       headers: {
//         "Content-Type": "application/json"
//       }
//     });
//     return response;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }


// export async function saveChat(data) {
//   try {
//     const response = await axios.post(process.env.REACT_APP_savechat, data, {
//       headers: {
//         "Content-Type": "application/json"
//       }
//     });
//     return response;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// }

