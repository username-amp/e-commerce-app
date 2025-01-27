'use client'

import React, { useState, use } from "react";
import UserDashboardHeader from "@/components/ui/header";
import Image from "next/image";
import { Separator } from "@/components/ui/separator"
import { FaShippingFast } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";

export default function Page({ params }) {
 
  const { id } = use(params);
  const [quantity, setQuantity] = useState(1); 

  const rating =  3.0; // Default to 3 if no rating is passed

  // Create the star rating system
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push("full");
    } else if (i === Math.floor(rating) + 1 && rating % 1 !== 0) {
      stars.push("half");
    } else {
      stars.push("empty");
    }
  }


  const handleIncrement = () => setQuantity(quantity + 1); 
  const handleDecrement = () => setQuantity(Math.max(1, quantity - 1));

  return (
    <div>
        <UserDashboardHeader />


        <div className="flex h-screen w-full flex-col">
            <div className=" bg-gray-200 h-full w-full flex justify-center items-center">
                <div className="flex flex-row justify-center items-start gap-5">
                    {/* product image  */}
                    <section className="flex flex-col">
                      <Image
                        src={'/productImg.png'}
                        alt="product"
                        width={500}
                        height={500}
                        objectFit="cover"
                      />

                      {/* Carousel */}
                      <section className="w-full">
                         <Carousel
                            opts={{
                              align: "start",
                            }}
                            className="w-full "
                          >
                            <CarouselContent>
                              {Array.from({ length: 5 }).map((_, index) => (
                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                  <div className="p-1">
                                    <Card>
                                      <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-3xl font-semibold">{index + 1}</span>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                          </Carousel>
                      </section>
                    </section>
                    {/* buying details */}
                    <div className="flex justify-start items-start flex-col gap-3">
                      {/* product name */}
                      <div className="text-lg font-bold tracking-wider">
                        <h1>Product Name</h1>
                      </div>
                      {/* Rates */}
                      <section className="flex h-5 items-center space-x-4 text-sm ">
                        <div>
                          {stars.map((star, index) => (
                            <span key={index} className="text-[#f1c232] text-xl">
                              {star === "full" ? "★" : star === "half" ? "✩" : "☆"}
                            </span>
                          ))}
                        </div>
                        <Separator orientation="vertical" className="bg-muted-foreground  " />
                        <div>499 <span className="text-sm text-muted-foreground">Ratings</span></div>
                        <Separator orientation="vertical" className="bg-muted-foreground" />
                        <div>1.3k <span className="text-sm text-muted-foreground">Sold</span></div>
                      </section>

                      {/* Price */}
                      <section>
                        <h2 className="font-bold text-3xl">₱35</h2>
                      </section>
                      
                      {/* Shipping */}
                      <section className="w-full flex flex-row justify-between gap-5 mt-2">
                        <p className="text-sm text-muted-foreground">Shipping</p>
                        <div>
                          <p><FaShippingFast /></p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Shipping To</p>
                          <p className="text-sm text-muted-foreground">Shipping Fee</p>
                        </div>
                        <div>
                          <Select className="border-none">
                            <SelectTrigger className="w-[180px] h-5">
                              <SelectValue placeholder="address" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Address</SelectLabel>
                                <SelectItem value="apple">Rizal</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <p className="mt-1 ml-3">₱35</p>
                        </div>
                      </section>

                      {/* variants */}
                      <section className="flex flex-row justify-between gap-16 mt-2">
                        <p className="text-sm text-muted-foreground">Variants</p>
                          <Select className="border-none">
                            <SelectTrigger className="w-[180px] h-5">
                              <SelectValue placeholder="Variant" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Variants</SelectLabel>
                                <SelectItem value="apple">Rizal</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                      </section>

                        {/* Quantity */}
                      <section className="flex flex-row justify-between w-56 items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Quantity</p>
                      </div>
                        <div className="flex items-center space-x-2">
                          <Button onClick={handleDecrement} variant="outline">-</Button>
                          <span className="text-lg">{quantity}</span>
                          <Button onClick={handleIncrement} variant="outline">+</Button>
                        </div>
                      </section>

                        {/* Cart and buy btn */}
                      <section className="flex flex-row w-full gap-3 justify-between">
                          <Button  className="h-14 w-56" variant="outline" >Add To Cart</Button>
                          <Button className="h-14 w-56" variant="outline" >Buy Now</Button>
                      </section>
                    </div>
                </div>
            </div>
            <div className="h-72 w-full bg-black">

            </div>
        </div>
    </div>
  );
}
