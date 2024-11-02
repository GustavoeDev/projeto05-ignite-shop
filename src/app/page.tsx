import Home from "@/components/Home";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export const metadata = {
  title: "Ignite Shop | Início",
  description: "Esta é a página de Início do Ignite Shop",
};

export default async function HomePage() {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount ? price.unit_amount / 100 : 0),
    };
  });

  return <Home products={products} />;
}
