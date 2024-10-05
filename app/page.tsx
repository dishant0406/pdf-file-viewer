"use client"
import { cn } from "@/lib/utils";

import PDFViewer from "@/components/PDFViewer";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRef, useState } from "react";

export default function Home() {
  const [files, setFiles] = useState<{
    file: File;
    type: "pdf" | "image";
  }[]>([]);
  const [activeFile, setActiveFile] = useState<{
    file: File;
    type: "pdf" | "image";
  } | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);



  return (
   <div className="w-full min-h-[100dvh] flex justify-center items-center">
    <input  ref={ref} type="file" multiple onChange={(e) => {
      if (!e.target.files) return;
      const files = Array.from(e.target.files);
      const processedFiles = files.map((file) => {
        return {
          file,
          type: (file.type.includes("pdf") ? "pdf" : "image") as "pdf" | "image",
        };
      })
      setFiles(existingFiles => [...existingFiles, ...processedFiles]);
      setActiveFile({
        file: files?.[0],
        type: files?.[0].type.includes("pdf") ? "pdf" : "image",
      });
    }} 
    accept="application/pdf,image/*"
    className="hidden" />
   {files.length<1 &&  <Button onClick={()=>{
      ref.current?.click();
    }}>
      Select PDF or Image Files
    </Button>}
    {activeFile && activeFile.type === "pdf" && (
      <PDFViewer pdfSource={activeFile.file} />
    )}
    {activeFile && activeFile.type === "image" && (
      <img 
      className="max-w-[90vw] max-h-[90vh] object-contain"
      src={URL.createObjectURL(activeFile.file)} alt={activeFile.file.name} />
    )}
    <div className={cn("w-[20vw] z-10 bg-background transition-all duration-200 h-[100vh] fixed top-0  border border-input", {
      "right-0": isOpen,
      "right-[-20vw]": !isOpen,
    })}>
      <div className="w-fullrelative h-full p-[1rem]">
        <div onClick={()=>{
          setIsOpen(!isOpen);
        }} className={cn("p-[0.5rem] z-[100] transition duration-200 cursor-pointer absolute top-[1rem] left-0 transform  w-fit bg-primary border border-input rounded-md", {
          "-translate-x-1/2": isOpen,
          "-translate-x-full rounded-r-none": !isOpen,
        })}>
          <ChevronLeft size={24} className="text-background" />
        </div>
        <div className="flex overflow-y-auto max-h-[90vh] flex-col gap-4">
          <Button onClick={()=>{
            ref.current?.click();
          }
          }>
            Select PDF or Image Files
          </Button>
          {
            files.map((file, index) => {
              return (
                <div key={index} onClick={() => {
                  setActiveFile(file);
                }} className={cn("p-[1rem] cursor-pointer border border-input rounded-md", {
                  "bg-primary text-background": activeFile?.file.name === file.file.name,
                })}>
                  {file.file.name}
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
   </div>
  );
}
