"use client";

import { Button } from "@/components/ui/button";
import { fetchProductById, ProductResponse } from "@/lib/shopify/shopify";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SingleProduct = () => {
  const params = useParams();
  const id = (params.id = Array.isArray(params.id)
    ? params.id[0]
    : params.id || "");

  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <div>
      <div className="flex justify-center items-center p-6">
        <div>
          <Image
            width={300}
            height={100}
            src={product.product.images.edges[0]?.node.src}
            alt={product.product.title}
          />
        </div>
        <div className="p-4">
          <h1 className="text-4xl">{product.product.title}</h1>
          <Button variant="outline" className="bg-primary mt-6">
            Buy
          </Button>
          <div className="flex mt-10">
            <div className="text-3xl">Price:&nbsp;</div>
            <div className="text-3xl">
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
