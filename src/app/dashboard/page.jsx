"use client";  

import { Logo } from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { TbSwitchHorizontal } from "react-icons/tb";
import { IoIosHelpCircleOutline } from "react-icons/io";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardBanner from "@/components/ui/dashboard-banner";
import ProductCard from "@/components/ui/product-card";
import Categories from "@/components/ui/categories";

export default function Page() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between flex-row-reverse gap-5 pr-12 pl-10 pt-1 w-full bg-[#37A6D8]">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"#"}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"#"}>Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"#"}>Sign out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2">
          {/* Link to seller mode */}
          <Link href="#" className="text-white font-medium text-xs flex items-center hover:text-emerald-300 ">
            <TbSwitchHorizontal size={18} className="mr-1" />
            <span>Switch to seller</span>
          </Link>
          {/* Link to help */}
          <Separator orientation="vertical" className="h-5 bg-white" />
          <Link href="#" className="text-white font-medium text-xs flex items-center hover:text-gray-200">
            <IoIosHelpCircleOutline size={18} className="mr-1" />
            <span>Help</span>
          </Link>
        </div>
      </div>
      {/* Sub Header */}
      <div className="flex justify-center w-full h-20 bg-[#37A6D8]">
        <div className="flex items-center justify-evenly w-full h-full mr-80 ml-40 gap-10">
          <Logo />

          {/* Search bar */}
          <div className="flex flex-1 items-center">
            <Input type="text" placeholder="Search..." className="rounded-none bg-white" />
            <Button type="submit" className="rounded-none bg-[#2B8FD8] hover:bg-[#37A6D8]">
              <FaSearch />
            </Button>
          </div>

          {/* Cart */}
          <div>
            <Link href={"#"}><MdShoppingCart size={30} color="white" /></Link>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center w-full min-h-screen mt-5 flex-col ">
        {/* Banner */}
        <DashboardBanner />

        {/* Categories */}
        <Categories />

        <div className="flex w-full max-w-screen-xl flex-col">
          <h2 className="font-medium text-[#37A6D8] text-3xl text-center mt-20 pb-3">DAILY DISCOVERY</h2>
          <Separator orientation="horizontal" className="w-full h-1 bg-[#2B8FD8] rounded-sm" />

          {/* Product cards */}
          <div className="flex flex-row flex-wrap justify-evenly h-auto mt-5">
            {Array.from({ length: 20 }).map((_, index) => (
              <ProductCard
                key={index}
                imageUrl="/productImg.png"  // Use a placeholder image or dynamic URL
                name={`Product ${index +  1}`}
                price={(index + 1) * 10}  // Example price, adjust based on your data
                solds={`${(index + 1) * 100} sold`} // Example sold count
                ratings={(index + 1) % 5}  // Example ratings, adjust based on your data
              />
            ))}
          </div>
        </div>

        
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10 mt-5">
        <div className="container mx-auto flex flex-wrap justify-between">
          <div className="footer-section">
            <h4 className="font-bold mb-2">Quick Links</h4>
            <ul>
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/shop" className="hover:underline">Shop</Link></li>
              <li><Link href="/about" className="hover:underline">About Us</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link href="/faqs" className="hover:underline">FAQs</Link></li>
              <li><Link href="/blog" className="hover:underline">Blog</Link></li>
              <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="font-bold mb-2">Customer Service</h4>
            <ul>
              <li><Link href="/tracking" className="hover:underline">Order Tracking</Link></li>
              <li><Link href="/returns" className="hover:underline">Returns & Exchanges</Link></li>
              <li><Link href="/shipping" className="hover:underline">Shipping Information</Link></li>
              <li><Link href="/payment" className="hover:underline">Payment Options</Link></li>
              <li><Link href="/size-guide" className="hover:underline">Size Guide</Link></li>
              <li><Link href="/gift-cards" className="hover:underline">Gift Cards</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="font-bold mb-2">Connect With Us</h4>
            <ul>
              <li><Link href="#" className="hover:underline">Facebook</Link></li>
              <li><Link href="#" className="hover:underline">Twitter</Link></li>
              <li><Link href="#" className="hover:underline">Instagram</Link></li>
              <li><Link href="#" className="hover:underline">LinkedIn</Link></li>
              <li><Link href="#" className="hover:underline">YouTube</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="font-bold mb-2">Subscribe to Our Newsletter</h4>
            <input type="email" placeholder="Enter your email" className="p-2 rounded" />
            <button className="mt-2 bg-blue-600 hover:bg-blue-500 text-white py-1 px-3 rounded">Subscribe</button>
          </div>

          <div className="footer-section">
            <h4 className="font-bold mb-2">Contact Information</h4>
            <p>Email: support@technozone.com</p>
            <p>Phone: +1 (800) 123-4567</p>
            <p>Address: 123 Tech Street, Silicon Valley, CA, 94043, USA</p>
          </div>

          <div className="footer-section">
            <h4 className="font-bold mb-2">Payment Methods</h4>
            <p>[Visa] [MasterCard] [American Express] [PayPal] [Discover]</p>
          </div>
        </div>
        <div className="text-center mt-5">
          <p>© 2023 TechnoZone. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}