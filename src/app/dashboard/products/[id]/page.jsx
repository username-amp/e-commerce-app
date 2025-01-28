'use client'

import React, { useState, use } from "react";
import UserDashboardHeader from "@/components/ui/header";
import Image from "next/image";
import { Separator } from "@/components/ui/separator"
import { FaShippingFast } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { FaStore } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
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
import Link from "next/link";

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
            <div className=" bg-gray-100 h-auto p-10 w-full flex justify-center items-center flex-col gap-5">
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
                            <div className="absolute top-1/2 left-16 transform -translate-y-1/2 z-10">
                              <CarouselPrevious className="bg-white text-black rounded-full p-2 shadow-lg" />
                            </div>
                      
                            <div className="absolute top-1/2 right-16 transform -translate-y-1/2 z-10">
                              <CarouselNext className="bg-white text-black rounded-full p-2 shadow-lg" />
                            </div>
                          </Carousel>
                      </section>
                    </section>
                    {/* buying details */}
                    <div className="flex justify-start items-start flex-col gap-3 flex-wrap ">
                      {/* product name */}
                      <div className="text-lg font-bold tracking-wider max-w-max w-96 ">
                        <h1 className="text-lg break-words">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam dolores veritatis quae quaerat, consectetur totam temporibus! Nostrum impedit repellat est.</h1>
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
                        <h2 className="font-bold text-3xl text-[#2B8FD8]">₱35</h2>
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
                          <p className="mt-1 ml-3 text-[#2B8FD8] font-bold">₱35</p>
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
                        <div className="flex items-center space-x-2 max-w-sm">
                          <Button onClick={handleDecrement} variant="outline">-</Button>
                          <span className="text-lg w-[20px] text-center">{quantity}</span>
                          <Button onClick={handleIncrement} variant="outline">+</Button>
                        </div>
                      </section>

                        {/* Cart and buy btn */}
                      <section className="flex flex-row w-full gap-3 justify-between mt-2">
                          <Link href={"#"}>
                            <Button  className="h-14 w-56 font-semibold border border-[#2B8FD8] text-[#2B8FD8] hover:text-[#37A6D8] hover:border-[#37A6D8]"    variant="outline" >Add To Cart</Button>
                          </Link>
                          <Link href={"#"}>
                            <Button className="h-14 w-56 hover:text-muted-foreground font-semibold" variant="outline" >Buy Now</Button>
                          </Link>
                      </section>
                      
                      {/* Report link */}
                      <section className="w-full mt-5">
                        <Link href={"#"}>
                          <p className="text-end text-xs text-muted-foreground">Report</p>
                        </Link>
                      </section>
                    </div>
                </div>
                <Separator className="bg-gray-200 w-2/3" />
                
                {/* Seller profile */}
                <section className="flex flex-row items-center justify-center w-2/3 ">
                    <div className="flex flex-row justify-between items-center w-full p-5">
                      <div className="flex flex-row items-center gap-5 ">
                      <div>
                        <div className="rounded-full border border-muted-foreground p-3">
                        <Image
                        src={"/tv.png"}
                        alt="seller photo"
                        height={30}
                        width={30}
                        objectFit="cover"
                        className="rounded-full"
                      />
                      </div>
                      </div>
                      <div>
                      <div className="flex flex-col">
                        <h3 className="font-bold text-md">Techzone.</h3>
                        <div className="flex flex-row items-center">
                          <MdVerified />
                          <span className="font-semibold text-muted-foreground text-sm">Verified</span>
                        </div>
                        <div className="flex mt-2">
                          <Button className="font-semibold border border-[#2B8FD8] text-[#2B8FD8] hover:text-[#37A6D8] hover:border-[#37A6D8]" variant="outline"><FaStore /> View Shop</Button>
                        </div>
                      </div>
                    </div>
                    </div>

                    
                    <div className="flex gap-5">
                          <span className="text-muted-foreground">Ratings</span>
                          <span className="text-green-600">43.3k</span>
                    </div>
                    <div className="flex gap-5">
                          <span className="text-muted-foreground">Solds</span>
                          <span className="text-green-600">43.3k</span>
                    </div>
                    <div className="flex gap-5">
                          <span className="text-muted-foreground">Products</span>
                          <span className="text-green-600">43.3k</span>
                    </div>
                    <div className="flex gap-5">
                          <span className="text-muted-foreground">Joined</span>
                          <span className="text-green-600">1 year ago</span>
                    </div>
                    </div>
                </section>
                <Separator className="bg-gray-200 w-2/3" />
                {/* Product specifications */}
                <section className=" w-2/3 ">
                  <div className="flex flex-col gap-8 ">
                    <h1 className="text-lg font-semibold">Product Specifications</h1>

                    <div className="flex flex-col gap-5 w-72 justify-start">
                      <div className="flex flex-row gap-5 text-sm w-full justify-between">
                        <span className="text-muted-foreground">Category</span>
                        <span>Laptops</span>
                      </div>

                      <div className="flex flex-row gap-5 text-sm w-full justify-between">
                        <span className="text-muted-foreground">Stocks</span>
                        <span>29125</span>
                      </div>

                      <div className="flex flex-row gap-5 text-sm w-full justify-between">
                        <span className="text-muted-foreground">Warranty Duration</span>
                        <span>No Warranty</span>
                      </div>

                      <div className="flex flex-row gap-5 text-sm w-full justify-between">
                        <span className="text-muted-foreground">Warranty Type</span>
                        <span>No Warranty</span>
                      </div>

                      <div className="flex flex-row gap-5 text-sm w-full justify-between items-start">
                        <span className="text-muted-foreground">Ships From</span>
                        <span>Philippines</span>
                      </div>
                    </div>
                  </div>
                </section>
                 <Separator className="bg-gray-200 w-2/3" />
                {/* Product description */}
                 <section className=" w-2/3 ">
                  <div className="flex flex-col gap-8 ">
                    <h1 className="text-lg font-semibold">Product Description</h1>

                    <div className="flex flex-col gap-5 w-full justify-start">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium modi incidunt perferendis vitae minus dignissimos. Deserunt animi voluptas impedit eos non expedita, magni consequatur commodi itaque delectus cupiditate rem suscipit vero odit nostrum quaerat saepe necessitatibus? Natus impedit nobis autem ad modi dolorum, dolor at dignissimos quisquam laudantium quasi vel enim magnam reprehenderit placeat earum inventore? Recusandae quis commodi autem. Nam, placeat inventore! Sequi laudantium blanditiis maiores minima qui unde sit labore harum repellendus eius modi soluta quaerat vero magnam explicabo, provident sunt illum optio ratione autem cum natus ipsa nulla veritatis! Facilis natus nemo perspiciatis enim rerum, dolore numquam!
                    </div>
                  </div>
                </section>
                <Separator className="bg-gray-200 w-2/3" />

                <section className="flex flex-col  w-2/3 gap-10">
                   <h1 className="text-2xl font-semibold">Ratings</h1>  
                    <Separator className="bg-gray-200 w-2/3" />

                    {/* Customers testimonials */}
                      {
                        Array.from({ length: 5 }).map((_, index) => {
                          return (
                            <div className="w-full border border-black rounded-sm p-3" key={index}>
                              <div className="flex flex-row gap-5">
                                <div>
                                  <div className="rounded-full border border-muted-foreground p-3 w-full">
                                    <Image
                                      src={"/tv.png"}
                                      alt="seller photo"
                                      height={30}
                                      width={30}
                                      objectFit="cover"
                                      className="rounded-full"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="flex flex-col w-full">
                                    <h3 className="font-bold text-md">Username</h3>
                                    <div className="flex flex-row w-full ">
                                      <div className="flex gap-1 w-full">
                                        <CiLocationOn />
                                        <span className="text-xs text-muted-foreground"> Philippines, Rizal</span>
                                        <Separator orientation="vertical" className="bg-muted-foreground" />
                                        <span className="text-xs text-muted-foreground">2022-11-22 19:17</span>
                                      </div>
                                    </div>

                                    {/* Customers comments */}
                                    <div className="mt-5">
                                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, consequatur dolore. Tempore, laborum. Minima laboriosam adipisci sit minus totam accusamus enim, maxime ex veritatis dicta voluptates quis? Nulla dignissimos minima inventore suscipit exercitationem libero ipsam voluptatum possimus, vitae vel ratione aliquam atque fugit optio aperiam iusto, sint odio quaerat facilis explicabo enim ipsum repellat molestias. Eligendi aliquid assumenda cupiditate similique doloribus dignissimos esse accusamus ullam voluptatum magni animi, et omnis non quia optio necessitatibus officiis quod, ipsum, tenetur ea inventore quam laudantium reiciendis rerum? Doloremque nulla quaerat dolorum provident eum distinctio accusamus illo! Exercitationem recusandae odit fugit explicabo repellat facilis.
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      }

                </section>
            </div>
        </div>
    </div>
  );
}
