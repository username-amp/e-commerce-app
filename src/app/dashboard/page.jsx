"use client";  

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

import Image from 'next/image'; 

export default function Page() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  const imagePaths = [
    '/banner3.png',
    '/banner4.png',
    '/banner5.png'
  ];

  const categories = [
    {
      imagePath : '',
      label: 'Mobiles'
    },
     {
      imagePath : '',
      label: 'Laptops'
    },
     {
      imagePath : '',
      label: 'Tablets'
    },
     {
      imagePath : '',
      label: 'Desktops'
    },
    {
      imagePath : '',
      label: 'Controllers'
    },
    {
      imagePath : '',
      label: 'GPU'
    },
    {
      imagePath : '',
      label: 'Processors'
    },
    {
      imagePath : '',
      label: 'Accesories'
    },
    {
      imagePath : '',
      label: 'SmartTV'
    },

    {
      imagePath : '',
      label: 'Playstation'
    },
    {
      imagePath : '',
      label: 'Monitors'
    },
    
  ];
  
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
      {/* Sub Header */}
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

    
<div className="flex justify-center items-center w-full h-sceen mt-5 flex-col ">
  {/* Banner */}
  <div className="grid grid-cols-6   gap-1 w-full max-w-screen-xl justify-center mx-auto">
    <div className="col-span-4 row-span-2  w-full h-full relative">
      <Carousel
        plugins={[plugin.current]}
      className="w-full "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
  {imagePaths.map((imagePath, index) => (
    <CarouselItem key={index} className="relative">
      {/* Carousel Item Content */}
      <div className=" w-full  relative">
        <Image
          src={imagePath}
          alt={`Carousel Image ${index + 1}`}
          objectFit="cover" 
          height={500}
          width={2000}
        />
      </div>

     
    </CarouselItem>
  ))}
</CarouselContent>
      <div className="absolute top-1/2 left-16 transform -translate-y-1/2 z-10">
        <CarouselPrevious className="bg-white text-black rounded-full p-2 shadow-lg" />
      </div>

      <div className="absolute top-1/2 right-16 transform -translate-y-1/2 z-10">
        <CarouselNext className="bg-white text-black rounded-full p-2 shadow-lg" />
      </div>
      </Carousel>
    </div>

    <div className="col-span-2 row-span-1 h-full ">
      <div className=" w-full h-full  relative">
        <Image
          src={'/banner1.png'}
          alt={`banner Image`}
          objectFit="cover" 
          layout="fill"
        />
      </div>
    </div>
    <div className="col-span-2 row-span-1">
      <div className=" w-full h-full  relative">
        <Image
          src={'/banner2.png'}
          alt={`banner Image`}
          objectFit="cover" 
          layout="fill"
        />
      </div>
    </div>
  </div>

  {/* Categories */}
  <div className="flex w-full max-w-screen-xl flex-col">
  <h2 className="font-medium text-muted-foreground text-3xl pt-5 pb-3">Categories</h2>
  <div className="flex w-full flex-row gap-3 overflow-x-auto">
    {/* Categories Card */}
    {categories.map((category, index) => {
      return (
        <Card key={index} className="w-28 h-28 bg-white text-wrap">
          <CardContent className="p-2 flex flex-col justify-center items-center">
            <div className="bg-black">
              {/*  image */}
            </div>
            <h1 className="text-black text-sm font-semibold text-center truncate break-words">
              {category.label}
            </h1>
          </CardContent>
        </Card>
      );
    })}
  </div>
</div>
</div>

    </div>
  );
}