"use client";

import React from "react";
import { Card, Chip } from "@heroui/react";
import Link from "next/link";
import { IProduct } from "@/types/type";

export default function ProductCard({ product }: { product: IProduct }) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <Link href={`/product/${product.slug}`} className="block h-full group">
      <Card className="h-full p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:border-blue-200 transition-all flex flex-col justify-between">
        
        {/* Top Section: Image/Emoji & Title/Unit */}
        <div className="flex items-center gap-4">
          {/* Icon / Image Box */}
          <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl shrink-0">
            {product.image}
          </div>

          {/* Name & Unit */}
          <div className="flex flex-col gap-0.5">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-[#0d6efd] transition-colors leading-snug">
              {product.nameBn}
            </h3>
            <span className="text-xs sm:text-sm text-slate-500 font-medium">
              {product.unit || product.unit || "প্রতি একক"}
            </span>
          </div>
        </div>

        {/* Bottom Section: Today's Price & Change Chip */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-slate-400 font-medium">
              আজকের দাম
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-slate-900">
                {product.today !== undefined && product.today !== null
                  ? typeof product.today === "number"
                    ? product.today.toLocaleString("bn-BD")
                    : product.today
                  : "০"}
              </span>
              <span className="text-sm font-bold text-slate-700">টাকা</span>
            </div>
          </div>

          {/* Price Change Chip */}
          {product.change && (
            <Chip
              size="sm"
              className={`px-3 py-1 h-7 rounded-full text-xs font-bold flex items-center gap-1 ${
                isUp
                  ? "bg-[#ffe4e6] text-[#e11d48]"
                  : isDown
                    ? "bg-[#d1fae5] text-[#059669]"
                    : "bg-slate-100 text-slate-600"
              }`}
            >
              {isUp && "▲ "}
              {isDown && "▼ "}
              {!isUp && !isDown && "— "}
              {typeof product.change.pct === "number"
                ? product.change.pct.toLocaleString("bn-BD", {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  })
                : product.change.pct}%
            </Chip>
          )}
        </div>

      </Card>
    </Link>
  );
}