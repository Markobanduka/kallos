"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const BuyForAllProducts: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();

  const handleBuyClick = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <Button
      variant="outline"
      className="bg-primary"
      onClick={() => handleBuyClick(id)}
    >
      Buy
    </Button>
  );
};

export default BuyForAllProducts;
