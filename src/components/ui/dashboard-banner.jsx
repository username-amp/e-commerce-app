import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";


export default function DashboardBanner() {
    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  const imagePaths = [
    '/banner3.png',
    '/banner4.png',
    '/banner5.png'
  ];


  return (
    <div className="w-full h-sceen">
        <div className="grid grid-cols-6   gap-1 w-full max-w-screen-xl justify-center mx-auto">
            <div className="col-span-4 row-span-2  w-full h-full">
              <Carousel
                plugins={[plugin.current]}
                className="w-full "
             
              >
                <CarouselContent>
          {imagePaths.map((imagePath, index) => (
            <CarouselItem key={index} >
              {/* Carousel Item Content */}
             <div className="w-full h-64 relative"> 
              <Image
                src={imagePath}
                alt="Banner Image"
                layout="fill"
                objectFit="cover"
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
    </div>
  )
}
