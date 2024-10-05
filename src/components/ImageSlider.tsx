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
import { fetchProducts, ProductsResponse } from "@/lib/shopify/shopify";
import Image from "next/image";

const ImageSlider = () => {
  const [products, setProducts] = React.useState<ProductsResponse | null>(null);

  React.useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchAllProducts();
  }, []);

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {products.products.edges.map(({ node: product }, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image
                    src={product.images.edges[0].node.src}
                    alt={product.title}
                    width={260}
                    height={240}
                    className="object-fit w-full h-full"
                    priority={index === 0}
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
