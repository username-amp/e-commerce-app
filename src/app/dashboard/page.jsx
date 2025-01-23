"use client";  

import { Logo } from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { TbSwitchHorizontal } from "react-icons/tb";
import { IoIosHelpCircleOutline } from "react-icons/io";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardBanner from "@/components/ui/dashboard-banner";
import ProductCard from "@/components/ui/product-card";
import Categories from "@/components/ui/categories";
export default function Page() {
  

  
  return (
    <div>
      {/* Header */}
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
              <DropdownMenuItem>
                <Link href={"#"}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"#"}>Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"#"}>Sign out</Link>
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

    
<div className="flex justify-center items-center w-full h-sceen mt-5 flex-col ">
  {/* Banner */}
  <DashboardBanner />

  {/* Categories */}
  <Categories />

  <div className="flex w-full max-w-screen-xl flex-col">
  <h2 className="font-medium text-[#37A6D8] text-3xl text-center mt-20 pb-3">DAILY DISCOVERY</h2>
  <Separator orientation="horizontal" className="w-full h-1 bg-[#2B8FD8] rounded-sm" />

  {/* Product cards */}
  <div className="flex flex-row flex-wrap justify-evenly h-screen  mt-5">
    {Array.from({ length: 20 }).map((_, index) => (
      <ProductCard
        key={index}
        imageUrl="/productImg.png"  // Use a placeholder image or dynamic URL
        name={`Product ${index + 1}`}
        price={(index + 1) * 10}  // Example price, adjust based on your data
        solds={`${(index + 1) * 100} sold`} // Example sold count
        ratings={(index + 1) % 5}  // Example ratings, adjust based on your data
      />
    ))}
  </div>
</div>

</div>

    </div>
  );
}