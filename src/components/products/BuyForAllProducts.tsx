"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const BuyForAllProducts: React.FC<{ id: string; price: string }> = ({
  id,
  price,
}) => {
  const router = useRouter();

  const handleBuyClick = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <Button
      variant="outline"
      className="bg-primary"
      onClick={() => handleBuyClick(id)}
      disabled={price === "0.0"}
    >
      {price === "0.0" ? "Out of stock" : "Buy"}
    </Button>
  );
};

export default BuyForAllProducts;
