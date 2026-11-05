import CategoryProducts from "@/components/CategoryProducts";
import { ICategory, IProduct } from "@/types/type";
import React from "react";

const CategoryDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  //   console.log(slug);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?category=${slug}`,
  );
  const products: IProduct[] = await res.json();
  //   console.log(products);
  const resCat = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/${slug}`,
  );
  const category: ICategory = await resCat.json();

  return (
    <main className="min-h-screen w-full py-8 sm:py-10 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-5">
        {/* ১. টপ ক্যাটাগরি ব্যানার কার্ড */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-2xs flex items-center gap-4 sm:gap-6">
          {/* ক্যাটাগরি আইকন বক্স */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#f1f5f9] border border-slate-200/60 flex items-center justify-center text-3xl sm:text-4xl shrink-0">
            {category.icon}
          </div>

          {/* ক্যাটাগরি টাইটেল ও বিবরণ */}
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {category.nameBn}
              </h1>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-xs">
                মোট পণ্য: {products.length.toLocaleString("bn-BD")}টি
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {category.descriptionBn}
            </p>
          </div>
        </div>
        <CategoryProducts products={products}></CategoryProducts>
      </div>
    </main>
  );
};

export default CategoryDetailsPage;
