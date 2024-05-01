'use client';

import { memo, useState, type FC } from 'react';
import Image from 'next/image';

interface Props {
  imageUrl: string;
}

const CarImage: FC<Props> = memo(({ imageUrl }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Image
      fill
      priority
      alt="image"
      sizes="(max-width:768px) 100vw, (max-width: 1200px) 50vw, 25 vw"
      src={imageUrl}
      onLoadingComplete={() => setIsLoading(false)}
      className={`object-cover group-hover:opacity-75 duration-700 ease-in-out 
        ${isLoading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100'}`}
    />
  );
});

CarImage.displayName = 'CarImage';

export default CarImage;
