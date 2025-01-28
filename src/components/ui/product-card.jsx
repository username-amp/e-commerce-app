import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function ProductCard({ imageUrl, name, price, sold, ratings }) {
  // Set a default rating if `ratings` is not provided
  const rating = ratings || 0; // fallback to 0 if `ratings` is null

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

  return (
    <div className="w-56 h-auto mb-2  ">
      <Card className="flex flex-col h-auto rounded-none duration-300 ease-out border shadow-md hover:translate-y-[-5px] cursor-pointer ">
        <CardContent className="relative flex-1 p-0">
          {/* Product image */}
          <div className="h-40 relative">
            <Image
              src={imageUrl || "/productImg.png"}
              alt={name || "product"}
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Product details */}
          <div className="mt-1 p-2">
            <p className="ml-2 text-md truncate overflow-hidden w-full block text-ellipsis">
              {name || "Product Name"}
            </p>
            <h2 className="ml-2 font-semibold text-[#37A6D8] text-lg">
              {price ? `₱${price.toFixed(2)}` : "₱0.00"}
            </h2>

            <div className="flex justify-between items-center mt-2">
              <h3 className="ml-2 text-sm font-medium text-muted-foreground">
                {sold ? `${sold} sold` : "+0 sold"}
              </h3>

              {/* Display stars */}
              <div className="flex ml-2">
                {stars.map((star, index) => (
                  <span key={index} className="text-[#f1c232] text-xl">
                    {star === "full" ? "★" : star === "half" ? "✩" : "☆"}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
