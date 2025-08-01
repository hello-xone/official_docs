import React, { useState, useRef, useEffect } from 'react';

const ImageViewer = ({ src, alt, thumbnailClass }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const overlayRef = useRef(null);

  const handleOpen = () => {
    setIsOpen(true);
    setIsLoading(true);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overlayRef.current && overlayRef.current === event.target) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <img
        src={src}
        alt={alt}
        onClick={handleOpen}
        className={`cursor-zoom-in mt-2 transition-transform hover:scale-105 ${thumbnailClass}`}
      />

      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
        >
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-white text-3xl hover:text-gray-300 transition-colors"
            aria-label="关闭大图"
          >
            &times;
          </button>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}

          <img
            src={src}
            alt={alt}
            onLoad={handleImageLoad}
            className={`max-w-full max-h-screen object-contain transition-all duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </div>
      )}
    </>
  );
};

export default ImageViewer;
