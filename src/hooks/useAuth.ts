import { useMutation } from "@tanstack/react-query";
import { login, verifyLoginOtp, resendOtp } from "@/@core/api/api";

export const useLogin = () =>
  useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login({ email, password }),
  });

export const useVerifyOtp = () =>
  useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      verifyLoginOtp(email, otp),
  });

export const useResendOtp = () =>
  useMutation({
    mutationFn: resendOtp,
  });
