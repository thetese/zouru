import type { Metadata } from "next";
import { MenuPage } from "@/components/menu-page";

export const metadata: Metadata = {
  title: "Restaurant & Bar Menu | Zouru Hotel — Lake Kivu, Gisenyi",
  description:
    "Explore the full Zouru Bravo Hotel kitchen and bar menu in Gisenyi, Rwanda — breakfast, Lake Kivu fish, grills, African dishes, coffees, cocktails, wines, and spirits (prices in RWF).",
  openGraph: {
    title: "Restaurant & Bar Menu | Zouru Hotel",
    description:
      "Breakfast, Lake Kivu tilapia and sambaza, charcoal grills, African dishes, coffees, cocktails, and spirits in Rubavu, Gisenyi.",
    images: [
      {
        url: "/images/hotel/hotel-bar-shelves.jpg",
        width: 1600,
        height: 1184,
        alt: "Zouru Hotel bar shelves and brass pendant lights",
      },
    ],
  },
};

export default function MenuRoute() {
  return <MenuPage />;
}
