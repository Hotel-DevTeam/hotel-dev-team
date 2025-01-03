import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { OrderProvider } from "@/context/OrderContext";
import { ReservationProvider } from "@/context/reservationContext";
import Navbar from "@/components/NavBar/NavBar";
import { LocationContext, LocationProvider } from "@/context/LocationContext";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Hotel Cordoba",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <LocationProvider>
            <ReservationProvider>
            <OrderProvider>
              <Navbar />
              {children}
            </OrderProvider>
          </ReservationProvider>
            </LocationProvider>
            </UserProvider>
      </body>
    </html>
  );
}
