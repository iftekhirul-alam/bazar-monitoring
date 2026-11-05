import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-200/80 py-6 text-slate-500 text-xs sm:text-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        {/* Left Side Text */}
        <p className="font-medium text-slate-600">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        {/* Right Side Text */}
        <p className="text-slate-400 font-medium">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}