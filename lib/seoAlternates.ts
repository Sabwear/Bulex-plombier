import type { Metadata } from "next";
import {
  getAlternateLocalePath,
  getLocaleFromPathname,
  type Locale,
} from "@/config/locale-routes";

const BASE_URL = "https://vaillant-loodgieter.com";

function toAbsoluteUrl(pathname: string): string {
  if (!pathname) return BASE_URL;
  if (!pathname.startsWith("/")) return `${BASE_URL}/${pathname}`;
  if (pathname === "/") return BASE_URL;
  return `${BASE_URL}${pathname}`;
}

export function buildLocaleAlternates(
  pathname: string,
): NonNullable<Metadata["alternates"]> {
  const canonicalLocale: Locale = getLocaleFromPathname(pathname);
  const frPath = getAlternateLocalePath(pathname, "fr");
  const nlPath = getAlternateLocalePath(pathname, "nl");
  const canonicalPath = canonicalLocale === "nl" ? nlPath : frPath;

  return {
    canonical: toAbsoluteUrl(canonicalPath),
    languages: {
      "fr-BE": toAbsoluteUrl(frPath),
      "nl-BE": toAbsoluteUrl(nlPath),
      "x-default": toAbsoluteUrl(frPath),
    },
  };
}

