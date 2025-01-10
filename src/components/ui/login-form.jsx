"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import axios from "axios";
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";

export function LoginForm({ className, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const [errorHandle, setErrorHandler] = useState("");
  const [password, setPassword] = useState("");
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8003/graphql", {
        query: `
        mutation Signin($emailOrUsername: String!, $password: String!) {
          signin(emailOrUsername: $emailOrUsername, password: $password) {
            message
            token
          }
        }
      `,
        variables: {
          emailOrUsername,
          password,
        },
      });

      if (response.data?.data?.signin?.token) {
        const { token, message } = response.data.data.signin;

        // Store token in cookies
        document.cookie = `authToken=${token}; path=/; secure; samesite=strict`;

        // Redirect to the homepage
        router.push("/");
      } else {
        setErrorHandler("Invalid credentials"); // Set error message
      }
    } catch (error) {
      console.error("Error occurred during sign-in:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      }
      setErrorHandler("Something went wrong. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      console.log("Starting Google sign-in...");

      // Initiate Google sign-in
      const result = await signIn("google", { redirect: false });
      console.log("Sign-in result:", result);

      if (!result) {
        setErrorHandler("No result returned from Google sign-in.");
        return;
      }

      if (result.error) {
        setErrorHandler(`Google sign-in error: ${result.error}`);
        return;
      }

      console.log("Google sign-in was successful:", result);

      // Wait for the session to be fully established
      const session = await getSession();
      console.log("Session after sign-in:", session);

      if (!session || !session.user) {
        console.error("Failed to retrieve user details from session.");
        setErrorHandler(
          "Unable to retrieve user information. Please try again."
        );
        return;
      }

      const { email, name, image } = session.user;
      console.log("Retrieved user data:", { email, name, image });

      console.log("Sending user data to backend...");
      const response = await axios.post("http://localhost:8003/graphql", {
        query: `mutation GoogleSignIn($email: String!, $name: String!, $image: String) {
    googleSignin(email: $email, name: $name, image: $image) {
      message
      token
    }
  }`,
        variables: { email, name, image: image || null },
      });
      console.log("Response from backend:", response.data);

      const token = response.data?.data?.googleSignIn?.token;
      if (!token) {
        console.error("Token not received from backend.");
        setErrorHandler("Sign-in failed. Please try again.");
        return;
      }

      console.log("Storing token in cookies...");
      document.cookie = `authToken=${token}`;

      console.log("Redirecting to '/'...");
      router.push("/");
    } catch (error) {
      console.error(
        "An error occurred during Google sign-in:",
        error?.message || error
      );
      setErrorHandler("Something went wrong. Please try again.");
    }
  };

  const handleFacebookLogin = async () => {
    try {
      console.log("Starting Facebook sign-in...");

      // Initiate Facebook sign-in
      const result = await signIn("facebook", { redirect: false });
      console.log("Sign-in result:", result); // Debugging

      if (!result) {
        console.error("No result returned from Facebook sign-in.");
        setErrorHandler("Sign-in failed. No response received.");
        return;
      }

      if (result.error) {
        console.error(`Facebook sign-in error: ${result.error}`);
        const errorMessage =
          result.error === "OAuthAccountNotLinked"
            ? "This Facebook account is not linked to an existing account. Please sign up first."
            : "Facebook sign-in failed. Please try again.";
        setErrorHandler(errorMessage);
        return;
      }

      console.log("Facebook sign-in was successful:", result);

      // Wait for the session to be fully established
      const session = await getSession();
      console.log("Session after sign-in:", session); // Debugging session

      if (!session || !session.user) {
        console.error("Failed to retrieve user details from session.");
        setErrorHandler(
          "Unable to retrieve user information. Please try again."
        );
        return;
      }

      const { email, name, image } = session.user;

      // Proceed to send the session data to the backend
      console.log("Retrieved user data:", { email, name, image });

      console.log("Sending user data to backend...");
      const response = await axios.post("http://localhost:8003/graphql", {
        query: `mutation FacebookSignIn($email: String!, $name: String!, $image: String) {
        facebookSignin(email: $email, name: $name, image: $image) {
          message
          token
        }
      }`,
        variables: { email, name, image: image || null },
      });
      console.log("Response from backend:", response.data);

      const token = response.data?.data?.facebookSignIn?.token;
      if (!token) {
        console.error("Token not received from backend.");
        setErrorHandler("Sign-in failed. Please try again.");
        return;
      }

      console.log("Storing token in cookies...");
      document.cookie = `authToken=${token}`;

      console.log("Redirecting to '/'...");
      router.push("/");
    } catch (error) {
      console.error(
        "An error occurred during Facebook sign-in:",
        error?.message || error
      );
      setErrorHandler("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6 bg-white p-10 rounded-lg ", className)}
      {...props}
      onSubmit={handleFormSubmit}
    >
      <div className="flex flex-col items-start gap-2 text-start">
        <h1 className="text-2xl font-bold">Sign in</h1>
        <p className="text-balance text-sm text-muted-foreground font-semibold">
          New user?
          <Link
            href="/signup"
            className="text-[#1d4ed8] ml-1 hover:text-[#1e40af]"
          >
            Create an account
          </Link>
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email or username</Label>
          <Input
            id="email"
            type="text"
            placeholder="m@example.com"
            onChange={(e) => setEmailOrUsername(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2 relative">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/recovery"
              className=" text-[#1d4ed8] ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="relative flex items-center">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2"
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-[#0339D9] hover:bg-[#184EEB] font-bold"
        >
          Sign in
        </Button>

        {/* Display error message if credentials are wrong */}
        {errorHandle && (
          <p className="text-red-500 text-sm mt-2 text-center">{errorHandle}</p>
        )}

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        {/* handle google login */}
        <Button
          variant="outline"
          className="w-full font-bold"
          onClick={handleGoogleLogin}
        >
          <FcGoogle />
          Login with Google
        </Button>

        {/* handle facebook login */}
        <Button
          variant="outline"
          className="w-full font-bold"
          onClick={handleFacebookLogin}
        >
          <FaFacebook className="text-[#0339D9]" />
          Login with Facebook
        </Button>
      </div>
    </form>
  );
}
