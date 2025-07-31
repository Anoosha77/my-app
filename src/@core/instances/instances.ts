// instances.ts

//PING 
// core/instances/instances.ts
import axios from "axios";
import { serverUrl } from "../config/config";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 10000,
  withCredentials: true, // :white_tick: Add this
});


export default axiosInstance;



// import axios from "axios";
// import { serverUrl } from "../config/config";

// const baseUrlAuth:string = `${serverUrl}/api/v1/auth/`;

// export const axiosInstanceAuth = axios.create({
//   baseURL:baseUrlAuth,
// });

// const baseUrlAdmin:string =`${serverUrl}/api/v1/admin/`;
                                                      
// export const axiosInstanceAdmin =axios.create({
//   baseURL:baseUrlAdmin,
// });

// const baseUrlUser:string =`${serverUrl}/api/v1/users/`;

// export const axiosInstanceUser =axios.create({
//   baseURL:baseUrlUser,
// })
