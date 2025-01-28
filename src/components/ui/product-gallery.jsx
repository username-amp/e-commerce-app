import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Image from "next/image";

export default function ProductGallery({imagePaths}) {

    const images = imagePaths;

  return (
    <div>
      {/* product image  */}
                    <section className="flex flex-col">
                      <Image
                        src={images[0]||'/productImg.png'}
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
    </div>
  )
}
