import { fetchProducts, ProductsResponse } from "@/lib/shopify";
import Image from "next/image";
import React from "react";

const ProductsPage = async () => {
  const data: ProductsResponse = await fetchProducts();

  return (
    <div>
      <h1>Products</h1>
      <div>
        {data.products.edges.map(({ node: product }) => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <div
              style={{ width: "300px", height: "300px", position: "relative" }}
            >
              <Image
                src={product.images.edges[0].node.src}
                alt={product.title}
                layout="fill"
              />
            </div>
            <p>Price: ${product.priceRange.minVariantPrice.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
