"use client"

import { cn } from "@/lib/utils";
import { useState } from "react";


export default function Home() {
  const [images, setImages] = useState([
    "https://picsum.photos/id/0/5000/3333",
    "https://picsum.photos/id/1/5000/3333",
    "https://picsum.photos/id/2/5000/3333",
    "https://picsum.photos/id/3/5000/3333",
    "https://picsum.photos/id/4/5000/3333",
  ]);
  const [selectedImage, setSelectedImage] = useState(0);

  return (
   <div className="w-full select-none min-h-[100dvh] flex justify-center items-center">

    <img
      src={images[selectedImage]}
      className="w-full h-full object-contain"
    />
   
   <div className="w-full flex fixed bottom-0 left-0">
    {
      images.map((_, index) => (
        <div
          onClick={() => setSelectedImage(index)}
         
        key={index} className={cn("px-4 py-2 cursor-pointer bg-primary text-secondary border border-input", {
          "bg-secondary text-primary": selectedImage === index,
        })}>
          Image {index}
        </div>
      ))
    }
   </div>
   </div>
  );
}
