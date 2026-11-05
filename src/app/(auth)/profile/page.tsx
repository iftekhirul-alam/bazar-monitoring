import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  HiOutlineMail,
  HiOutlinePencilAlt,
  HiOutlineShieldCheck,
  HiOutlineArrowLeft,
} from "react-icons/hi";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  if (!user) return null;

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>

      {/* Profile Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          আমার প্রোফাইল
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন ও পরিচালনা করুন।
        </p>
      </div>

      {/* Profile Information Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Avatar & Name */}
        <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-slate-100 text-center sm:text-left">
          <div className="w-20 h-20 rounded-full bg-linear-to-tr from-blue-600 to-indigo-600 text-white font-black text-3xl flex items-center justify-center shadow-md overflow-hidden">
            {user.image ? (
              <Image
                width={300}
                height={200}
                src={user.image}
                alt={user.name || "User"}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{(user.name || "U")[0].toUpperCase()}</span>
            )}
          </div>

          <div className="space-y-1 flex-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {user.name || "ব্যবহারকারী"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 flex items-center justify-center sm:justify-start gap-1">
              <HiOutlineMail className="w-4 h-4" />
              <span>{user.email}</span>
            </p>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
              <HiOutlineShieldCheck className="w-3.5 h-3.5" />
              <span>ভেরিফাইড অ্যাকাউন্ট</span>
            </span>
          </div>
        </div>

        {/* Account Information Details */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            ব্যক্তিগত তথ্য
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-400 font-medium block">
                নাম
              </span>
              <p className="text-sm font-bold text-slate-800 mt-0.5">
                {user.name || "নাম নেই"}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-400 font-medium block">
                ইমেইল (Read-only)
              </span>
              <p className="text-sm font-bold text-slate-800 mt-0.5 truncate">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Update Profile Action */}
        <div className="pt-2">
          <Link
            href="/profile/update-profile"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2"
          >
            <HiOutlinePencilAlt className="w-5 h-5" />
            <span>তথ্য আপডেট করুন</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;