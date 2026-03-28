import React, { useState, useRef } from 'react';
import { Upload, X, Check, FileImage, AlertCircle, ChevronLeft, Trash2, Eye } from 'lucide-react';
import { Button } from '../ui/Material';
import { MobileFrame } from '../layout/MobileFrame';
import { IMAGES } from '../../lib/data';
import { toast } from 'sonner@2.0.3';

interface UploadScannerScreenProps {
  navigate: (screen: number) => void;
}

export const UploadScannerScreen: React.FC<UploadScannerScreenProps> = ({ navigate }) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    setUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (newImages.length === files.length) {
              setUploadedImages([...uploadedImages, ...newImages]);
              setUploading(false);
              toast.success(`${files.length} image(s) uploaded successfully`);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }, 800);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
    toast.success('Image removed');
  };

  const processImages = () => {
    if (uploadedImages.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }
    
    toast.success('Images sent for AI analysis');
    setTimeout(() => {
      navigate(46); // Go to AI Scanner screen
    }, 1000);
  };

  return (
    <MobileFrame
      title="Upload X-Ray Scans"
      showBack={true}
      onBack={() => navigate(36)}
      role="doctor"
    >
      <div className="flex flex-col h-full bg-slate-50 font-sans">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-slate-200">
          <h1 className="text-xl font-bold text-slate-900">Upload Scanner Images</h1>
          <p className="text-sm text-slate-500 mt-1">Upload X-ray scans for AI-assisted diagnosis</p>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-24">
          {/* Upload Zone */}
          <div
            className={`relative border-2 border-dashed rounded-2xl p-8 transition-all ${
              dragging
                ? 'border-[#2563EB] bg-blue-50'
                : uploadedImages.length > 0
                ? 'border-green-300 bg-green-50'
                : 'border-slate-300 bg-white'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="flex flex-col items-center text-center">
              {uploading ? (
                <>
                  <div className="w-16 h-16 bg-[#2563EB] rounded-full flex items-center justify-center mb-4 animate-pulse">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-bold text-slate-900">Uploading...</p>
                  <p className="text-sm text-slate-500 mt-1">Please wait</p>
                </>
              ) : uploadedImages.length > 0 ? (
                <>
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-bold text-slate-900">{uploadedImages.length} image(s) uploaded</p>
                  <p className="text-sm text-slate-500 mt-1">Add more or proceed to analysis</p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outlined"
                    className="mt-4 border-[#2563EB] text-[#2563EB] hover:bg-blue-50"
                  >
                    <Upload className="w-4 h-4 mr-2" /> Add More Images
                  </Button>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="font-bold text-slate-900 mb-2">Drop images here or click to browse</p>
                  <p className="text-sm text-slate-500 mb-4">Supports JPEG, PNG, DICOM formats</p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-[#2563EB] hover:bg-blue-700"
                  >
                    <Upload className="w-4 h-4 mr-2" /> Select Images
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Uploaded Images Grid */}
          {uploadedImages.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <FileImage className="w-5 h-5 text-[#2563EB]" />
                Uploaded Images ({uploadedImages.length})
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                {uploadedImages.map((img, index) => (
                  <div
                    key={index}
                    className="relative bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 group"
                  >
                    <div className="aspect-square bg-black flex items-center justify-center">
                      <img
                        src={img}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover opacity-80"
                      />
                    </div>
                    
                    {/* Actions Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedImage(img)}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors"
                      >
                        <Eye className="w-5 h-5 text-[#2563EB]" />
                      </button>
                      <button
                        onClick={() => removeImage(index)}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>

                    <div className="p-2 bg-white border-t border-slate-100">
                      <p className="text-xs text-slate-600 font-medium truncate">
                        Image {index + 1}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Doctor Access Only</h3>
              <p className="text-xs text-slate-600">
                This upload feature is restricted to doctors for direct image upload and AI analysis.
                All uploads are automatically sent for AI-assisted diagnosis.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 shadow-lg">
          <div className="flex gap-3">
            <Button
              variant="outlined"
              onClick={() => navigate(36)}
              className="flex-1 h-12 border-slate-300 text-slate-700 font-bold"
            >
              Cancel
            </Button>
            <Button
              onClick={processImages}
              disabled={uploadedImages.length === 0}
              className="flex-1 h-12 bg-[#2563EB] hover:bg-blue-700 font-bold shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="w-5 h-5 mr-2" />
              Process Images ({uploadedImages.length})
            </Button>
          </div>
        </div>

        {/* Image Preview Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </MobileFrame>
  );
};