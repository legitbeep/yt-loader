import { useState } from "react";
import { Skeleton } from "@chakra-ui/skeleton";
import Image from "next/image";

const CustomImage = ({ image }: { image: string }) => {
  const [loading, setLoading] = useState(true);

  const handleComplete = (e: any) => setLoading(false);
  return (
    <>
      {loading && <Skeleton height="100%" width="100%" />}
      <Image
        aria-label="video thumbnail"
        src={image}
        alt="video thumbnail"
        height={180}
        width={320}
        objectFit="cover"
        className="vid-img"
        placeholder="empty"
        onLoad={handleComplete}
      />
    </>
  );
};

export default CustomImage;
