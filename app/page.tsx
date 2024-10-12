"use client"

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

/*
SB
DIOL
DIDO
MET
GEST
NORM
LET
CAL
FOL
NVP
IRO
THANKYOU
*/

export default function Home() {
  const [images] = useState([
    "SB",
    "DIOL",
    "DIDO",
    "MET",
    "GEST",
    "NORM",
    "LET",
    "CAL",
    "FOL",
    "NVP",
    "IRO",
    "END"
  ]);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    //double tap or click to fullscreen
    const handleDoubleClick = () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    };
    window.addEventListener("dblclick", handleDoubleClick);
    //double tap on mobile
    window.addEventListener("touchstart", (e) => {
      if (!e.touches.length) return;
      if (e.touches.length === 2) {
        handleDoubleClick();
      }
    });
    return () => {
      window.removeEventListener("dblclick", handleDoubleClick);
      window.removeEventListener("touchstart", handleDoubleClick);
    };
  }
  , []);

  return (
   <div className="w-full select-none h-[100dvh] flex justify-center items-center">

    <img
      src={`/${images[selectedImage]}.webp`}
      className="w-auto h-full object-contain"
    />
   
   <div className="h-full flex flex-col fixed top-0 right-0">
    {
      images.map((img, index) => (
        <div
          onClick={() => setSelectedImage(index)}
         
        key={index} className={cn("py-2 text-xs text-center cursor-pointer bg-primary text-secondary border border-input", {
          "bg-secondary text-primary": selectedImage === index,
        })}>
          {img}
        </div>
      ))
    }
   </div>
   </div>
  );
}
