"use client";

import { ImageContainer, SuccessContainer } from "@/styles/pages/success";
import Image from "next/image";
import Link from "next/link";

interface SuccessProps {
  customerName: string;
  productName: string;
  imageUrl: string | null;
}

export default function Success({
  customerName,
  productName,
  imageUrl,
}: SuccessProps) {
  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>

      <ImageContainer>
        <Image src={imageUrl ? imageUrl : ""} width={120} height={110} alt="" />
      </ImageContainer>

      <p>
        Uhuul <strong>{customerName}</strong>, sua{" "}
        <strong>{productName}</strong> já está a caminho da sua casa.
      </p>

      <Link href="/">Voltar ao catálogo</Link>
    </SuccessContainer>
  );
}
