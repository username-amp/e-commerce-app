"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton"; 

// Components
import DashboardBanner from "@/components/ui/dashboard-banner";
import ProductCard from "@/components/ui/product-card";
import Categories from "@/components/ui/categories";
import UserDashboardHeader from "@/components/ui/header";
import UserDashFooter from "@/components/ui/footer";

export default function Page() {
  const [products, setProducts] = useState(20); 
  const [loading, setLoading] = useState(false); 

  // Handle adding more products with delay
  const loadMoreProducts = () => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      setProducts((prevProducts) => prevProducts + 10);   
      setLoading(false); 
    }, 5000); // change nlang delay
  };

  return (
    <div>
      {/* Header */}
      <UserDashboardHeader />

      <div className="flex justify-center items-center w-full min-h-screen mt-5 flex-col ">
        {/* Banner */}
        <DashboardBanner />

        {/* Categories */}
        <Categories />

        {/* before products */}
        <div className="flex w-full max-w-screen-xl flex-col">
          <h2 className="font-medium text-[#37A6D8] text-3xl text-center mt-20 pb-3">
            DAILY DISCOVERY
          </h2>
          <Separator orientation="horizontal" className="w-full h-1 bg-[#2B8FD8] rounded-sm" />

          {/* Product cards */}
          <div className="flex flex-row flex-wrap justify-evenly h-auto mt-5">
            {loading
              ? Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="w-[200px] mb-4">
                    <Skeleton className="h-[250px] w-full" /> 
                    <Skeleton className="mt-3 h-[20px] w-[60%]" /> 
                    <Skeleton className="mt-1 h-[15px] w-[40%]" /> 
                  </div>
                ))
              : Array.from({ length: products }).map((_, index) => (
                  <ProductCard
                    key={index}
                    imageUrl="/productImg.png"  
                    name={`Product ${index + 1}`}
                    price={(index + 1) * 10}  
                    solds={`${(index + 1) * 100} sold`} 
                    ratings={(index + 1) % 5}  
                  />
                ))}
          </div>
        </div>

        {/* See more btn */}
        <div className="w-full flex justify-center">
          <Button
            className="w-72 p-5 bg-[#37A6D8] text-white font-bold tracking-wider hover:bg-[#35A6D8] mt-5"
            onClick={loadMoreProducts} 
            disabled={loading} 
          >
            {loading ? "Loading..." : "See more"}
          </Button>
        </div>
      </div>

      {/* Footer */}
       <UserDashFooter />
    </div>
  );
}
