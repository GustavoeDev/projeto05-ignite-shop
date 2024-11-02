import Success from "@/components/Success";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Ignite Shop | Sucesso",
  description: "Esta é a página de Sucesso do Ignite Shop",
};

interface SuccessPageProps {
  searchParams: { session_id: string | null };
}
export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  if (!searchParams.session_id) {
    redirect("/");
  }

  const sessionId = String(searchParams.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName =
    session.customer_details?.name || "Não foi possivel encontrar o nome";

  const lineItems = session.line_items?.data || [];
  const productDetails = lineItems.length > 0 ? lineItems[0] : null;

  const product = productDetails?.price?.product;

  const productName =
    product && typeof product === "object" && "name" in product
      ? product.name
      : "Nome do produto não disponível";

  const productImageUrl =
    product && typeof product === "object" && "images" in product
      ? product.images[0] || null
      : null;

  return (
    <Success
      customerName={customerName}
      productName={productName}
      imageUrl={productImageUrl}
    />
  );
}
