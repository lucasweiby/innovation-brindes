import type { Metadata } from "next";
import ProdutosPageClient from "./ProdutosPageClient";

export const metadata: Metadata = {
  title: "Produtos | Innovation Brindes",
  description: "Veja todos os produtos personalizados da Innovation Brindes.",
  openGraph: {
    title: "Produtos | Innovation Brindes",
    description: "Veja todos os produtos personalizados da Innovation Brindes.",
    url: "https://www.innovationbrindes.com.br/produtos",
    siteName: "Innovation Brindes",
    images: [
      {
        url: "https://www.innovationbrindes.com.br/assets/images/opengraph-produtos.jpg",
        width: 1200,
        height: 630,
        alt: "Produtos Innovation Brindes",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function ProdutosPage() {
  return <ProdutosPageClient />;
}
