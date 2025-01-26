import React from 'react'
import Link from "next/link";
// Icons
import { RiVisaFill } from "react-icons/ri";
import { LiaCcMastercard } from "react-icons/lia";
import { SiAmericanexpress } from "react-icons/si";
import { FaCcPaypal } from "react-icons/fa6";


export default function UserDashFooter() {

  const ngayongTaon = new Date().getFullYear();
  return (
    <div>
      <footer className="bg-[#37A6D8] text-white py-10 mt-5">
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
            <h4 className="font-bold mb-2">Contact Information</h4>
            <p>Email: support@technozone.com</p>
            <p>Phone: +1 (800) 123-4567</p>
            <p>Address: 123 Tech Street, Silicon Valley, CA, 94043, USA</p>
          </div>

          <div className="footer-section  w-72">
            <h4 className="font-bold mb-2">Payment Methods</h4>
            <div className="flex justify-evenly items-center flex-wrap">
              <p><RiVisaFill size={100}/></p>
              <p><LiaCcMastercard size={100}/></p>
              <p><SiAmericanexpress size={100}/></p>
              <p><FaCcPaypal size={100}/></p>
            </div>
          </div>
        </div>
        <div className="text-center mt-5">
          <p>© {ngayongTaon} TechnoZone. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}
