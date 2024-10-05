import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import React, { useEffect, useState } from 'react';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface PDFViewerProps {
  pdfSource: File;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfSource }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfFile, setPDFFile] = useState<Uint8Array | string | null>(null);

  useEffect(() => {
    const loadPdf = async () => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          if (event.target && typeof event.target.result === "string") {
            setPDFFile(event.target.result);
          }
        };
        fileReader.readAsDataURL(pdfSource);
    };
    loadPdf();
  }, [pdfSource]);


  if(!pdfFile) {
    return null;
  }

  return (
    <div style={{ height: '90dvh', width:"100%" }}>
      <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
        <Viewer theme={'dark'} fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </div>
  );
};

export default PDFViewer;