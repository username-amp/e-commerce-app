"use client";

import { LogoHeader } from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcInfo } from "react-icons/fc";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import fetchGraphQL from "@/utils/fetchGraphQL";
import { SIGNUP_MUTATION } from "@/graphql/mutations/signUp";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { validateEmail } from "@/utils/email-validator";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { useEffect, useState } from "react";

export default function Page() {
  const [showStep1, setShowStep1] = useState(false);
  const [showStep2, setShowStep2] = useState(false);
  const [showStep3, setShowStep3] = useState(false);
  const [firstPassShow, setFirstPassShow] = useState(false);
  const [secondPassShow, setSecondPassShow] = useState(false);
  const [steps, setSteps] = useState(1);

  // input values
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [cpass, setCpass] = useState("");
  const [address, setAddress] = useState("");
  const [terms, setTerms] = useState(false);

  // error states
  const [errors, setErrors] = useState({
    email: "",
    name: "",
    username: "",
    phone: "",
    gender: "",
    birthdate: "",
    password: "",
    cpass: "",
    terms: "",
    address: "",
  });

  const router = useRouter();

  // toggle show password in first input
  const toggleFirstPassword = () => {
    setFirstPassShow((prev) => !prev);
  };

  // toggle show password in second input
  const toggleSecondPassword = () => {
    setSecondPassShow((prev) => !prev);
  };

  const handleContinue = () => {
    if (steps === 1) {
      let isValidEmail = validateEmail(email);
      isValidEmail
        ? setSteps(steps + 1)
        : setErrors((prev) => ({ ...prev, email: "Invalid email" }));
    }

    if (steps === 2) {
      username
        ? setSteps(steps + 1)
        : setErrors((prev) => ({ ...prev, username: "Invalid username" }));

      phone
        ? setSteps(steps + 1)
        : setErrors((prev) => ({ ...prev, phone: "Invalid phone number" }));

      gender
        ? setSteps(steps + 1)
        : setErrors((prev) => ({ ...prev, gender: "Gender is required" }));

      birthdate
        ? setSteps(steps + 1)
        : setErrors((prev) => ({ ...prev, birthdate: "Invalid birthdate" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSteps(1);

      const variables = {
        name,
        username,
        email,
        password,
        confirmPassword: cpass,
        role: "customer",
        address: address || null,
        phoneNumber: phone || null,
        gender,
        birthdate,
      };

      const response = await fetchGraphQL(SIGNUP_MUTATION, variables);

      const data = response.data?.signup;

      if (data?.token) {
        document.cookie = `authToken=${data.token}; path=/; secure; samesite=strict`;
        setSteps(2);
        router.push("/");
      } else {
        setErrorHandler(
          "Signup failed. Please check your details and try again."
        );
      }
    } catch (error) {
      console.error("Error during signup:", error);

      if (error.response) {
        console.error("Error response data:", error.response.data);
      }

      setErrorHandler("Something went wrong. Please try again later.");
    }
  };

  const handleGoogleLogin = async () => {};

  const handleFacebookLogin = async () => {};

  // Observe changes in steps
  useEffect(() => {
    if (steps === 1) {
      setShowStep1(true);
      setShowStep2(false);
      setShowStep3(false);
    }

    if (steps === 2) {
      setShowStep1(false);
      setShowStep2(true);
      setShowStep3(false);
    }

    if (steps == 3) {
      setShowStep1(false);
      setShowStep2(false);
      setShowStep3(true);
    }
  }, [steps]);

  useEffect(() => {
    setSteps(1);
  }, []);

  return (
    <div className="h-screen bg-cover bg-center">
      <div
        className="grid lg:grid-cols-2 h-[95%] "
        style={{
          backgroundImage: 'url("/BG.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className=" flex-1 items-center justify-center hidden  sm:hidden  md:hidden lg:flex">
          <LogoHeader />      
        </div>


        <div className="flex flex-1 items-center justify-center sm:h-full ">
          {showStep1 && (
            <div className="w-full max-w-lg animate-fade-left animate-once animate-delay-[2ms]">
              <div className="flex flex-col gap-6 bg-white p-10 rounded-lg shadow-lg">
                <div className="flex flex-col items-start gap-2 text-start">
                  <div>
                    <p className="text-balance text-sm text-muted-foreground font-semibold font-aileron ">
                      Step {steps} of 3
                    </p>
                    <h1 className="text-2xl font-bold font-aileron tracking-wide">
                      Create an account
                    </h1>
                  </div>
                  <div className="flex gap-2">
                    {/* handle google login */}
                    <Button
                      variant="outline"
                      className="font-bold rounded-full w-10 h-10 flex items-center justify-center border-gray-400 border"
                      onClick={handleGoogleLogin}
                    >
                      <FcGoogle />
                    </Button>
                    {/* handle facebook login */}
                    <Button
                      variant="outline"
                      className="font-bold rounded-full w-10 h-10 flex items-center justify-center border-gray-400 border"
                    >
                      <FaFacebook
                        className="text-[#0339D9]"
                        onClick={handleFacebookLogin}
                      />
                    </Button>
                  </div>
                </div>
                <div className="grid gap-6">
                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground font-aileron font-normal">
                      Or continue with
                    </span>
                  </div>

                  <div>
                    <p className="text-balance text-sm text-gray-600 font-semibold font-aileron">
                      Sign up with email
                    </p>
                    <p className="text-balance text-sm text-muted-foreground font-semibold font-aileron">
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
                    <Label
                      htmlFor="email"
                      className="font-aileron font-semibold"
                    >
                      Email address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 font-semibold">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <Button
                    type="button"
                    className="w-full bg-[#0339D9] hover:bg-[#184EEB] font-bold font-aileron tracking-widest"
                    onClick={handleContinue}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          )}

          {showStep2 && (
            <div className="w-full max-w-lg animate-fade-left animate-once animate-delay-[2ms]">
              <div className="flex flex-col gap-2 bg-white p-10 rounded-lg shadow-lg">
                <div className="flex flex-col items-start gap-2 text-start">
                  <div>
                    <p className="text-balance text-sm text-muted-foreground font-semibold font-aileron">
                      Step {steps} of 3
                    </p>
                    <h1 className="text-2xl font-bold font-aileron tracking-wide">
                      Create an account
                    </h1>
                  </div>
                </div>
                <div className="grid gap-6">
                  <div>
                    <p className="text-balance text-sm text-muted-foreground font-semibold font-aileron">
                      Already have an account?
                      <Link
                        href="/signin"
                        className="text-[#1d4ed8] ml-1 hover:text-[#1e40af] font-aileron"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="name"
                      className="font-aileron font-semibold"
                    >
                      Full name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Ex. John Doe"
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 font-semibold">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label
                      htmlFor="username"
                      className="font-aileron font-semibold"
                    >
                      Username
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Ex. John Doe"
                      value={username}
                      required
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.username && (
                      <p className="text-xs text-red-500 font-semibold">
                        {errors.username}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label
                      htmlFor="phone"
                      className="font-aileron font-semibold"
                    >
                      Phone number
                    </Label>
                    <Input
                      id="phone"
                      type="text"
                      placeholder="09xxxxxxxxx"
                      value={phone}
                      required
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 font-semibold">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Radio Group */}
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-4">
                      <Label className="font-semibold text-sm font-aileron">
                        Gender
                      </Label>
                      <div className="inline-flex items-center space-x-2">
                        <input
                          type="radio"
                          value="Male"
                          id="Male"
                          name="gender"
                          className="h-4 w-4 text-blue-500 border-gray-300 rounded-full focus:ring-blue-400"
                          checked={gender === "Male"}
                          onChange={() => setGender("Male")}
                        />
                        <label
                          htmlFor="Male"
                          className="text-sm font-semibold text-gray-700 font-aileron"
                        >
                          Male
                        </label>
                      </div>

                      <div className="inline-flex items-center space-x-2">
                        <input
                          type="radio"
                          value="Female"
                          id="Female"
                          name="gender"
                          className="h-4 w-4 text-blue-500 border-gray-300 rounded-full focus:ring-blue-400"
                          checked={gender === "Female"}
                          onChange={() => setGender("Female")}
                        />
                        <label
                          htmlFor="Female"
                          className="text-sm font-semibold text-gray-700 font-aileron"
                        >
                          Female
                        </label>
                      </div>

                      <div className="inline-flex items-center space-x-2">
                        <input
                          type="radio"
                          value="Other"
                          id="Other"
                          name="gender"
                          className="h-4 w-4 text-blue-500 border-gray-300 rounded-full focus:ring-blue-400"
                          checked={gender === "Other"}
                          onChange={() => setGender("Other")}
                        />
                        <label
                          htmlFor="Other"
                          className="text-sm font-semibold text-gray-700 font-aileron"
                        >
                          Other
                        </label>
                      </div>
                    </div>
                    {errors.gender && (
                      <p className="text-xs text-red-500 font-semibold">
                        {errors.gender}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <label
                      htmlFor="birthdate"
                      className="text-sm flex items-center font-aileron font-semibold"
                    >
                      Birthdate
                      <span className="ml-1 mt-1 font-aileron">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <FcInfo />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-aileron font-normal">
                                Add to library
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </span>
                    </label>

                    <Input
                      id="birthdate"
                      type="date"
                      value={birthdate}
                      onChange={(e) => setBirthdate(e.target.value)}
                      required
                    />

                    {errors.birthdate && (
                      <p className="text-xs text-red-500 font-semibold">
                        {errors.birthdate}
                      </p>
                    )}
                  </div>

                  <Button
                    type="button"
                    className="w-full bg-[#0339D9] hover:bg-[#184EEB] font-bold font-aileron tracking-widest"
                    onClick={handleContinue}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          )}

          {showStep3 && (
            <form
              className="w-full max-w-lg animate-fade-left animate-once animate-delay-[2ms] mx-auto flex justify-center"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-2 bg-white p-10 rounded-lg">
                <div className="flex flex-col items-start gap-2 text-start">
                  <div>
                    <p className="text-balance text-sm text-muted-foreground font-semibold font-aileron">
                      Step {steps} of 3
                    </p>
                    <h1 className="text-2xl font-bold font-aileron tracking-wide">
                      Create an account
                    </h1>
                  </div>
                </div>
                <div className="grid gap-6">
                  <div>
                    <p className="text-balance text-sm text-muted-foreground font-semibold font-aileron">
                      Already have an account?
                      <Link
                        href="/signin"
                        className="text-[#1d4ed8] ml-1 hover:text-[#1e40af] font-aileron"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>

                  <div>
                    <Label
                      htmlFor="password"
                      className="font-aileron font-semibold"
                    >
                      Password
                    </Label>
                    <div className="relative flex items-center mt-0">
                      <Input
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={firstPassShow ? "text" : "password"}
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
                      className="font-aileron font-semibold"
                    >
                      Repeat password
                    </Label>
                    <div className="relative flex items-center mt-0">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        value={cpass}
                        onChange={(e) => setCpass(e.target.value)}
                        type={secondPassShow ? "text" : "password"}
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
                  </div>

                  <p className="text-xs font-aileron font-normal">
                    <Link
                      href="#"
                      className=" text-[#1d4ed8]  text-xs font-semibold font-aileron mr-1 underline-offset-4 hover:underline"
                    >
                      Techzone
                    </Link>
                    may send me personalized emails regarding products and
                    services. For more information or to unsubscribe at any
                    time, please refer to our
                    <Link
                      href="#"
                      className=" text-[#1d4ed8]  text-xs font-semibold font-aileron ml-1 underline-offset-4 hover:underline"
                    >
                      Privacy Policy.
                    </Link>
                  </p>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-xs font-semibold font-aileron leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Please contact me via email
                    </label>
                  </div>

                  <p className="text-xs font-normal font-aileron">
                    By clicking Create account, I agree that I have read and
                    accepted the
                    <Link
                      href="#"
                      className=" text-[#1d4ed8]  text-xs font-semibold font-aileron mr-1 ml-1 underline-offset-4 hover:underline"
                    >
                      Terms of Service
                    </Link>
                    and
                    <Link
                      href="#"
                      className=" text-[#1d4ed8]  text-xs font-semibold font-aileron mr-1 ml-1 underline-offset-4 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </p>

                  <Button
                    type="button"
                    className="w-full bg-[#0339D9] hover:bg-[#184EEB] font-bold font-aileron tracking-widest"
                    onClick={handleSubmit}
                  >
                    Create an account
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
