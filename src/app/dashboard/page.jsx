"use client";  // This marks the file as a client-side component

import { Logo } from "@/components/ui/header";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from 'next/image'; 
export default function Page() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));


  const imagePaths = [
    '/banner1.jpg',
    '/banner2.jpg',
    '/banner3.jpg'
  ]
  
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
          <Link href="#" className="text-white font-medium text-xs flex items-center hover:text-emerald-300 ">
            <TbSwitchHorizontal size={18} className="mr-1" />
            <span>Switch to seller</span>
          </Link>
          <Separator orientation="vertical" className="h-5 bg-white" />
          <Link href="#" className="text-white font-medium text-xs flex items-center hover:text-gray-200">
            <IoIosHelpCircleOutline size={18} className="mr-1" />
            <span>Help</span>
          </Link>
        </div>
      </div>

      <div className="flex justify-center w-full h-20 bg-[#37A6D8]">
        <div className="flex items-center justify-evenly w-full h-full mr-80 ml-40 gap-10">
          <Logo />

          <div className="flex flex-1 items-center">
            <Input type="text" placeholder="Search..." className="rounded-none bg-white" />
            <Button type="submit" className="rounded-none bg-[#2B8FD8] hover:bg-[#37A6D8]">
              <FaSearch />
            </Button>
          </div>

          <div>
            <Link href={"#"}><MdShoppingCart size={30} color="white" /></Link>
          </div>
        </div>
      </div>

      {/* Main Content with Carousel */}
      <div className="flex justify-center items-center w-screen ">
        <div className="grid grid-cols-12 gap-1 w-full">
          <div className="col-span-10 row-span-2 bg-blue-300 w-full">
            <Carousel
              plugins={[plugin.current]}
              className="w-full"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
              {imagePaths.map((imagePath, index) => (
                <CarouselItem key={index}>
                  <div className="p-1 w-full">
                    <Card>
                      <CardContent className="flex aspect-video items-center justify-center w-fullh-auto relative ">
                        <Image
                          src={imagePath} 
                          alt={`Carousel Image ${index + 1}`} 
                          layout="fill" // Make the image fill the card's area
                          objectFit="cover" // Preserve aspect ratio and cover the entire area
                          className="rounded-md" // Optional: add rounded corners to the image
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="col-span-1 row-span-1 bg-black text-white p-4 flex items-center justify-center">
            fwafw
          </div>
           <div className="col-span-1 row-span-1 bg-black text-white p-4 flex items-center justify-center">
            fwafw
          </div>
        </div>
      </div>
    </div>
  );
}
