"use client";

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  Label,
  ProgressCircle,
  Separator,
} from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "@/lib/auth-client";
import logo from "@/assets/logo-icon.png"
// import { ICategory } from "@/types/type";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
//   const [categories, setCategories] = useState<ICategory[]>([]);

  const formattedDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

 useEffect(() => {
  const fetchCategories = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) return;

      const res = await fetch(`${apiUrl}/categories`);
      
      if (!res.ok) {
        console.error("Network response was not ok");
        return;
      }

      const text = await res.text(); 
      if (!text) return;

      const data = JSON.parse(text);
      // setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };
  fetchCategories();
}, []);

  const { data, isPending } = useSession();
  const handleSignOut = async () => {
    await signOut();
  };
  //   console.log(data);
  return (
    <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Top Row: Brand & Auth Buttons */}
        <div className="flex items-center justify-between py-3.5">
          {/* Left: Logo & Date */}
          <div className="flex flex-col gap-1">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <span
                className="text-2xl sm:text-3xl leading-none flex items-center bg-green-400"
                role="img"
                aria-label="bus"
              >
                <Image src={logo} alt="cart picture" width={28} height={28} />
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#0d6efd] tracking-tight">
                বাজার দর
              </span>
            </Link>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span role="img" aria-label="calendar">
                🗓️
              </span>
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Right: Sign In & Sign Up Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isPending ? (
              <ProgressCircle aria-label="Loading" value={60}>
                <ProgressCircle.Track>
                  <ProgressCircle.TrackCircle />
                  <ProgressCircle.FillCircle />
                </ProgressCircle.Track>
              </ProgressCircle>
            ) : data?.user.name ? (
              <Dropdown>
                <Button isIconOnly aria-label="Menu" variant="secondary">
                  <Avatar>
                    <Avatar.Image
                      alt={data?.user.name}
                      src={
                        "https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
                      }
                    />
                    <Avatar.Fallback>JD</Avatar.Fallback>
                  </Avatar>
                </Button>
                <Dropdown.Popover>
                  <Dropdown.Menu
                    onAction={(key) => console.log(`Selected: ${key}`)}
                  >
                    <Dropdown.Item id="new-file" textValue="New file">
                      <Link href={"/profile"}>প্রোফাইল</Link>
                    </Dropdown.Item>
                    <Dropdown.Item textValue="update-profile">
                      <Link href={"/profile/update-profile"}>
                        {" "}
                        আপডেট প্রোফাইল
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item textValue="sign-out">
                      <Button onClick={handleSignOut}>সাইন আউট</Button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  className="h-9 px-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#0d6efd] hover:bg-slate-50 transition-colors"
                >
                  <Link href={"/signin"}>সাইন ইন</Link>
                </Button>

                <Button
                  type="button"
                  variant="primary"
                  className="h-9 sm:h-10 px-4 sm:px-5 rounded-xl bg-[#0d6efd] hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors"
                >
                  <Link href={"/signup"}>সাইন আপ</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Middle Divider */}
        <Separator className="w-full bg-slate-100" />

        {/* Bottom Row: Dynamic Categories Navigation */}
        <nav
          aria-label="Category Navigation"
          className="flex items-center gap-5 sm:gap-8 py-2.5 overflow-x-auto no-scrollbar"
        >
          {/* Categories mapping if needed */}
        </nav>
      </div>
    </header>
  );
}