import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth"; // আপনার প্রজেক্টের auth ইনস্ট্যান্স পাথ অনুযায়ী ঠিক করে নিবেন
import { Card, Chip } from "@heroui/react";
import {
  Home,
  ChevronRight,
  Clock,
  Calendar,
  TrendingDown,
  TrendingUp,
  Calculator,
  CheckCircle2,
  Info,
  Store,
} from "lucide-react";
import { IProduct } from "@/types/type";

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  // ১. ইউজার লগইন করা আছে কিনা চেক করা (সার্ভার সাইড)
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // যদি ইউজার লগইন করা না থাকে, তবে সাইন-ইন পেজে রিডাইরেক্ট হবে
  if (!session) {
    redirect("/signin");
  }

  const { slug } = await params;
  let product: IProduct | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`,
      { cache: "no-store" }
    );
    
    if (res.ok) {
      product = await res.json();
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
  }

  // ফলব্যাক অপশন: সরাসরি স্লাগ দিয়ে না পেলে সব প্রোডাক্ট এনে ফিল্টার করা
  if (!product) {
    try {
      const allRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, { cache: "no-store" });
      if (allRes.ok) {
        const allProducts: IProduct[] = await allRes.json();
        product = allProducts.find(
          (p: any) => p.slug === slug || String(p.id) === String(slug)
        ) || null;
      }
    } catch (err) {
      console.error("Error fetching all products fallback:", err);
    }
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center space-y-4">
        <span className="text-6xl block">🛒</span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          পণ্যের বা বাজারের দামের তথ্য খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          আপনি যে পণ্যের তথ্য খুঁজছেন সেটি সঠিক নয় অথবা সিস্টেম থেকে সরিয়ে নেওয়া হয়েছে।
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  // markets array প্রসেসিং
  const markets = product.markets
    ? [...product.markets].sort((a: any, b: any) => a.min - b.min)
    : [];
  
  const minPrice = markets.length > 0 ? markets[0].min : product.today;
  const maxPrice = markets.length > 0 
    ? Math.max(...markets.map((m: any) => m.max)) 
    : product.today;
    
  const avgPrice = markets.length > 0
    ? Math.round(markets.reduce((sum: number, m: any) => sum + ((m.min + m.max) / 2), 0) / markets.length)
    : product.today;

  return (
    <main className="min-h-screen w-full py-6 sm:py-10 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        {/* ব্রেডক্রাম্ব */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500">
          <Link href="/" className="flex items-center gap-1 hover:text-blue-600">
            <Home size={14} />
            <span>হোম</span>
          </Link>
          <ChevronRight size={14} />
          <Link href={`/category/${product.category}`} className="flex items-center gap-1 hover:text-blue-600">
            <span>{product.categoryIcon}</span>
            <span>{product.categoryNameBn}</span>
          </Link>
          <ChevronRight size={14} />
          <span className="font-bold text-slate-900">{product.nameBn}</span>
        </div>

        {/* মেইন প্রোডাক্ট হেডার কার্ড */}
        <Card className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-2xs space-y-6">
          <Card.Content className="p-0 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#f1f5f9] border border-slate-200/60 flex items-center justify-center text-3xl sm:text-4xl shrink-0">
                {product.image}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Chip size="sm" className="px-2.5 py-0.5 h-auto rounded-full bg-blue-50 text-blue-600 font-bold text-xs">
                    {product.categoryNameBn}
                  </Chip>
                  <Chip size="sm" className="px-2.5 py-0.5 h-auto rounded-full bg-slate-100 text-slate-600 font-semibold text-xs">
                    প্রতি {product.unit}
                  </Chip>
                </div>
                <Card.Title className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {product.nameBn}
                </Card.Title>
                <Card.Description className="text-xs sm:text-sm text-slate-500 font-medium">
                  {product.nameBn}-এর আজকের বাজারদর, সর্বনিম্ন-সর্বাধিক মূল্য এবং বিভিন্ন বাজারের দামের তুলনা।
                </Card.Description>
              </div>
            </div>

            {/* আজকের দাম বক্স */}
            <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl px-5 py-3.5 flex flex-col md:items-end">
              <span className="text-[11px] font-medium text-slate-400">
                আজকের গড় বাজারদর
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  {product.today?.toLocaleString("bn-BD")} টাকা
                </span>
                <span className="text-xs font-medium text-slate-400">
                  / {product.unit}
                </span>
              </div>

              {product.change && (
                <Chip
                  size="sm"
                  className={`mt-2 px-2.5 py-0.5 h-auto rounded-full text-xs font-bold ${
                    product.change.dir === "up"
                      ? "bg-rose-50 text-rose-600"
                      : product.change.dir === "down"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "—"}{" "}
                  {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                </Chip>
              )}
            </div>
          </Card.Content>

          {/* সামারি তথ্য */}
          <Card.Footer className="p-0 pt-5 border-t border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Store size={18} />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">পণ্যের একক</p>
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  প্রতি {product.unit}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-extrabold text-xs">
                কাল
              </div>
              <div>
                <p className="text-[11px] text-slate-400">গতকালের দাম</p>
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  {product.yesterday?.toLocaleString("bn-BD")} টাকা
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">গত সপ্তাহের দাম</p>
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  {product.lastWeek?.toLocaleString("bn-BD")} টাকা
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">গত মাসের দাম</p>
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  {product.lastMonth?.toLocaleString("bn-BD")} টাকা
                </p>
              </div>
            </div>
          </Card.Footer>
        </Card>

        {/* প্রাইস কার্ডস */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card className="bg-[#f0fdf4] border border-emerald-200/80 rounded-3xl p-5 space-y-2 shadow-none">
            <Card.Header className="p-0 flex items-center justify-between">
              <Card.Title className="text-xs sm:text-sm font-bold text-emerald-900">
                সর্বনিম্ন দাম
              </Card.Title>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <TrendingDown size={16} />
              </div>
            </Card.Header>
            <Card.Content className="p-0 text-2xl sm:text-3xl font-black text-emerald-800">
              {minPrice.toLocaleString("bn-BD")} টাকা
            </Card.Content>
            <Card.Footer className="p-0 text-xs font-semibold text-emerald-700">
              {markets.length > 0 ? `বাজার: ${markets[0].market} (${markets[0].division})` : "সর্বনিম্ন হার"}
            </Card.Footer>
          </Card>

          <Card className="bg-[#fff1f2] border border-rose-200/80 rounded-3xl p-5 space-y-2 shadow-none">
            <Card.Header className="p-0 flex items-center justify-between">
              <Card.Title className="text-xs sm:text-sm font-bold text-rose-900">
                সর্বোচ্চ দাম
              </Card.Title>
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                <TrendingUp size={16} />
              </div>
            </Card.Header>
            <Card.Content className="p-0 text-2xl sm:text-3xl font-black text-rose-900">
              {maxPrice.toLocaleString("bn-BD")} টাকা
            </Card.Content>
            <Card.Footer className="p-0 text-xs font-semibold text-rose-700">
              সারাদেশের বাজারের সর্বোচ্চ হার
            </Card.Footer>
          </Card>

          <Card className="bg-[#eff6ff] border border-blue-200/80 rounded-3xl p-5 space-y-2 shadow-none">
            <Card.Header className="p-0 flex items-center justify-between">
              <Card.Title className="text-xs sm:text-sm font-bold text-blue-900">
                গড় বাজারদর
              </Card.Title>
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <Calculator size={16} />
              </div>
            </Card.Header>
            <Card.Content className="p-0 text-2xl sm:text-3xl font-black text-blue-900">
              {avgPrice.toLocaleString("bn-BD")} টাকা
            </Card.Content>
            <Card.Footer className="p-0 text-xs font-semibold text-blue-600">
              বিভিন্ন বাজারের গড় হিসাব
            </Card.Footer>
          </Card>
        </div>

        {/* বাজারভিত্তিক টেবিল */}
        {markets.length > 0 && (
          <Card className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-2xs space-y-5">
            <Card.Header className="p-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <Card.Title className="text-lg sm:text-xl font-extrabold text-slate-900">
                  বাজার ও বিভাগভিত্তিক দামের তুলনা
                </Card.Title>
                <Card.Description className="text-xs text-slate-500 font-medium">
                  বিভিন্ন অঞ্চলের বাজারে এই পণ্যের সর্বনিম্ন ও সর্বোচ্চ মূল্য তালিকা
                </Card.Description>
              </div>
            </Card.Header>

            <Card.Content className="p-0 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-y border-slate-100 text-xs font-bold text-slate-400">
                    <th className="py-3 px-4">বাজারের নাম</th>
                    <th className="py-3 px-4">বিভাগ</th>
                    <th className="py-3 px-4 text-right">সর্বনিম্ন দাম (টাকা)</th>
                    <th className="py-3 px-4 text-right">সর্বোচ্চ দাম (টাকা)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {markets.map((m: any, idx: number) => (
                    <tr key={idx} className={idx === 0 ? "bg-emerald-50/40" : ""}>
                      <td className="py-4 px-4 font-bold text-slate-900">
                        <div className="flex items-center gap-2">
                          <span>{m.market}</span>
                          {idx === 0 && (
                            <Chip size="sm" className="px-2 py-0.5 h-auto rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-extrabold">
                              সর্বনিম্ন
                            </Chip>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Chip size="sm" className="px-2.5 py-1 h-auto rounded-lg bg-slate-100 text-slate-700 font-semibold text-xs">
                          {m.division}
                        </Chip>
                      </td>
                      <td className="py-4 px-4 text-right font-extrabold text-emerald-700 text-sm sm:text-base">
                        {m.min.toLocaleString("bn-BD")} টাকা
                      </td>
                      <td className="py-4 px-4 text-right font-extrabold text-slate-900 text-sm sm:text-base">
                        {m.max.toLocaleString("bn-BD")} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card.Content>
          </Card>
        )}

        {/* নীতিমালা কার্ড */}
        <Card className="bg-[#fffbeb] border border-amber-200 rounded-2xl p-4 sm:p-5 shadow-none">
          <Card.Content className="p-0 flex items-start gap-3">
            <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm">
              <Card.Title className="font-extrabold text-amber-950 text-xs sm:text-sm">
                বাজার মনিটরিং ও মূল্য নীতিমালা:
              </Card.Title>
              <Card.Description className="text-amber-900 font-medium">
                নিত্যপ্রয়োজনীয় পণ্যের সরবরাহ ও বাজার পরিস্থিতি অনুযায়ী দাম নিয়মিত আপডেট করা হয়।
              </Card.Description>
            </div>
          </Card.Content>
        </Card>
      </div>
    </main>
  );
};

export default ProductDetailsPage;