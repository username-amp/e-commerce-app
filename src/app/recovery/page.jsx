"use client"
import React, { useEffect, useState } from 'react'
import { LogoHeader } from '@/components/ui/header'
import { cn } from "@/lib/utils"
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HiEye, HiEyeOff } from "react-icons/hi"
import { MdMarkEmailUnread } from "react-icons/md"
import { validateEmail } from '@/utils/email-validator'

const page = () => {
  const [firstPassShow, setFirstPassShow] = useState(false)
  const [secondPassShow, setSecondPassShow] = useState(false)
  const [steps, setSteps] = useState(1)
  
  // input values
  const [otp, setOtp] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [cpassword, setCPassword] = useState("")


  const [error, setError] = useState(
    {
        email: '',
        otp: '',
        password: '',
    }
)

  // Toggle show password in first input
  const toggleFirstPassword = () => {
    setFirstPassShow((prev) => !prev)
  }

  // Toggle show password in second input
  const toggleSecondPassword = () => {
    setSecondPassShow((prev) => !prev)
  }

  const handleContinue = () =>{
    const isValidEmail = validateEmail(email)
    isValidEmail ? setSteps(steps + 1) : setError((error) => ({ ...error, email: 'Invalid email' }))

    setTimeout(()=> setError((error) => ({ ...error, email: '' })), 5000)
  }

  const handleBackToStep1 = () =>{
    setSteps(steps - 1)
  }

  const handleResendingCode = async () =>{
    //Your logic for resending otp
  }

  const handleOtp = () =>{
    // Backend logic nalang dito 
    
  }

  //update form submit
  const handleUpdatePassword = async (e) =>{
    e.preventDefault()
    
    
    if(password !== cpassword) setError((error) => ({ ...error, password: 'Password does not match' }))

    setTimeout(()=> setError((error) => ({ ...error, password: '' })), 5000)
    try {

        
    } catch (error) {
        console.error("error updating password", error)
    }
  }

  useEffect(()=>{
    setSteps(1)
  },[])




  return (
    <div className="h-screen">
      <div
        className="grid lg:grid-cols-2 h-[95%]"
        style={{
          backgroundImage: 'url("/BG.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
                <div className={cn("flex flex-col gap-6 bg-white p-10 rounded-lg animate-fade-left animate-once animate-delay-[1ms] animate-normal")}>
                  <div className="flex flex-col items-start gap-2 text-start">
                    <h1 className="text-2xl font-bold font-aileron tracking-wide">Recover your account</h1>
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
                      <Label htmlFor="email" className="font-aileron  font-bold">Email</Label>
                      <Input
                        id="email"
                        type="text"
                        value={email}
                        onChange={((e) => setEmail(e.target.value))}
                        placeholder="m@example.com"
                        required
                      />
                    </div>

                    {/* Reminder text */}
                    {error.email 
                                ? <p className="text-sm text-red-500 font-bold mt-0 font-aileron">{error.email}</p>
                                : <p className="text-sm text-muted-foreground mt-0 font-aileron font-normal"> We need your registered email to send you an OTP</p>
                    }

                  

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
                <div className={cn("flex flex-col gap-6 bg-white p-10 rounded-lg animate-fade-left animate-once animate-delay-[1ms] animate-normal")}>
                  <div className="text-8xl text-gray-400">
                    <MdMarkEmailUnread />
                  </div>
                  <div className="flex flex-col items-start gap-2 text-start">
                    <h1 className="text-4xl font-bold font-aileron">Update your password</h1>

                    <p className="text-muted-foreground text-sm mt-5 font-aileron  font-normal">
                      Enter the code we just sent to
                    </p>
                    <p className="text-sm font-bold font-aileron">{email || "Jepoydizon@gmail.com"}</p>
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
                            <InputOTPSlot index={0} className="w-16 h-14 font-bold" />
                            <InputOTPSlot index={1} className="w-14 h-14 font-bold" />
                            <InputOTPSlot index={2} className="w-14 h-14 font-bold" />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} className="w-14 h-14 font-bold" />
                            <InputOTPSlot index={4} className="w-14 h-14 font-bold" />
                            <InputOTPSlot index={5} className="w-14 h-14 font-bold" />
                        </InputOTPGroup>
                        </InputOTP>

                        </div>

                    <div className="flex justify-center">
                      <p className="text-sm mr-9 mt-5 font-bold font-aileron">2:00</p>
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

                        <Button
                          type="button"
                          className="w-full bg-white text-black border font-bold font-aileron tracking-widest  hover:text-white"
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
                <form className="w-full max-w-lg animate-fade-left animate-once animate-delay-[2ms] mx-auto flex justify-center" onSubmit={handleUpdatePassword}>
                  <div className="flex flex-col gap-2 bg-white p-10 rounded-lg">
                    <div className="flex flex-col items-start gap-2 text-start">
                      <div>
                        <h1 className="text-4xl font-bold font-aileron">Update your password</h1>
                      </div>
                    </div>

                    <div className="flex flex-row items-start gap-3 mt-5 mb-5">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      <div className="flex justify-center items-start flex-col h-full">
                        <h3 className="text-md font-semibold font-aileron">{email || "Jepoydizon@gmail.com"}</h3>
                        <h5 className="text-sm text-muted-foreground font-aileron font-normal">{username || "Jepoydizon"}</h5>
                      </div>
                    </div>

                    <div className="grid gap-6">
                      <div>
                        <Label htmlFor="password" className="font-semibold font-aileron">New password</Label>
                        <div className="relative flex items-center mt-0">
                          <Input
                            id="password"
                            name="password"
                            type={firstPassShow ? "text" : "password"}
                            onChange={(e)=>setPassword(e.target.value)}
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
                        <Label htmlFor="password" className="font-semibold font-aileron">Repeat password</Label>
                        <div className="relative flex items-center mt-0">
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={secondPassShow ? "text" : "password"}
                            onChange={(e)=>setCPassword(e.target.value)}
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
                        {error.password && <p className='text-xs font-bold text-red-500 mt-1'>{error.password}</p>}
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
  )
}

export default page
