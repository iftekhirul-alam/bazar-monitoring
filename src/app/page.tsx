import AllProductsSection from "@/components/AllProductsSection";
import Hero from "@/components/Hero";
import PriceIncreaseSection from "@/components/PeiceIncreaseSection";
import PriceDecreaseSection from "@/components/PriceDecreaseSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <PriceIncreaseSection></PriceIncreaseSection>
      <PriceDecreaseSection></PriceDecreaseSection>
      <AllProductsSection></AllProductsSection>
    </div>
  );
}
