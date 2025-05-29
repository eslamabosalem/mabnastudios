'use client';
import { useState } from 'react';
import Image from 'next/image';

const images = [
  '/images/property1.jpg',
  '/images/property2.jpg',
  '/images/property3.jpg',
  '/images/property4.jpg',
];

export default function RealEstateImageGallery() {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Main Image */}
      <div className="flex-1">
        <Image
          src={mainImage}
          alt="Property Image"
          width={800}
          height={600}
          className="w-full h-auto rounded shadow"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex md:flex-col gap-4 md:w-32 overflow-x-auto">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setMainImage(img)}
            className={`border rounded overflow-hidden ${
              mainImage === img ? 'border-blue-500' : 'border-gray-300'
            }`}
          >
            <Image src={img} alt={`Thumb ${index}`} width={100} height={80} />
          </button>
        ))}
      </div>
    </div>
  );
}
