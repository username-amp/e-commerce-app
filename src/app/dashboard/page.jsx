"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

// Components
import DashboardBanner from "@/components/ui/dashboard-banner";
import ProductCard from "@/components/ui/product-card";
import Categories from "@/components/ui/categories";
import UserDashboardHeader from "@/components/ui/header";
import UserDashFooter from "@/components/ui/footer";

// Fetch utilities and query 
import fetchGraphQL from "@/utils/fetchGraphQL";
import { GET_HOME_PRODUCTS_QUERY } from "@/graphql/queries/getHomeProducts";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch home products
  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        const response = await fetchGraphQL(GET_HOME_PRODUCTS_QUERY);
        const { data, errors } = response;

        if (errors) {
          setError(errors[0].message);
          return;
        }

        const homeProducts = data?.displayProduct?.data || [];
        setProducts(homeProducts);
      } catch (error) {
        setError("Failed to fetch home products");
        console.error("Error fetching home products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeProducts();
  }, []);

  // Handle adding more products with delay
  const loadMoreProducts = () => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      setProducts((prevProducts) => [
        ...prevProducts,
        ...Array.from({ length: 10 }, (_, i) => ({
          _id: `mock-${prevProducts.length + i + 1}`,
          name: `Product ${prevProducts.length + i + 1}`,
          images: ["/productImg.png"],
          price: (prevProducts.length + i + 1) * 10,
          solds: (prevProducts.length + i + 1) * 100,
          rating: (prevProducts.length + i + 1) % 5,
        })),
      ]);
      setLoading(false);
    }, 2000); // 2 sec nalang gar para masarap
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
          <Separator
            orientation="horizontal"
            className="w-full h-1 bg-[#2B8FD8] rounded-sm"
          />

          {/* Error message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

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
              : products.map((product) => (
                  <ProductCard
                    key={product._id}
                    imageUrl={product.images?.[0] || "/placeholder.png"}
                    name={product.name}
                    price={product.price}
                    sold={product.solds}
                    ratings={product.ratings || 0}
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
