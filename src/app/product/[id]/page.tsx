"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { createCheckout } from "@/lib/shopify/checkout";
import { fetchProductById, ProductResponse } from "@/lib/shopify/shopify";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

const SingleProduct = () => {
  const router = useRouter();
  const params = useParams();
  const id = (params.id = Array.isArray(params.id)
    ? params.id[0]
    : params.id || "");

  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(id);
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

  const handleBuy = async () => {
    if (product) {
      try {
        const variantId = product.product.variants.edges[0].node.id;
        const checkoutUrl = await createCheckout(variantId);
        window.location.href = checkoutUrl;
      } catch (error) {
        console.error("Error creating checkout", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <div className="p-10">
      <div className="">
        <Button onClick={() => router.push("/")}>Back</Button>
      </div>
      <div className="flex justify-center items-center relative border border-white">
        <div className="flex">
          <h1 className="text-4xl  w-full">{product.product.title}</h1>
          <Image
            width={300}
            height={100}
            src={product.product.images.edges[0]?.node.src}
            alt={product.product.title}
          />

          <Button
            variant="outline"
            className="bg-primary absolute w-full bottom-0"
            onClick={handleBuy}
            disabled={
              product.product.priceRange.minVariantPrice.amount === "0.0"
            }
          >
            {product.product.priceRange.minVariantPrice.amount === "0.0"
              ? "Out of stock"
              : "Buy"}
          </Button>
        </div>
        <div className="">
          <Image
            width={50}
            height={50}
            src={product.product.images.edges[1]?.node.src}
            alt={product.product.title}
          />
          <div className="flex mt-10">
            <div className="text-2xl">Price:&nbsp;</div>
            <div className="text-2xl">
              {product.product.priceRange.minVariantPrice.amount} AED
            </div>
          </div>
        </div>
      </div>

      <p>{product.product.description}</p>
    </div>
  );
};

export default SingleProduct;
