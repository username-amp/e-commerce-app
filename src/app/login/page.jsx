import { LoginForm } from "@/components/ui/login-form"
import { LogoHeader } from "@/components/ui/header"

export default function Page() {
  return (
    <div className="h-screen">
      <LogoHeader />
      <div className="flex flex-col h-[90%] w-full items-center justify-center p-6 md:p-10 bg-[#0339D9]">
      <div className="w-full max-w-sm self-end lg:mr-[10rem] md:self-end sm:self-center mr-0 ">
        <LoginForm />
      </div>
    </div>

    <div className="h-[5%]"></div>
    </div>
  )
}
