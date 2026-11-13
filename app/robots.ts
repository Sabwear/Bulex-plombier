import {isBulex,bulexOrigin,bulexIndexable} from '@/config/bulex/brand';
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  if (isBulex) return { rules: {userAgent:'*', ...(bulexIndexable ? {allow:'/',disallow:['/bulex/','/api/']} : {disallow:'/'})}, ...(bulexIndexable ? {host:bulexOrigin,sitemap:bulexOrigin+'/sitemap.xml'} : {}) };
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: "https://vaillant-loodgieter.com",
    sitemap: "https://vaillant-loodgieter.com/sitemap.xml",
  };
}
