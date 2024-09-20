interface ProductImage {
  src: string;
}

interface ProductNode {
  id: string;
  title: string;
  handle: string;
  images: {
    edges: Array<{ node: ProductImage }>;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
  };
}

export interface ProductsResponse {
  products: {
    edges: Array<{ node: ProductNode }>;
  };
}

export const fetchProducts = async (): Promise<ProductsResponse> => {
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;

  if (!storeDomain || !storefrontAccessToken) {
    throw new Error("Missing Shopify environment variables");
  }

  const query = `
    {
      products(first: 112) {
        edges {
          node {
            id
            title
            handle
            images(first: 1) {
              edges {
                node {
                  src
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(
    `https://${storeDomain}/api/2023-04/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({ query }),
    }
  );

  const result = await response.json();
  return result.data;
};

interface ProductVariant {
  id: string;
}

interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: {
    edges: Array<{ node: ProductImage }>;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
  };
  variants: {
    edges: Array<{ node: ProductVariant }>;
  };
}

export interface ProductResponse {
  product: Product;
}

export const fetchProductById = async (
  id: string
): Promise<ProductResponse> => {
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;

  if (!storeDomain || !storefrontAccessToken) {
    throw new Error("Missing Shopify environment variables");
  }

  const query = `
    {
      product(id: "gid://shopify/Product/${id}") {
        id
        title
        handle
        description
        images(first: 5) {
          edges {
            node {
              src
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
          }
        }
        variants(first: 1) { 
          edges {
            node {
              id  
            }
          }
        }
      }
    }
  `;

  const response = await fetch(
    `https://${storeDomain}/api/2023-04/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({ query }),
    }
  );

  const result = await response.json();
  return result.data;
};
