import { fetchProducts, ProductsResponse } from "@/lib/shopify/shopify";
import Image from "next/image";
import React from "react";
import BuyForAllProducts from "./BuyForAllProducts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ImageSlider from "../ImageSlider";

const AllProducts = async () => {
  const data: ProductsResponse = await fetchProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
      {data.products.edges.map(({ node: product }) => {
        const productId = product.id.split("/").pop() || "";

        return (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
            title={product.title}
          >
            <div className="flex justify-center">
              <Dialog>
                <DialogTrigger>
                  <Image
                    src={product.images.edges[0].node.src}
                    alt={product.title}
                    width={260}
                    height={240}
                    className="object-fit w-[260px] h-[240px] rounded-md cursor-pointer"
                    priority={true}
                  />
                </DialogTrigger>
                <DialogContent aria-describedby={undefined}>
                  <DialogHeader>
                    <DialogTitle>{product.title}</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>

                  <ImageSlider id={productId} />
                </DialogContent>
              </Dialog>
            </div>

            <h2 className="text-lg font-semibold mt-4 mb-2">
              {product.title.length > 25
                ? `${product.title.slice(0, 23)}...`
                : product.title}
            </h2>
            <p className="text-gray-600 text-base mb-4">
              AED {product.priceRange.minVariantPrice.amount}
            </p>
            <BuyForAllProducts
              id={productId || ""}
              price={product.priceRange.minVariantPrice.amount}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AllProducts;
