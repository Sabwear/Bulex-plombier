# Next.js Setup

## 1. Install Next SEO

Next SEO is a plugin that makes managing your SEO easier in Next.js projects. It provides components for meta tags and structured data (JSON-LD) that help search engines understand your content better.

```bash
npm install next-seo
```

Use the `DefaultSeo` and `NextSeo` components for meta title, description, Open Graph, and JSON-LD.

## 2. Create .env.example

Copy `.agent/.env.example` to your project root so users can easily change settings:

```bash
cp .agent/.env.example .env.example
```

Then copy to `.env.local` and fill in actual values:

```bash
cp .env.example .env.local
```

Never commit `.env.local` to version control.

## 3. IDE Task

When you finish implementation, create `.env.example` at project root from `.agent/.env.example`. This makes it easy for users to adjust brand, contact, and SEO settings.
