const BASE = "https://vaillant-loodgieter.com";

function publicSameAs(): string[] {
  const raw = [
    process.env.NEXT_PUBLIC_FACEBOOK_URL,
    process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    process.env.NEXT_PUBLIC_TWITTER_URL,
    process.env.NEXT_PUBLIC_LINKEDIN_URL,
    process.env.NEXT_PUBLIC_YOUTUBE_URL,
    process.env.NEXT_PUBLIC_TIKTOK_URL,
  ];
  return raw.filter((u): u is string => Boolean(u && u.startsWith("http")));
}

/** E.164-style phone for schema (best-effort from public display number). */
function schemaTelephone(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_PHONE_NUMBER?.replace(/\s/g, "") ?? "";
  if (!raw) return undefined;
  if (raw.startsWith("+")) return raw;
  if (raw.startsWith("32")) return `+${raw}`;
  if (raw.startsWith("0")) return `+32${raw.slice(1)}`;
  return `+${raw}`;
}

export function buildLocaleJsonLdGraph(locale: "nl" | "fr"): Record<string, unknown> {
  const orgName = locale === "nl" ? "Vaillant Loodgieter" : "Vaillant Plombier";
  const primaryPath = locale === "nl" ? "/nl" : "/fr";
  const primaryUrl = `${BASE}${primaryPath}`;
  const inLanguage = locale === "nl" ? "nl-BE" : "fr-BE";
  const orgId = `${BASE}/#organization`;
  const siteId = `${BASE}/#website`;
  const localId = `${BASE}/#localbusiness`;
  const sameAs = publicSameAs();
  const tel = schemaTelephone();

  const email = process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || "contact@vaillant-loodgieter.com";

  const organization: Record<string, unknown> = {
    "@type": "Organization",
    "@id": orgId,
    name: orgName,
    url: BASE,
    logo: {
      "@type": "ImageObject",
      url: `${BASE}/logo-vaillant-loodgieter.png`,
    },
    email,
    ...(tel ? { telephone: tel } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email,
      ...(tel ? { telephone: tel } : {}),
      areaServed: "BE",
      availableLanguage: ["nl", "fr"],
    },
    ...(sameAs.length ? { sameAs } : {}),
  };

  const website: Record<string, unknown> = {
    "@type": "WebSite",
    "@id": siteId,
    url: BASE,
    name: orgName,
    inLanguage,
    publisher: { "@id": orgId },
  };

  const localBusiness: Record<string, unknown> = {
    "@type": "LocalBusiness",
    "@id": localId,
    name: orgName,
    image: `${BASE}/images/slider-vaillant-1.png`,
    url: primaryUrl,
    email,
    ...(tel ? { telephone: tel } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: locale === "nl" ? "België" : "Belgique",
      addressCountry: "BE",
    },
    areaServed: { "@type": "Country", name: "Belgium" },
    availableLanguage: ["nl", "fr"],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    parentOrganization: { "@id": orgId },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, localBusiness],
  };
}
