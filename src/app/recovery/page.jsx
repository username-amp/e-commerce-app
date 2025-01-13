"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import fetchGraphQL from "@/utils/fetchGraphQL"; // @/utils/fetchGraphQL
import { VERIFY_CODE_MUTATION } from "@/graphql/mutations/verifyCode";
import { CONFIRM_CODE_MUTATION } from "@/graphql/mutations/confirmCode";
import { RESET_PASSWORD_MUTATION } from "@/graphql/mutations/resetPassword";
import { GET_USER_QUERY } from "@/graphql/queries/getUsernameByEmail";
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
  const [timer, setTimer] = useState(120);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

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

  // Timer logic
  useEffect(() => {
    let countdown;
    if (isResendDisabled && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0) {
      setIsResendDisabled(false);
    }

    return () => clearInterval(countdown); // Clean up timer on unmount
  }, [isResendDisabled, timer]);

  const startTimer = () => {
    setTimer(120); // Reset in 2 minutes
    setIsResendDisabled(true); // Disable the resend button
  };

  const handleResendingCode = async () => {
    try {
      const data = await fetchGraphQL(VERIFY_CODE_MUTATION, { email });

      if (data?.data?.verifyCode?.status === "true") {
        startTimer();
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
        startTimer();
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
    if (steps === 2) {
      const fetchUsername = async () => {
        try {
          const data = await fetchGraphQL(GET_USER_QUERY, { email });

          // Check if the response contains the username correctly
          if (data?.data?.getUsernameByEmail) {
            setUsername(data.data.getUsernameByEmail.username);
          } else {
            console.error("Username not found");
          }
        } catch (error) {
          console.error("Failed to fetch username:", error);
        }
      };

      fetchUsername();
    }
  }, [steps, email]);

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
                    <h1 className="text-2xl font-bold font-aileron tracking-wide">
                      Recover your account
                    </h1>
                    <p className="text-balance text-sm text-muted-foreground font-semibold font-aileron ">
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
                      <Label
                        htmlFor="email"
                        className="font-aileron  font-bold"
                      >
                        Email
                      </Label>
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
                      <p className="text-sm text-red-500 font-bold mt-0 font-aileron">
                        {error.email}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground mt-0 font-aileron font-normal">
                        {" "}
                        We need your registered email to send you an OTP
                      </p>
                    )}

                    <Button
                      type="button"
                      className="w-full bg-[#0339D9] hover:bg-[#184EEB] font-bold font-aileron tracking-widest mt-3"
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
                    <h1 className="text-4xl font-bold font-aileron">
                      Update your password
                    </h1>

                    <p className="text-muted-foreground text-sm mt-5 font-aileron  font-normal">
                      Enter the code we just sent to
                    </p>

                    <p className="text-sm font-bold font-aileron">
                      {email || "Jepoydizon@gmail.com"}
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex justify-start w-full font-aileron">
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
                      {/* Timer Display */}
                      {timer > 0 && (
                        <p className="text-sm mr-9 mt-5 font-bold">
                          {`${Math.floor(timer / 60)}:${String(
                            timer % 60
                          ).padStart(2, "0")}`}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-end items-center">
                      <div className="flex justify-evenly gap-5 mr-12 mt-5">
                        <Button
                          type="submit"
                          className="w-full bg-white text-black border font-bold font-aileron tracking-widest hover:text-white"
                          onClick={handleBackToStep1}
                        >
                          Back
                        </Button>

                        {/* Resend Button */}
                        <Button
                          type="button"
                          className="w-full bg-white text-black border font-bold font-aileron tracking-widest  hover:text-white"
                          onClick={handleResendingCode}
                          disabled={isResendDisabled}
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
                        <h1 className="text-4xl font-bold font-aileron">
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
                        <h3 className="text-md font-semibold font-aileron">
                          {email || "Jepoydizon@gmail.com"}
                        </h3>
                        <h5 className="text-sm text-muted-foreground font-aileron font-normal">
                          {username || "Jepoydizon"}
                        </h5>
                      </div>
                    </div>

                    <div className="grid gap-6">
                      <div>
                        <Label
                          htmlFor="password"
                          className="font-semibold font-aileron"
                        >
                          New password
                        </Label>
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
                        <Label
                          htmlFor="password"
                          className="font-semibold font-aileron"
                        >
                          Repeat password
                        </Label>
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
                        className="w-full bg-[#0339D9] hover:bg-[#184EEB] font-bold font-aileron tracking-widest"
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
