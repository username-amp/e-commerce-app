"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";

import UserDashboardHeader from "@/components/ui/header";
import StoreProfile from "@/components/ui/store-profile";
import ProductGallery from "@/components/ui/product-gallery";
import {
  ProductDescription,
  ProductDetails,
  ProductSpecification,
  ProductTestimonials,
} from "@/components/ui/product-details";

// Fetch utilities and query
import fetchGraphQL from "@/utils/fetchGraphQL";
import { GET_PRODUCT_BY_ID_QUERY } from "@/graphql/queries/getProductById";

export default function Page({ params }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const result = await fetchGraphQL(GET_PRODUCT_BY_ID_QUERY, { _id: id });

        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        const response = result.data.getProductById;

        if (response.code !== "200") {
          throw new Error(response.message);
        }

        setProduct(response.data?.[0] || null); // FIX: Ensure product is an object
      } catch (error) {
        setError(`Failed to fetch product data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) {
    return <div className="text-center p-8">Loading product details...</div>;
  }

  if (error) {
    return <div className="text-red-500text-center p-8">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center p-8">Product not found</div>;
  }

  return (
    <div>
      <UserDashboardHeader />

      <div className="flex h-screen w-full flex-col">
        <div className=" bg-gray-100 h-auto p-10 w-full flex justify-center items-center flex-col gap-5">
          <div className="flex flex-row justify-center items-start gap-5">
            {/* Product image collections */}
            <ProductGallery imagePaths={product.images} />{" "}
            {/* pasa mo nlang yung imagePaths or mismong image file from db */}
            {/* Product details */}
            <ProductDetails
              name={product.name}
              price={product.price}
              ratings={product.ratings}
              sold={product.solds}
            />
          </div>
          <Separator className="bg-gray-200 w-2/3" />

          {/* Seller profile */}
          <StoreProfile
            StoreName={"Techzone"}
            verified={true}
            ratings={4.19}
            sold={43.3}
            products={100}
            joined_At={"1 year ago"}
            storePath={"#"}
          />

          <Separator className="bg-gray-200 w-2/3" />
          {/* Product specifications */}
          <ProductSpecification
            category={product.category}
            stocks={product.stock}
            hasWarranty={product.hasWarranty}
            warrantyType={product.warrantyType}
            warrantyDuration={product.warrantyDuration}
            shipsFrom={product.shipsFrom}
          />

          <Separator className="bg-gray-200 w-2/3" />
          {/* Product description */}
          <ProductDescription descriptions={product.description} />

          <Separator className="bg-gray-200 w-2/3" />
          {/* Product testimonials */}
          <ProductTestimonials testimonials={product.testimonials || []} />
        </div>
      </div>
    </div>
  );
}
