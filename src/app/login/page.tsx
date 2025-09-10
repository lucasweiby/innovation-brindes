import Image from "next/image";
import LoginForm from "../components/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Innovation Brindes",
  description:
    "Acesse sua conta para gerenciar e personalizar produtos na Innovation Brindes.",
  openGraph: {
    title: "Login | Innovation Brindes",
    description:
      "Acesse sua conta para gerenciar e personalizar produtos na Innovation Brindes.",
    url: "https://www.innovationbrindes.com.br/login",
    siteName: "Innovation Brindes",
    images: [
      {
        url: "https://www.innovationbrindes.com.br/assets/images/opengraph-login.jpg",
        width: 1200,
        height: 630,
        alt: "Login Innovation Brindes",
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

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      {/* Imagem de fundo */}
      <Image
        src="/assets/images/login-bg.png"
        alt="Innovation Brindes"
        fill
        style={{ objectFit: "cover" }}
        className="z-0"
        priority
      />

      <div className="relative w-full h-full flex flex-col items-center justify-center z-10">
        <h1 className="text-3xl font-semibold text-center mb-10 text-[#7FBC03]">
          Bem-vindo a Innovation Brindes
        </h1>
        <div className="bg-[#7FBC03] rounded-2xl shadow-lg px-8 py-12 w-full max-w-xl flex flex-col items-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
