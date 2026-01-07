import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;

      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <>
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-6">{title}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => openModal(index)}
              className="relative aspect-video rounded-lg overflow-hidden hover-elevate active-elevate-2 group"
              data-testid={`gallery-image-${index}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeModal}
          data-testid="gallery-modal"
        >
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={closeModal}
            data-testid="button-close-gallery"
          >
            <X className="h-6 w-6" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="absolute left-4 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            data-testid="button-prev-image"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="absolute right-4 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            data-testid="button-next-image"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          <div 
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              className="w-full h-auto rounded-lg"
              data-testid="gallery-modal-image"
            />
            <p className="text-white text-center mt-4">
              {selectedImage + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
