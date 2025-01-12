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
import { getAuth, FacebookAuthProvider } from "firebase/auth";
import {
  auth,
  googleProvider,
  signInWithPopup,
  facebookProvider,
} from "@/services/firebaseConfig";

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
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Get user details
      const { email, displayName, photoURL } = user;

      // Send user details to your backend
      const response = await axios.post("http://localhost:8003/graphql", {
        query: `
        mutation GoogleSignIn($email: String!, $name: String!, $image: String) {
          googleSignin(email: $email, name: $name, image: $image) {
            message
            token
          }
        }
      `,
        variables: { email, name: displayName, image: photoURL || null },
      });

      const token = response.data?.data?.googleSignin?.token;

      if (token) {
        document.cookie = `authToken=${token}; path=/; secure; samesite=strict`;
        router.push("/");
      } else {
        setErrorHandler("Sign-in failed. Please try again.");
      }
    } catch (error) {
      console.error("Google Sign-in Error:", error);
      setErrorHandler("Something went wrong. Please try again.");
    }
  };

  const handleFacebookLogin = async () => {
    try {
      console.log("Starting Facebook sign-in...");

      // Initialize Firebase Auth and Facebook Auth Provider
      const auth = getAuth();
      const provider = new FacebookAuthProvider();

      // Sign in with a popup
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Facebook sign-in successful:", user);

      // Extract user details
      const { email, displayName, photoURL } = user;

      console.log("Retrieved user data:", {
        email,
        name: displayName,
        image: photoURL,
      });

      // Send user data to the backend
      console.log("Sending user data to backend...");
      const response = await axios.post("http://localhost:8003/graphql", {
        query: `
      mutation FacebookSignIn($email: String!, $name: String!, $image: String) {
        facebookSignin(email: $email, name: $name, image: $image) {
          message
          token
        }
      }
      `,
        variables: { email, name: displayName, image: photoURL || null },
      });

      console.log("Response from backend:", response.data);

      // Extract token from the response
      const token = response.data?.data?.facebookSignIn?.token;

      if (token) {
        // Store token in cookies
        document.cookie = `authToken=${token}; path=/; secure; samesite=strict`;
        console.log("Token stored successfully. Redirecting to '/'...");
        router.push("/");
      } else {
        console.error("Token not received from backend.");
        setErrorHandler("Sign-in failed. Please try again.");
      }
    } catch (error) {
      console.error(
        "An error occurred during Facebook sign-in:",
        error.message || error
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

        <h1 className="text-2xl font-bold font-aileron tracking-wide">Sign in</h1>
        <p className="text-balance text-sm text-muted-foreground font-semibold font-aileron">
          New user? 
          <Link href="/signup" className="text-[#1d4ed8] ml-1 hover:text-[#1e40af]">

            Create an account
          </Link>
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email" className="font-aileron font-semibold">Email or username</Label>
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
            <Label htmlFor="password" className="font-aileron font-semibold">Password</Label>
            <Link
              href="/recovery"
              className="font-normal font-aileron text-[#1d4ed8] ml-auto text-sm underline-offset-4 hover:underline"
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
          className="w-full bg-[#0339D9] hover:bg-[#184EEB] font-bold font-aileron tracking-widest"
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
          className="w-full font-bold font-aileron"
          onClick={handleGoogleLogin}
        >
          <FcGoogle />
          Login with Google
        </Button>

        {/* handle facebook login */}
        <Button
          variant="outline"
          className="w-full font-bold font-aileron"
          onClick={handleFacebookLogin}
        >
          <FaFacebook className="text-[#0339D9]" />
          Login with Facebook
        </Button>
      </div>
    </form>
  );
}
