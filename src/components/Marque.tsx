"use client";

import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Chip } from "@heroui/react";
import Link from "next/link";

interface ProductItem {
  id: string | number;
  slug: string;
  nameBn: string;
  serviceType?: string;
  image: string;
  today: string | number;
  change?: {
    dir: "up" | "down" | "flat";
    pct: string;
  };
}

export default function Marque() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) return;

        const res = await fetch(`${apiUrl}/products`);
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (error) {
        console.error("Error fetching marquee products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-[#0b1324] text-white flex items-center justify-center h-11 overflow-hidden border-b border-slate-800 text-xs text-slate-400">
        লাইভ ডাটা লোড হচ্ছে...
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-[#0b1324] text-white flex items-center h-11 overflow-hidden border-b border-slate-800">
      {/* Scrolling Marquee Section */}
      <Marquee
        pauseOnHover={true}
        speed={45}
        gradient={false}
        className="flex items-center h-full overflow-hidden"
      >
        {products.map((item) => {
          const isUp = item.change?.dir === "up";
          const isDown = item.change?.dir === "down";

          return (
            <Link
              key={item.id}
              href={`/product/${item.slug}`}
              className="flex items-center gap-2 mx-3 px-3 py-1 rounded-lg hover:bg-slate-800/80 transition-colors whitespace-nowrap text-xs sm:text-sm"
            >
              {/* Transport / Product Icon or Image */}
              <span className="text-base leading-none">{item.image}</span>

              {/* Route / Product Name */}
              <span className="font-bold text-white">{item.nameBn}</span>

              {/* Service Type */}
              {item.serviceType && (
                <span className="text-slate-400 text-xs">
                  ({item.serviceType})
                </span>
              )}

              {/* Today's Price */}
              <span className="font-bold text-[#fbbf24]">
                {item.today} টাকা
              </span>

              {/* Price Change Chip */}
              {item.change && (
                <Chip
                  size="sm"
                  className={`px-2 py-0.5 h-5 rounded-full text-[11px] font-bold flex items-center gap-0.5 ${
                    isUp
                      ? "bg-[#ffe4e6] text-[#e11d48]"
                      : isDown
                        ? "bg-[#d1fae5] text-[#059669]"
                        : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {isUp && "▲ "}
                  {isDown && "▼ "}
                  {!isUp && !isDown && "— "}
                  {item.change.pct}
                </Chip>
              )}
            </Link>
          );
        })}
      </Marquee>
    </div>
  );
}