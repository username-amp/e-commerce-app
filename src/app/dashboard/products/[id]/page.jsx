import UserDashboardHeader from "@/components/ui/header";
import Image from "next/image";
export default function Page({ params }) {
 
  const { id } = params;

  return (
    <div>
        <UserDashboardHeader />


        <div className="flex h-screen w-full">
            <div className=" bg-gray-500 h-100 w-full">
                <div className="flex flex-row">
                    {/* product image  */}
                    <div className="flex flex-col">
                      <Image
                        src={'/productImg.png'}
                        alt="product"
                        width={500}
                        height={500}
                        objectFit="cover"
                      />

                      {/* Carousel */}
                      <div>
                        <h1>carousel</h1>
                      </div>
                    </div>
                    {/* buying details */}
                    <div className="flex">
                      
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
