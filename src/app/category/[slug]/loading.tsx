import React from "react";

const loading = () => {
  return (
    <main className="min-h-screen w-full py-8 sm:py-10 bg-[#f8fafc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-5 animate-pulse">
        {/* ১. টপ ক্যাটাগরি ব্যানার কার্ড স্কেলেটন */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-2xs flex items-center gap-4 sm:gap-6">
          {/* ক্যাটাগরি আইকন বক্স */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-200/80 shrink-0" />

          {/* ক্যাটাগরি টাইটেল ও বিবরণ */}
          <div className="flex flex-col gap-2.5 w-full">
            <div className="flex flex-wrap items-center gap-3">
              {/* টাইটেল */}
              <div className="h-7 sm:h-8 w-28 sm:w-36 bg-slate-200 rounded-lg" />
              {/* মোট পণ্য ব্যাজ */}
              <div className="h-6 w-24 bg-blue-100/70 rounded-full" />
            </div>
            {/* বিবরণ লাইন */}
            <div className="h-4 w-56 sm:w-80 bg-slate-200/70 rounded-md" />
          </div>
        </div>

        {/* ২. পণ্য সংখ্যা এবং সর্টিং বার স্কেলেটন */}
        <div className="bg-white rounded-2xl border border-slate-200/80 px-4 sm:px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          {/* বাম পাশের টেক্সট */}
          <div className="h-4 w-44 bg-slate-200/80 rounded-md" />

          {/* ডান পাশের সর্ট ড্রপডাউন */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <div className="h-4 w-14 bg-slate-200/70 rounded-md" />
            <div className="h-8 w-36 bg-slate-200/80 rounded-xl" />
          </div>
        </div>

        {/* ৩. প্রোডাক্ট কার্ডস গ্রিড স্কেলেটন (৬টি কার্ড) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-1">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-4 shadow-2xs"
            >
              {/* কার্ডের উপরের অংশ: আইকন ও নাম/একক */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-200/80 shrink-0" />
                <div className="space-y-2 w-full">
                  <div className="h-5 w-3/4 bg-slate-200 rounded-md" />
                  <div className="h-3.5 w-1/2 bg-slate-200/70 rounded-md" />
                </div>
              </div>

              {/* নিচের ডিভাইডার ও দামের অংশ */}
              <div className="pt-4 border-t border-slate-100 flex items-end justify-between">
                <div className="space-y-2">
                  <div className="h-3 w-20 bg-slate-200/70 rounded-md" />
                  <div className="h-6 w-28 bg-slate-200 rounded-md" />
                </div>
                <div className="h-7 w-16 bg-slate-200/80 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default loading;