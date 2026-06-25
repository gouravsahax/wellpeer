'use client';

import React, { useState, useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface ReccImageProps {
  src: string;
  alt: string;
}

export default function ReccImage({ src, alt }: ReccImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="mt-3 overflow-hidden rounded-lg border border-zinc-800/80 cursor-pointer group relative aspect-video w-full bg-zinc-950 flex items-center justify-center"
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="bg-zinc-900/90 border border-zinc-800 p-2 rounded-full text-white flex items-center gap-1.5 text-xs font-medium shadow-lg scale-95 group-hover:scale-100 transition-transform duration-250">
            <ZoomIn className="w-4 h-4" />
            <span>View Full Image</span>
          </div>
        </div>
      </div>

      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-fade-in"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="absolute top-4 right-4 z-51 text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 p-2 rounded-full border border-zinc-800 transition cursor-pointer"
            title="Close image"
          >
            <X className="w-5 h-5" />
          </button>

          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-full max-h-full flex items-center justify-center"
          >
            <img
              src={src}
              alt={alt}
              className="max-w-[90vw] max-h-[85vh] md:max-w-[85vw] md:max-h-[90vh] object-contain rounded-lg shadow-2xl select-none"
            />
          </div>
        </div>
      )}
    </>
  );
}
