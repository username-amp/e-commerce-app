'use client'

import { LogoHeader } from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FcInfo } from "react-icons/fc"
import { HiEye, HiEyeOff } from "react-icons/hi"
import { Checkbox } from "@/components/ui/checkbox"
import axios from "axios"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { validateEmail } from "@/utils/email-validator"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa6"
import { useEffect, useState } from "react"

export default function Page() {
  const [showStep1, setShowStep1] = useState(false)
  const [showStep2, setShowStep2] = useState(false)
  const [showStep3, setShowStep3] = useState(false)
  const [firstPassShow, setFirstPassShow] = useState(false)
  const [secondPassShow, setSecondPassShow] = useState(false)
  const [steps, setSteps] = useState(1)

  // input values
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [password, setPassword] = useState('')
  const [cpass, setCpass] = useState('')
  const [terms, setTerms] = useState(false)

  // error states
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    phone: '',
    gender: '',
    birthdate: '',
    password: '',
    cpass: '',
    terms: ''
  });

  // toggle show password in first input
  const toggleFirstPassword = () => {
    setFirstPassShow((prev) => !prev)
  }

  // toggle show password in second input
  const toggleSecondPassword = () => {
    setSecondPassShow((prev) => !prev)
  }

  const handleContinue = () => {

    if (steps === 1) {
      let isValidEmail = validateEmail(email)
      isValidEmail ? setSteps(steps + 1) : setErrors((prev) => ({ ...prev, email: 'Invalid email' }))
    }

    if (steps === 2) {
      username ? setSteps(steps + 1) : setErrors((prev) => ({ ...prev, username: 'Invalid username' }))

      phone ? setSteps(steps + 1) : setErrors((prev) => ({ ...prev, phone: 'Invalid phone number' }))

      gender ? setSteps(steps + 1) : setErrors((prev) => ({ ...prev, gender: 'Gender is required' }))

      birthdate ? setSteps(steps + 1) : setErrors((prev) => ({ ...prev, birthdate: 'Invalid birthdate' }))
    }

  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSteps(1)
      const response = await axios.post('') //specify your login endpoint here

      response ?
        console.log(response) // debugging purposes 
        : setErrorHandler('Error creating an account')
    } catch (error) {
      console.log("Error creating an account : ", error)
    }
  }

  const handleGoogleLogin = async () => {

  }

  const handleFacebookLogin = async () => {

  }

  // Observe changes in steps 
  useEffect(() => {
    if (steps === 1) {
      setShowStep1(true)
      setShowStep2(false)
      setShowStep3(false)
    }

    if (steps === 2) {
      setShowStep1(false)
      setShowStep2(true)
      setShowStep3(false)
    }

    if (steps == 3) {
      setShowStep1(false)
      setShowStep2(false)
      setShowStep3(true)
    }
  }, [steps])

  useEffect(() => {
    setSteps(1)
  }, [])

  return (
    <div className="h-screen bg-cover bg-center" >
      <div className="grid lg:grid-cols-2 h-[95%]" style={{ backgroundImage: 'url("/BG.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <LogoHeader />
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center ">
          {showStep1 && (
            <div className="w-full max-w-lg animate-fade-left animate-once animate-delay-[2ms]">
              <div className="flex flex-col gap-6 bg-white p-10 rounded-lg shadow-lg">
                <div className="flex flex-col items-start gap-2 text-start">
                  <div>
                    <p className="text-balance text-sm text-muted-foreground font-semibold ">Step {steps} of 3</p>
                    <h1 className="text-2xl font-bold">Create an account</h1>
                  </div>
                  <div className="flex gap-2">
                    {/* handle google login */}
                    <Button variant="outline" className="font-bold rounded-full w-10 h-10 flex items-center justify-center border-gray-400 border" onClick={handleGoogleLogin} >
                      <FcGoogle />
                    </Button>
                    {/* handle facebook login */}
                    <Button variant="outline" className="font-bold rounded-full w-10 h-10 flex items-center justify-center border-gray-400 border">
                      <FaFacebook className="text-[#0339D9]" onClick={handleFacebookLogin} />
                    </Button>
                  </div>
                </div>
                <div className="grid gap-6">
                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>

                  <div>
                    <p className="text-balance text-sm text-gray-600 font-semibold">
                      Sign up with email
                    </p>
                    <p className="text-balance text-sm text-muted-foreground font-semibold">
                      Already have an account? 
                      <Link href="/signin" className="text-[#1d4ed8] ml-1 hover:text-[#1e40af]">
                        Sign in
                      </Link>
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input id="email" type="email" placeholder="m@example.com" value={email} required onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <p className="text-xs text-red-500 font-semibold">{errors.email}</p>}
                  </div>

                  <Button type="button" className="w-full bg-[#0339D9] hover:bg-[#184EEB] font-bold" onClick={handleContinue}>
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
                    <p className="text-balance text-sm text-muted-foreground font-semibold ">Step {steps} of 3</p>
                    <h1 className="text-2xl font-bold">Create an account</h1>
                  </div>
                </div>
                <div className="grid gap-6">
                  <div>
                    <p className="text-balance text-sm text-muted-foreground font-semibold">
                      Already have an account? 
                      <Link href="/signin" className="text-[#1d4ed8] ml-1 hover:text-[#1e40af]">
                        Sign in
                      </Link>
                    </p>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" type="text" placeholder="Ex. John Doe" value={username} required onChange={(e) => setUsername(e.target.value)} />
                    {errors.username && <p className="text-xs text-red-500 font-semibold">{errors.username}</p>}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input id="phone" type="number" placeholder="09xxxxxxxxx" value={phone} required onChange={(e) => setPhone(e.target.value)} />
                    {errors.phone && <p className="text-xs text-red-500 font-semibold">{errors.phone}</p>}
                  </div>

                  {/* Radio Group */}
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-4">
                      <Label className="font-semibold text-sm">Gender</Label>
                      <div className="inline-flex items-center space-x-2">
                        <input
                          type="radio"
                          value="Male"
                          id="Male"
                          name="gender"
                          className="h-4 w-4 text-blue-500 border-gray-300 rounded-full focus:ring-blue-400"
                          checked={gender === 'Male'}
                          onChange={() => setGender('Male')}
                        />
                        <label htmlFor="Male" className="text-sm font-semibold text-gray-700">Male</label>
                      </div>

                      <div className="inline-flex items-center space-x-2">
                        <input
                          type="radio"
                          value="Female"
                          id="Female"
                          name="gender"
                          className="h-4 w-4 text-blue-500 border-gray-300 rounded-full focus:ring-blue-400"
                          checked={gender === 'Female'}
                          onChange={() => setGender('Female')}
                        />
                        <label htmlFor="Female" className="text-sm font-semibold text-gray-700">Female</label>
                      </div>

                      <div className="inline-flex items-center space-x-2">
                        <input
                          type="radio"
                          value="Other"
                          id="Other"
                          name="gender"
                          className="h-4 w-4 text-blue-500 border-gray-300 rounded-full focus:ring-blue-400"
                          checked={gender === 'Other'}
                          onChange={() => setGender('Other')}
                        />
                        <label htmlFor="Other" className="text-sm font-semibold text-gray-700">Other</label>
                      </div>
                    </div>
                    {errors.gender && <p className="text-xs text-red-500 font-semibold">{errors.gender}</p>}
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="birthdate" className="text-sm flex items-center">
                      Birthdate
                      <span className="ml-1 mt-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger><FcInfo /></TooltipTrigger>
                            <TooltipContent>
                              <p>Add to library</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </span>
                    </label>

                    <Input id="birthdate" type="date" placeholder="09xxxxxxxxx" required />
                    {errors.birthdate && <p className="text-xs text-red-500 font-semibold">{errors.birthdate}</p>}
                  </div>

                  <Button type="button" className="w-full bg-[#0339D9] hover:bg-[#184EEB] font-bold" onClick={handleContinue}>
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
                    <p className="text-balance text-sm text-muted-foreground font-semibold ">Step {steps} of 3</p>
                    <h1 className="text-2xl font-bold">Create an account</h1>
                    </div>
                </div>
                <div className="grid gap-6">
                    <div>
                    <p className="text-balance text-sm text-muted-foreground font-semibold">
                        Already have an account?
                        <Link href="/register" className="text-[#1d4ed8] ml-1 hover:text-[#1e40af]">
                        Sign in
                        </Link>
                    </p>
                    </div>

                    <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative flex items-center mt-0">
                        <Input
                        id="password"
                        name="password"
                        type={firstPassShow ? 'text' : 'password'}
                        required
                        placeholder="Enter your password"
                        />
                        <button type="button" onClick={toggleFirstPassword} className="absolute right-2">
                        {firstPassShow ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                        </button>
                    </div>
                    </div>

                    <div>
                    <Label htmlFor="password">Repeat password</Label>
                    <div className="relative flex items-center mt-0">
                        <Input
                        id="password"
                        name="password"
                        type={secondPassShow ? 'text' : 'password'}
                        required
                        placeholder="Enter your password"
                        />
                        <button type="button" onClick={toggleSecondPassword} className="absolute right-2">
                        {secondPassShow ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                        </button>
                    </div>
                    </div>

                    <p className="text-xs">
                    <Link href="#" className=" text-[#1d4ed8]  text-xs font-semibold mr-1 underline-offset-4 hover:underline">
                        Techzone
                    </Link>
                    may send me personalized emails regarding products and services. For more information or to unsubscribe at any time, please refer to our
                    <Link href="#" className=" text-[#1d4ed8]  text-xs font-semibold ml-1 underline-offset-4 hover:underline">
                        Privacy Policy.
                    </Link>
                    </p>

                    <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                        htmlFor="terms"
                        className="text-xs font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Please contact me via email
                    </label>
                    </div>

                    <p className="text-xs">
                    By clicking Create account, I agree that I have read and accepted the
                    <Link href="#" className=" text-[#1d4ed8]  text-xs font-semibold mr-1 ml-1 underline-offset-4 hover:underline">
                        Terms of Service
                    </Link>
                    and
                    <Link href="#" className=" text-[#1d4ed8]  text-xs font-semibold mr-1 ml-1 underline-offset-4 hover:underline">
                        Privacy Policy
                    </Link>
                    </p>

                    <Button type="button" className="w-full bg-[#0339D9] hover:bg-[#184EEB] font-bold" onClick={handleSubmit}>
                    Create an account
                    </Button>
                </div>
                </div>
            </form>
            )}

        </div>
      </div>
    </div>
  )
}
