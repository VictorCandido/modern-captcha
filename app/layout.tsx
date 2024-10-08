import { SocketProvider } from "@/components/providers/socket-provider";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import Head from "next/head";
import "./globals.css";

export const metadata: Metadata = {
  title: "Modern",
};

const roboto = Roboto({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Head>
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
      </Head>
      <html lang="pt-br">
        <body
          className={roboto.className}
          suppressHydrationWarning
        >
          <SocketProvider>
            {children}

            <Toaster />
          </SocketProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
