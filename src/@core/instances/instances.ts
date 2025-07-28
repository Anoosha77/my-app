// instances.ts


export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // or your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});



import axios from "axios";
import { serverUrl } from "../config/config";

const baseUrlAuth:string = `${serverUrl}/api/v1/auth/`;

export const axiosInstanceAuth = axios.create({
  baseURL:baseUrlAuth,
});

const baseUrlAdmin:string =`${serverUrl}/api/v1/admin/`;
                                                      
export const axiosInstanceAdmin =axios.create({
  baseURL:baseUrlAdmin,
});

const baseUrlUser:string =`${serverUrl}/api/v1/users/`;

export const axiosInstanceUser =axios.create({
  baseURL:baseUrlUser,
})
