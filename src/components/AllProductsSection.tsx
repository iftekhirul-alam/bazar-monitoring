"use client";

import React, { useEffect, useState } from "react";
import { Chip } from "@heroui/react";
import { LayoutGrid } from "lucide-react";
import ProductCard from "./ProductCard";
import { IProduct } from "@/types/type";

export default function AllProductsSection() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: IProduct[] = await res.json();

        setProducts(data);
      } catch (error) {
        console.error("Error loading all products data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <section id="all-products" className="w-full py-12 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-7">
          <div className="flex flex-col items-start gap-2">
            {/* Top Badge */}
            <Chip
              size="sm"
              className="px-3 py-1 h-auto rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center gap-1.5"
            >
              <LayoutGrid size={14} className="shrink-0" />
              <span>সকল তালিকা</span>
            </Chip>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
              <span>সকল পণ্য</span>
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              বাজারের নিত্যপ্রয়োজনীয় চাল, ডাল, তেল, সবজি, মাছ, মাংস ও মসলার সম্পূর্ণ মূল্য তালিকা
            </p>
          </div>

          {/* Right Total Count Text */}
          <span className="text-xs text-slate-400 font-medium">
            মোট {products.length.toLocaleString("bn-BD")}টি পণ্য পাওয়া গেছে
          </span>
        </div>

        {/* Cards Grid (3 Columns on Desktop) */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(9)].map((_, idx) => (
              <div
                key={idx}
                className="h-52 rounded-3xl bg-slate-200/60 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}