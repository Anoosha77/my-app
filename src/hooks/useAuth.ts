import { useMutation } from "@tanstack/react-query";
import { login, verifyLoginOtp, resendOtp } from "@/@core/api/api";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      verifyLoginOtp(email, otp),
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: (email: string) => resendOtp(email),
  });
};
