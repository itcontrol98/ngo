import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Poppins } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: "400" as const,
  style: "normal" as const,
});

export const metadata: Metadata = {
  title: "Garbage",
  description: "Garbage website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}
      >
          <Toaster
            toastOptions={{
              style: {
                background: "rgb(51 65 85)",
                color: "#fff",
              },
            }}
          />

          <Header />
          {children}
          <Toaster />
          <Footer />
      </body>
    </html>
  );
}
