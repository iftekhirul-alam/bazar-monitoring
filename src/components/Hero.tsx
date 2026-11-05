import React from "react";
import Image from "next/image";
import Link from "next/link";
import bazarHeroImg from "@/assets/bazar-hero.png";

export default function Hero() {
  const formattedDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <div className="w-full bg-[#f4f7f5] border border-slate-200/60 rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xs">
        
        {/* Left Content Section */}
        <div className="flex flex-col items-start gap-4 max-w-xl text-left">
          
          {/* Date Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6f4ea] text-[#137333] text-xs sm:text-sm font-semibold">
            <span>🗓️</span>
            <span>{formattedDate}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Action Button */}
          <div className="pt-2">
            <Link
              href="#all-products"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#0b8043] hover:bg-[#096e38] text-white font-bold text-sm shadow-sm transition-colors scroll-smooth"
            >
              সব পণ্য দেখুন
            </Link>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="shrink-0 flex items-center justify-center">
          <Image
            src={bazarHeroImg}
            alt="Bazar Hero Illustration"
            width={320}
            height={260}
            priority
            className="w-auto h-auto max-h-[240px] sm:max-h-[280px] object-contain"
          />
        </div>

      </div>
    </section>
  );
}