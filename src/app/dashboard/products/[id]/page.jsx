'use client'

import React, { use } from "react";;
import { Separator } from "@/components/ui/separator"

import UserDashboardHeader from "@/components/ui/header";
import StoreProfile from "@/components/ui/store-profile";
import ProductGallery from "@/components/ui/product-gallery";
import {ProductDescription, ProductDetails, ProductSpecification, ProductTestimonials} from "@/components/ui/product-details";

export default function Page({ params }) {
 
  const { id } = use(params);


  return (
    <div>
        <UserDashboardHeader />


        <div className="flex h-screen w-full flex-col">
            <div className=" bg-gray-100 h-auto p-10 w-full flex justify-center items-center flex-col gap-5">
                <div className="flex flex-row justify-center items-start gap-5">

                    {/* Product image collections */}
                    <ProductGallery imagePaths={[]}  />  {/* pasa mo nlang yung imagePaths or mismong image file from db */} 

                    {/* Product details */}
                    
                    <ProductDetails />
            
                </div>
                <Separator className="bg-gray-200 w-2/3" />
                
                {/* Seller profile */}
                <StoreProfile StoreName={"Techzone"} verified={true} ratings={4.19} sold={43.3} products={100} joined_At={'1 year ago'}/>

                <Separator className="bg-gray-200 w-2/3" />
                {/* Product specifications */}
                <ProductSpecification />

                 <Separator className="bg-gray-200 w-2/3" />
                {/* Product description */}
                 <ProductDescription />

                <Separator className="bg-gray-200 w-2/3" />
                {/* Product testimonials */}
                <ProductTestimonials />
            </div>
        </div>
    </div>
  );
}
