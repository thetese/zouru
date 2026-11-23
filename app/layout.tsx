import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zouruhotel.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Zouru Hotel | Lake Kivu, Gisenyi",
  description:
    "A warm welcome on the shores of Lake Kivu. Stay, dine, gather and unwind at Zouru Hotel in Rubavu, Gisenyi, Rwanda.",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Zouru Hotel",
    title: "Zouru Hotel | Lake Kivu, Gisenyi",
    description:
      "A warm welcome on the shores of Lake Kivu. Stay, dine, gather and unwind at Zouru Hotel in Rubavu, Gisenyi, Rwanda.",
    images: [
      {
        url: "/images/hotel/hotel-exterior-night.jpg",
        width: 1800,
        height: 1200,
        alt: "Zouru Hotel illuminated at dusk in Rubavu, Gisenyi, Rwanda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zouru Hotel | Lake Kivu, Gisenyi",
    description:
      "A warm welcome on the shores of Lake Kivu. Stay, dine, gather and unwind at Zouru Hotel in Rubavu, Gisenyi, Rwanda.",
    images: ["/images/hotel/hotel-exterior-night.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f7f2",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
