"use client";
import Header from "./Header";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showHeader = !pathname.startsWith("/login");

  return (
    <>
      {showHeader && <Header />}
      {children}
    </>
  );
}
