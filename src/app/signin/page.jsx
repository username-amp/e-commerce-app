import { LoginForm } from "@/components/ui/login-form"
import { LogoHeader } from "@/components/ui/header"

export default function Page() {
  return (
    <div className="h-screen">
      <div className="grid  lg:grid-cols-2 h-[95%]" style={{ backgroundImage: 'url("/BG.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="flex flex-1 items-center justify-center">
        <LogoHeader />      
      </div>

      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg animate-fade-left animate-once animate-delay-[1ms] animate-normal ">
              <LoginForm />
          </div>
        </div>
      </div>
    </div>

    <div className="h-[5%]"></div>
    </div>
  )
}
