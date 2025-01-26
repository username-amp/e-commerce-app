'use client'

import React, { useState, use } from "react";
import UserDashboardHeader from "@/components/ui/header";
import Image from "next/image";
import { Separator } from "@/components/ui/separator"
import { FaShippingFast } from "react-icons/fa";
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


        <div className="flex h-screen w-full">
            <div className=" bg-gray-200 h-100 w-full">
                <div className="flex flex-row">
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
                      <section>
                        <h1>carousel</h1>
                      </section>
                    </section>
                    {/* buying details */}
                    <div className="flex justify-start items-start flex-col">
                      {/* product name */}
                      <div className="text-lg font-bold tracking-wider">
                        <h1>Product Name</h1>
                      </div>
                      {/* Rates */}
                      <section className="flex h-5 items-center space-x-4 text-sm">
                        <div>
                          {stars.map((star, index) => (
                            <span key={index} className="text-[#f1c232] text-xl">
                              {star === "full" ? "★" : star === "half" ? "✩" : "☆"}
                            </span>
                          ))}
                        </div>
                        <Separator orientation="vertical" className="bg-muted-foreground  " />
                        <div>499 Ratings</div>
                        <Separator orientation="vertical" className="bg-muted-foreground" />
                        <div>1.3k Sold</div>
                      </section>

                      {/* Price */}
                      <section>
                        <h2 className="font-bold text-3xl">₱35</h2>
                      </section>
                      
                      {/* Shipping */}
                      <section className="w-96 flex flex-row justify-between">
                        <p>Shipping</p>
                        <div>
                          <p><FaShippingFast /></p>
                        </div>
                        <div>
                          <p>Shipping To</p>
                          <p>Shipping Fee</p>
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
                          <p>₱35</p>
                        </div>
                      </section>

                      {/* variants */}

                      <section className="flex flex-row justify-between">
                        <p>Variants</p>
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

                      <section>
                        <div className="flex items-center space-x-2">
                          <Button onClick={handleDecrement} variant="outline">-</Button>
                          <span className="text-lg">{quantity}</span>
                          <Button onClick={handleIncrement} variant="outline">+</Button>
                        </div>
                      </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
