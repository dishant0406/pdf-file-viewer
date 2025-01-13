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
    "SURE",
    "VIT",
    "DHA",
    "OVI",
    "MEF",
    "VARN",
    "MYO",
    "BG",
    "MYO_PLUS",
    "ZOLEQ",
    "SR",
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
   
   <div className=" flex fixed bottom-0 left-0">
    {
      images.map((img, index) => (
        <div
          onClick={() => setSelectedImage(index)}
         
        key={index} className={cn("py-2 px-2 text-xs h-fit text-center cursor-pointer bg-primary text-secondary border border-input", {
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
