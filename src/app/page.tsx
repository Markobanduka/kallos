import LandingPage from "@/components/LandingPage";
import { ModeToggle } from "@/components/ModeToggle";
import AllProducts from "@/components/products/AllProducts";
import React from "react";

const ProductsPage = () => {
  return (
    <div>
      <LandingPage />
      <div className="flex p-16" id="products-section">
        <div className="flex-1 flex justify-end">
          <h1 className="text-primary text-4xl font-semibold">Products</h1>
        </div>
        <div className="flex-1 flex justify-end">
          <ModeToggle />
        </div>
      </div>
      <AllProducts />
    </div>
  );
};

export default ProductsPage;
