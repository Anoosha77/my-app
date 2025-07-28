// import { axiosInstanceAuth } from "../instances/instances";
// import { axiosInstanceAdmin } from "../instances/instances";
// import { axiosInstanceUser } from "../instances/instances";

import { axiosInstance } from "../instances/instances";
import { University } from "@/types/university";

export const getUniversities = async (search: string = ""): Promise<University[]> => {
  const response = await axiosInstance.get(
    `/search?country=United%20States&name=${search}`
  );
  return response.data;
};

// @/core/api/api.ts


// export const login = (data: { email: string; password: string }) => {
//   return axiosInstanceAuth.post("/login", data);
// };


// export const verifyLoginOtp = async (email: string, otp: string) => {
//   return axiosInstanceAuth.post("verify-login-otp", { email, otp });
// };

// export const resendOtp = async (email: string) => {
//   return axiosInstanceAuth.post("resend-otp", { email });
// };
