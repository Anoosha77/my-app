import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Otp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const fullOtp = otp.join("");
    alert("Entered OTP: " + fullOtp);

    // Example:
    // verifyOtpMutate({ email: storedEmail, otp: fullOtp });
  };

  const handleResend = () => {
    // trigger your resendOtpMutation here
    alert("Resend OTP triggered!");
  };

  return (
    <div className="max-w-sm mx-auto mt-12 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-semibold text-center mb-4">Verify OTP</h1>
      <p className="text-center text-sm text-muted-foreground mb-6">
        Enter the 6-digit code sent to your email.
      </p>

      <div className="flex justify-between gap-2 mb-6">
        {otp.map((digit, index) => (
          <Input
            key={index}
            id={`otp-${index}`}
                ref={(el) => {
                    inputRefs.current[index] = el;
                }}          
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-10 h-12 text-center text-lg"
          />
        ))}
      </div>

      <Button onClick={handleSubmit} className="w-full">
        Verify
      </Button>

      <p className="mt-4 text-sm text-center text-muted-foreground">
        Didn't receive code?{" "}
        <span
          onClick={handleResend}
          className="text-blue-500 underline cursor-pointer"
        >
          Resend
        </span>
      </p>
    </div>
  );
};

export default Otp;
