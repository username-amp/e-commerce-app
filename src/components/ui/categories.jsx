import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";


  

export default function Categories() {
    const categories = [
    {
      imagePath : '/smartphone.png',
      label: 'Mobiles'
    },
     {
      imagePath : '/laptop.png',
      label: 'Laptops'
    },
     {
      imagePath : '/ipad.png',
      label: 'Tablets'
    },
     {
      imagePath : '/pc.png',
      label: 'Desktops'
    },
    {
      imagePath : '/microcontroller.png',
      label: 'Controllers'
    },
    {
      imagePath : '/graphic-card.png',
      label: 'GPU'
    },
    {
      imagePath : '/processor.png',
      label: 'Processors'
    },
    {
      imagePath : '/peripherals.png',
      label: 'Peripherals'
    },
    {
      imagePath : '/tv.png',
      label: 'SmartTV'
    },

    {
      imagePath : '/playstation.png',
      label: 'Playstation'
    },
    {
      imagePath : '/monitor.png',
      label: 'Monitors'
    },
    
  ];

  return (
    <div>
        <div className="flex w-full max-w-screen-xl flex-col">
          <h2 className="font-medium text-muted-foreground text-3xl pt-5 pb-3">Categories</h2>
          <div className="flex w-full flex-row gap-3 overflow-x-auto">
            {/* Categories Card */}
            {categories.map((category, index) => {
              return (
                <Card key={index} className="w-28 h-28 bg-white text-wrap cursor-pointer duration-300 ease-out border shadow-md hover:translate-y-[-5px]">
                  <CardContent className="p-2 flex flex-col justify-between h-full items-center">
                    <div className="h-10">
                      <Image 
                      src={category.imagePath}
                      alt={category.label}
                      width={50}
                      height={50}
                      />
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
  )
}
