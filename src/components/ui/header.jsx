// Icons
import { LuCodesandbox } from "react-icons/lu"
import { TbSwitchHorizontal } from "react-icons/tb";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";

// CN Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input"

import Link from "next/link";

export const LogoHeader = () => {
    return (
        <div>
            <div className="flex flex-row items-start justify-start lg:min-w-min self-start bg-transparent p-0 mb-2">
                <LuCodesandbox size={45} className="text-white"/>
                <h1 className="decoration-4 text-white text-5xl ml-1 font-aileron font-black">Techzone.</h1>
            </div>
            <p className="text-base mt-0 text-white font-aileron font-semibold">Giving electronics a second life, delivered to you.</p>
        </div>
    )
}


export const Logo = () => {
    return (
        <div>
            <div className="flex flex-row items-center lg:min-w-min self-start bg-transparent p-0 mb-2">
                <LuCodesandbox size={30} className="text-white"/>
                <h1 className=" text-white text-3xl ml-1 font-aileron font-black">Techzone.</h1>
            </div>
        </div>
    )
}




export default function UserDashboardHeader() {
  return (
    <div>
      <div className="flex items-center justify-between flex-row-reverse gap-5 pr-12 pl-10 pt-1 w-full bg-[#37A6D8]">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover: text-gray-700">
                <Link href={"/dashboard/profile"}>Profile</Link>
              </DropdownMenuItem >
              <DropdownMenuItem className="hover: text-gray-700">
                <Link href={"#"}>Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover: text-gray-700">
                <Link href={"/signin"}>Sign out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2">
          {/* Link to seller mode */}
          <Link href="#" className="text-white font-medium text-xs flex items-center hover:text-emerald-300 ">
            <TbSwitchHorizontal size={18} className="mr-1" />
            <span>Switch to seller</span>
          </Link>
          {/* Link to help */}
          <Separator orientation="vertical" className="h-5 bg-white" />
          <Link href="#" className="text-white font-medium text-xs flex items-center hover:text-gray-200">
            <IoIosHelpCircleOutline size={18} className="mr-1" />
            <span>Help</span>
          </Link>
        </div>
      </div>
      {/* Sub Header */}
      <div className="flex justify-center w-full h-20 bg-[#37A6D8]">
        <div className="flex items-center justify-evenly w-full h-full mr-80 ml-40 gap-10">
          <Logo />

          {/* Search bar */}
          <div className="flex flex-1 items-center">
            <Input type="text" placeholder="Search..." className="rounded-none bg-white" />
            <Button type="submit" className="rounded-none bg-[#2B8FD8] hover:bg-[#37A6D8]">
              <FaSearch />
            </Button>
          </div>

          {/* Cart */}
          <div>
            <Link href={"#"}><MdShoppingCart size={30} color="white" /></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
