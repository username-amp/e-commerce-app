import { LoginForm } from "@/components/ui/login-form"
import { LuCodesandbox } from "react-icons/lu"

export default function Page() {
  return (
    <div className="h-screen">
      <div className=" flex flex-row items-start justify-start lg:min-w-min h-0  self-start bg-[#0339D9] p-5 ">
        <LuCodesandbox size={30} className="text-white"/>
        <h1 className=" decoration-4 text-white text-xl ml-1 font-bold">Techzone.</h1>
      </div>
      <div className="flex flex-col h-[90%] w-full items-center justify-center p-6 md:p-10 bg-[#0339D9]">
      
      <div className="w-full max-w-sm self-end lg:mr-[10rem] md:self-end sm:self-center mr-0 ">
        <LoginForm />
      </div>
    </div>

    <div className="h-[5%]"></div>
    </div>
  )
}
