import Product from "@/components/Product";
import { stripe } from "@/lib/stripe";

import Stripe from "stripe";

export const metadata = {
  title: "Ignite Shop | Produto",
  description: "Esta é a página de Produto do Ignite Shop",
};

async function getProduct(id: string) {
  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    id: product.id,
    name: product.name,
    imageUrl: product.images[0],
    price: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price.unit_amount ? price.unit_amount / 100 : 0),
    description: product.description || "Descrição não disponível",
    defaultPriceId: price.id,
  };
}

export async function generateStaticParams() {
  return [{ id: "prod_R8hmLSRruhc4EY" }];
}

interface PageParams {
  id: string;
}

export default async function Page({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const resolvedParams = await params;
  const productData = await getProduct(resolvedParams.id);

  return <Product product={productData} />;
}
