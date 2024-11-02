"use client";

import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const [isCheckoutSession, setIsCheckoutSession] = useState(false);

  async function handleBuyProduct() {
    try {
      setIsCheckoutSession(true);

      const response = await axios.get("/api/checkout", {
        params: {
          priceId: product.defaultPriceId,
        },
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch {
      alert("Falha ao redirecionar para o checkout!");
      setIsCheckoutSession(false);
    }
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image
          src={product.imageUrl}
          width={520}
          height={480}
          alt={product.name}
        />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button disabled={isCheckoutSession} onClick={handleBuyProduct}>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  );
}
