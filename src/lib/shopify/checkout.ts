export const createCheckout = async (
  variantId: string,
  quantity: number = 1
) => {
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN;

  if (!storeDomain || !storefrontAccessToken) {
    throw new Error("Shopify store domain or access token is missing");
  }

  const query = `
    mutation {
      checkoutCreate(input: {
        lineItems: [
          {
            variantId: "${variantId}",
            quantity: ${quantity}
          }
        ]
      }) {
        checkout {
          webUrl
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
  return result.data.checkoutCreate.checkout.webUrl;
};
