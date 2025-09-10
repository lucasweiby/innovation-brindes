import "./globals.css";
import { Nunito } from "next/font/google";
import ClientLayout from "./components/ClientLayout";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nunito",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className={nunito.className}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
