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
    <div className="flex flex-col lg:flex-row justify-center items-center w-full p-6 lg:p-12 space-y-8 lg:space-y-0 lg:space-x-12">
      {/* Product Image */}
      <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2">
        <Image
          width={500}
          height={500}
          src={product.product.images.edges[0]?.node.src}
          alt={product.product.title}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col items-start space-y-6 lg:w-1/2">
        <Button onClick={() => router.push("/")} className="mb-4">
          Back
        </Button>

        <h1 className="text-3xl lg:text-4xl font-bold">
          {product.product.title}
        </h1>
        <div className="text-xl font-semibold">
          {product.product.priceRange.minVariantPrice.amount} AED
        </div>

        <p className="text-lg text-gray-700">{product.product.description}</p>

        <Button
          // variant="outline"
          className="bg-primary w-full lg:w-auto py-3 px-6"
          onClick={handleBuy}
          disabled={product.product.priceRange.minVariantPrice.amount === "0.0"}
        >
          {product.product.priceRange.minVariantPrice.amount === "0.0"
            ? "Out of stock"
            : "Buy"}
        </Button>
      </div>
    </div>
  );
};

export default SingleProduct;
