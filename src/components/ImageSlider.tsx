"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { fetchProductById, ProductResponse } from "@/lib/shopify/shopify";

interface ImageSliderProps {
  id: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ id }) => {
  const [product, setProduct] = React.useState<ProductResponse | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchSingleProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(id);

        console.log("Fetched Product Data:", data);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchSingleProduct();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  const productImages = product.product.images.edges.slice(0, 5);

  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {productImages.map((imageEdge, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image
                    width={260}
                    height={260}
                    src={imageEdge.node.src}
                    alt={product.product.title || "Product image"}
                    className="object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ImageSlider;
