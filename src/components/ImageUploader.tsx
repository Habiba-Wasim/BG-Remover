"use client";

import { useState, useRef } from "react";

interface ImageUploaderProps {
  onImageSelectAction: (imageDataUrl: string) => void;
}

export default function ImageUploader({ onImageSelectAction }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof onImageSelectAction === "function") {
          onImageSelectAction(event.target.result as string);
        } else {
          console.error("onImageSelectAction is not defined or not a function");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof onImageSelectAction === "function") {
          onImageSelectAction(event.target.result as string);
        } else {
          console.error("onImageSelectAction is not defined or not a function");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target && typeof onImageSelectAction === "function") {
              onImageSelectAction(event.target.result as string);
            } else {
              console.error("onImageSelectAction is not defined or not a function");
            }
          };
          reader.readAsDataURL(blob);
        }
      }
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput && typeof onImageSelectAction === "function") {
      onImageSelectAction(urlInput);
    } else {
      console.error("onImageSelectAction is not defined or not a function");
    }
  };

  return (
    <div className="card p-8">
      <div
        className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center ${
          isDragging ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/5%)]" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onPaste={handlePaste}
        tabIndex={0}
      >
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-[hsl(var(--primary)/10%)] rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-[hsl(var(--primary))]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Upload an Image</h3>
          <p className="text-gray-500 mb-4">Drag and drop an image, or click to browse</p>
          <button className="btn-primary" onClick={() => fileInputRef.current?.click()}>
            Select Image
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          <p className="text-sm text-gray-500 mt-4">You can also paste an image or provide a URL below</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="url-input" className="form-label">
            Image URL
          </label>
          <div className="flex">
            <input
              id="url-input"
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="input-field rounded-r-none"
            />
            <button
              className="bg-[hsl(var(--primary))] text-white px-4 py-2 rounded-r-md hover:bg-[hsl(var(--primary)/90%)] transition-colors"
              onClick={handleUrlSubmit}
            >
              Load
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">Supported formats: JPG, PNG, WEBP, GIF. Max size: 10MB.</p>
      </div>
    </div>
  );
}
