// import { axiosInstanceAuth } from "../instances/instances";
// import { axiosInstanceAdmin } from "../instances/instances";
// import { axiosInstanceUser } from "../instances/instances";

// core/api/api.ts
import axiosInstance from "../instances/instances";

export const pingServer = async () => {
  const response = await axiosInstance.get("/api/v1");
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
