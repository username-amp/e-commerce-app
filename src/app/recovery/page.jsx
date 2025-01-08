"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import fetchGraphQL from "@/utils/fetchGraphQL"; // @/utils/fetchGraphQL
import { LogoHeader } from "@/components/ui/header";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { MdMarkEmailUnread } from "react-icons/md";
import { validateEmail } from "@/utils/email-validator";

const VERIFY_CODE_MUTATION = `
  mutation VerifyCode($email: String!) {
    verifyCode(email: $email) {
      code
      status
      message
    }
  }
`;

const CONFIRM_CODE_MUTATION = `
 mutation ConfirmCode($email: String!, $code: String!) {
  confirmCode(email: $email, code: $code) {
    code
    status
    message
  }
}


`;

const RESET_PASSWORD_MUTATION = `
  mutation ResetPassword($email: String!, $newPassword: String!) {
    resetPassword(email: $email, newPassword: $newPassword) {
      code
      status
      message
    }
  }
`;

const page = () => {
  const [firstPassShow, setFirstPassShow] = useState(false);
  const [secondPassShow, setSecondPassShow] = useState(false);
  const [steps, setSteps] = useState(1);

  const router = useRouter();

  // input values
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [cpassword, setCPassword] = useState("");

  const [error, setError] = useState({
    email: "",
    otp: "",
    password: "",
  });

  // Toggle show password in first input
  const toggleFirstPassword = () => {
    setFirstPassShow((prev) => !prev);
  };

  // Toggle show password in second input
  const toggleSecondPassword = () => {
    setSecondPassShow((prev) => !prev);
  };

  const handleBackToStep1 = () => {
    setSteps(1);
  };

  const handleResendingCode = async () => {
    try {
      const data = await fetchGraphQL(VERIFY_CODE_MUTATION, { email });

      if (data?.data?.verifyCode?.status === "true") {
      } else {
        console.error("Failed to resend verification code.");
      }
    } catch (error) {
      console.error("Error resending verification code:", error);
    }
  };

  // Step 1: Verify Email
  const handleContinue = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      setError((error) => ({ ...error, email: "Invalid email" }));
      setTimeout(() => setError((error) => ({ ...error, email: "" })));
      return;
    }

    try {
      const data = await fetchGraphQL(VERIFY_CODE_MUTATION, { email });

      if (!data?.data?.verifyCode) {
        console.error("Invalid response structure:", data);
        setError((error) => ({
          ...error,
          email: "Unexpected response structure",
        }));
        return;
      }

      const { verifyCode } = data?.data || {};
      const { code, status, message } = verifyCode || {};

      if (status === "true" && code === "200") {
        setSteps(2); // step 2
      } else {
        setError((error) => ({
          ...error,
          email: message || "Verification failed",
        }));
        setTimeout(() => setError((error) => ({ ...error, email: "" })), 5000);
      }
    } catch (error) {
      console.error("Failed to verify email due to error:", error);
      setError((error) => ({
        ...error,
        email: "An unexpected error occurred",
      }));
      setTimeout(() => setError((error) => ({ ...error, email: "" })), 5000);
    }
  };

  // Step 2: Confirm OTP
  const handleOtp = async () => {
    try {
      const data = await fetchGraphQL(CONFIRM_CODE_MUTATION, {
        email,
        code: otp,
      });

      const status = data?.data?.confirmCode?.status;
      const message = data?.data?.confirmCode?.message;

      if (status === "true") {
        setSteps((prevSteps) => prevSteps + 1); // step 3
      } else {
        setError((error) => ({
          ...error,
          otp: message || "Invalid OTP",
        }));
        setTimeout(() => setError((error) => ({ ...error, otp: "" })), 5000);
      }
    } catch (error) {
      console.error("Failed to confirm OTP:", error);
      setError((error) => ({ ...error, otp: "An unexpected error occurred" }));
      setTimeout(() => setError((error) => ({ ...error, otp: "" })), 5000);
    }
  };

  // Step 3: Reset Password
  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (password !== cpassword) {
      setError((error) => ({ ...error, password: "Passwords do not match" }));
      setTimeout(() => setError((error) => ({ ...error, password: "" })), 5000);
      return;
    }

    try {
      const data = await fetchGraphQL(RESET_PASSWORD_MUTATION, {
        email,
        newPassword: password, // New password
      });

      if (data && data.data && data.data.resetPassword) {
        const resetPasswordResponse = data.data.resetPassword;

        if (resetPasswordResponse.status === "true") {
          alert("Password updated successfully!");
          router.push("/signin");
        } else {
          setError((error) => ({
            ...error,
            password:
              resetPasswordResponse.message ||
              "An error occurred while updating password",
          }));
          setTimeout(
            () => setError((error) => ({ ...error, password: "" })),
            5000
          );
        }
      } else {
        setError((error) => ({
          ...error,
          password: "Unexpected response from the server",
        }));
        setTimeout(
          () => setError((error) => ({ ...error, password: "" })),
          5000
        );
      }
    } catch (error) {
      console.error("Failed to update password:", error);
      setError((error) => ({
        ...error,
        password: "An unexpected error occurred",
      }));
      setTimeout(() => setError((error) => ({ ...error, password: "" })), 5000);
    }
  };

  useEffect(() => {
    setSteps(1); // Starting with step 1
  }, []);

  return (
    <div className="h-screen">
      <div
        className="grid lg:grid-cols-2 h-[95%]"
        style={{
          backgroundImage: 'url("/BG.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Logo only visible on medium and larger screens */}
        <div className="flex-1 items-center justify-center hidden sm:hidden md:hidden lg:flex">
          <LogoHeader />
        </div>

        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex flex-1 items-center justify-center ">
            <div className="w-full max-w-lg">
              {/* First form */}
              {steps === 1 && (
                <div
                  className={cn(
                    "flex flex-col gap-6 bg-white p-10 rounded-lg animate-fade-left animate-once animate-delay-[1ms] animate-normal"
                  )}
                >
                  <div className="flex flex-col items-start gap-2 text-start">
                    <h1 className="text-2xl font-bold">Recover your account</h1>
                    <p className="text-balance text-sm text-muted-foreground font-semibold">
                      Already have an account?
                      <Link
                        href="/signin"
                        className="text-[#1d4ed8] ml-1 hover:text-[#1e40af]"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="m@example.com"
                        required
                      />
                    </div>

                    {/* Reminder text */}
                    {error.email ? (
                      <p className="text-sm text-red-500 font-bold mt-0">
                        {error.email}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground mt-0">
                        {" "}
                        We need your registered email to send you an OTP
                      </p>
                    )}

                    <Button
                      type="button"
                      className="w-full bg-[#0339D9] hover:bg-[#184EEB] font-bold mt-3"
                      onClick={handleContinue}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}
              {/* Second form */}
              {steps === 2 && (
                <div
                  className={cn(
                    "flex flex-col gap-6 bg-white p-10 rounded-lg animate-fade-left animate-once animate-delay-[1ms] animate-normal"
                  )}
                >
                  <div className="text-8xl text-gray-400">
                    <MdMarkEmailUnread />
                  </div>
                  <div className="flex flex-col items-start gap-2 text-start">
                    <h1 className="text-4xl font-bold">Update your password</h1>

                    <p className="text-muted-foreground text-sm mt-5">
                      Enter the code we just sent to
                    </p>
                    <p className="text-sm font-bold">{email}</p>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex justify-start w-full">
                      <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={(val) => setOtp(val)}
                        onComplete={handleOtp}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={0}
                            className="w-16 h-14 font-bold"
                          />
                          <InputOTPSlot
                            index={1}
                            className="w-14 h-14 font-bold"
                          />
                          <InputOTPSlot
                            index={2}
                            className="w-14 h-14 font-bold"
                          />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot
                            index={3}
                            className="w-14 h-14 font-bold"
                          />
                          <InputOTPSlot
                            index={4}
                            className="w-14 h-14 font-bold"
                          />
                          <InputOTPSlot
                            index={5}
                            className="w-14 h-14 font-bold"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    <div className="flex justify-center">
                      <p className="text-sm mr-9 mt-5 font-bold">2:00</p>
                    </div>

                    <div className="flex justify-end items-center">
                      <div className="flex justify-evenly gap-5 mr-12 mt-5">
                        <Button
                          type="submit"
                          className="w-full bg-white text-black border font-bold hover:text-white"
                          onClick={handleBackToStep1}
                        >
                          Back
                        </Button>

                        <Button
                          type="button"
                          className="w-full bg-white text-black border font-bold hover:text-white"
                          onClick={handleResendingCode}
                        >
                          Resend code
                        </Button>
                      </div>
                    </div>

                    {/* Display error message if credentials are wrong */}
                    {/* {errorHandle && (
                      <p className="text-red-500 text-sm mt-2 text-center">{errorHandle}</p>
                    )} */}
                  </div>
                </div>
              )}
              {/* Third form */}
              {steps === 3 && (
                <form
                  className="w-full max-w-lg animate-fade-left animate-once animate-delay-[2ms] mx-auto flex justify-center"
                  onSubmit={handleUpdatePassword}
                >
                  <div className="flex flex-col gap-2 bg-white p-10 rounded-lg">
                    <div className="flex flex-col items-start gap-2 text-start">
                      <div>
                        <h1 className="text-4xl font-bold">
                          Update your password
                        </h1>
                      </div>
                    </div>

                    <div className="flex flex-row items-start gap-3 mt-5 mb-5">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      <div className="flex justify-center items-start flex-col h-full">
                        <h3 className="text-md font-semibold">
                          {email || "Jepoydizon@gmail.com"}
                        </h3>
                        <h5 className="text-sm text-muted-foreground">
                          {username || "Jepoydizon"}
                        </h5>
                      </div>
                    </div>

                    <div className="grid gap-6">
                      <div>
                        <Label htmlFor="password">New password</Label>
                        <div className="relative flex items-center mt-0">
                          <Input
                            id="password"
                            name="password"
                            type={firstPassShow ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                          />
                          <button
                            type="button"
                            onClick={toggleFirstPassword}
                            className="absolute right-2"
                          >
                            {firstPassShow ? (
                              <HiEyeOff size={20} />
                            ) : (
                              <HiEye size={20} />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="password">Repeat password</Label>
                        <div className="relative flex items-center mt-0">
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={secondPassShow ? "text" : "password"}
                            onChange={(e) => setCPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                          />
                          <button
                            type="button"
                            onClick={toggleSecondPassword}
                            className="absolute right-2"
                          >
                            {secondPassShow ? (
                              <HiEyeOff size={20} />
                            ) : (
                              <HiEye size={20} />
                            )}
                          </button>
                        </div>
                        {error.password && (
                          <p className="text-xs font-bold text-red-500 mt-1">
                            {error.password}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-[#0339D9] hover:bg-[#184EEB] font-bold"
                      >
                        Update password
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[5%]"></div>
    </div>
  );
};

export default page;
