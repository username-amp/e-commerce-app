'use client'

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HiEye, HiEyeOff } from "react-icons/hi" 
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa6"
import axios from "axios"

export function LoginForm({ className, ...props }) {
  const [showPassword, setShowPassword] = useState(false)
  const [errorHandle, setErrorHandler] = useState('')
  const [password, setPassword] = useState('')
  const [emailOrUsername, setEmailOrUsername] = useState('')

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
   
    
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try {
        const response = await axios.post('') //specify your login endpoint here

        response ? 
                  console.log(response) // debugging purposes 
                : setErrorHandler('Invalid credentials')
    } catch (error) {
      console.error('Error msg from sign in form : ', error) // debuging purposes 
    }
  }

  const handleGoogleLogin = async () => {
    // your code here
  }

  const handleFacebookLogin = async () => {
    // your code here
  }

  return (
    <form className={cn("flex flex-col gap-6 bg-white p-10 rounded-lg", className)} {...props} onSubmit={handleFormSubmit}>
      <div className="flex flex-col items-start gap-2 text-start">
        <h1 className="text-2xl font-bold">Sign in</h1>
        <p className="text-balance text-sm text-muted-foreground font-semibold">
          New user? 
          <Link href="/register" className="text-[#1d4ed8] ml-1 hover:text-[#1e40af]">
            Create an account
          </Link>
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email or username</Label>
          <Input id="email" type="email" placeholder="m@example.com" onChange={(e) => setEmailOrUsername(e.target.value)} required />
        </div>
        <div className="grid gap-2 relative">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="#"
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
        <Button type="submit" className="w-full bg-[#0339D9] hover:bg-[#184EEB] font-bold">
          Sign in
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        {/* handle google login */}
        <Button variant="outline" className="w-full font-bold" onClick={handleGoogleLogin}>
          <FcGoogle />
          Login with Google
        </Button>

        {/* handle facebook login */}
        <Button variant="outline" className="w-full font-bold" onClick={handleFacebookLogin}>
          <FaFacebook className="text-[#0339D9]" />
          Login with Facebook
        </Button>
      </div>
    </form>
  )
}
