"use client";
import { hasCookie, setCookie } from "cookies-next";
import { nanoid } from "nanoid";

export default function CookieManager() {
  if (!hasCookie("userId")) {
    setCookie("userId", nanoid());
  }
  return null;
}
