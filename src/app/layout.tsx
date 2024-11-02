import { globalStyles } from "@/styles/global";
import { getCssText } from "@/styles/stitches.config";
import { Roboto } from "next/font/google";
import { Container, Header } from "@/styles/pages/layout";

import Image from "next/image";

import logoImg from "../assets/logo.svg";

export const metadata = {
  icons: {
    icon: "favicon.svg",
  },
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

globalStyles();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </head>
      <body className={roboto.className}>
        <Container>
          <Header>
            <Image src={logoImg} alt="Logo Ignite Shop" />
          </Header>
          {children}
        </Container>
      </body>
    </html>
  );
}
