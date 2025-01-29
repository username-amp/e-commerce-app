import React from 'react'
import Link from 'next/link'
import { MdVerified } from "react-icons/md";
import { FaStore } from "react-icons/fa";
import { VscUnverified } from "react-icons/vsc";

import { Button } from "@/components/ui/button";
import Image from 'next/image';
export default function StoreProfile({StoreName, verified, ratings, sold, products, joined_At, storePath}) {

 

  return (
    <div className='w-full flex justify-center'>
      <section className="flex flex-row items-center justify-center w-2/3 ">
                          <div className="flex flex-row justify-between items-center w-full p-5">
                            <div className="flex flex-row items-center gap-5 ">
                            <div>
                              <div className="rounded-full border border-muted-foreground p-3">
                              <Image
                              src={"/tv.png"}
                              alt="seller photo"
                              height={30}
                              width={30}
                              objectFit="cover"
                              className="rounded-full"
                            />
                            </div>
                            </div>
                            <div>
                            <div className="flex flex-col">
                              <h3 className="font-bold text-md">{StoreName}</h3>
                              <div className="flex flex-row items-center">
                                {verified ? <MdVerified /> : <VscUnverified />}
                                <span className="font-semibold text-muted-foreground text-sm">{verified ? 'Verified' : 'Unverified'}</span>
                              </div>
                              <div className="flex mt-2">
                                <Link href={storePath}>
                                  <Button className="font-semibold border border-[#2B8FD8] text-[#2B8FD8] hover:text-[#37A6D8] hover:border-[#37A6D8]" variant="outline"><FaStore /> View Shop</Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                          </div>
      
                          
                          <div className="flex gap-5">
                                <span className="text-muted-foreground">Ratings</span>
                                <span className="text-green-600">{ratings}k</span>
                          </div>
                          <div className="flex gap-5">
                                <span className="text-muted-foreground">Solds</span>
                                <span className="text-green-600">{sold}k</span>
                          </div>
                          <div className="flex gap-5">
                                <span className="text-muted-foreground">Products</span>
                                <span className="text-green-600">{products}</span>
                          </div>
                          <div className="flex gap-5">
                                <span className="text-muted-foreground">Joined</span>
                                <span className="text-green-600">{joined_At}</span>
                          </div>
                          </div>
                      </section>
    </div>
  )
}
