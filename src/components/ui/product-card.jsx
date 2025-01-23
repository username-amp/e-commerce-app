import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function ProductCard({ imageUrl, name, price, sold, ratings }) {
  // Set a default rating if `ratings` is not provided
  const rating = ratings || 3.0; // Default to 3 if no rating is passed

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
    <div className="w-56 h-auto mb-2">
      <Card className="flex flex-col h-full rounded-none">
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
            <h1 className="ml-2 font-bold text-lg">{name || "Product Name"}</h1>
            <h2 className="ml-2 font-semibold text-[#37A6D8] text-lg">
              {price ? `₱${price.toFixed(2)}` : "₱0.00"}
            </h2>

            <div className="flex justify-between items-center mt-2">
              <h3 className="ml-2 text-sm font-medium text-muted-foreground">
                {sold || "+0 sold"}
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
