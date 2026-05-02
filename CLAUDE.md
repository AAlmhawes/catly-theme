# Catly Theme — Claude Code Instructions

This is a Salla Twilight theme for a cat food store. Read this file before making any changes.

## Project conventions

### Templating
- All templates use Twilight (Twig-flavored) syntax: `{{ variable }}`, `{% block %}`, `{% component name %}`, `{% hook 'name' %}`
- Always use Salla's pre-defined components when possible (`{% component products-slider %}`, `{% component featured-products %}`)
- Custom components live in `src/views/components/`
- Pages live in `src/views/pages/`
- The master layout is `src/views/layouts/master.twig`

### Styling
- Use CSS custom properties — never hardcode colors
- All theme colors come from `var(--color-primary)`, `var(--color-secondary)`, etc.
- These are set in `master.twig` from `store.settings.*` so merchants can customize
- Border radius: pills use `border-radius: 999px`, cards use `12px`, inputs use `10px`
- Font family: `var(--font-main)` (defaults to Tajawal)

### Internationalization
- This theme MUST support Arabic (RTL) and English (LTR)
- Never hardcode user-facing strings in templates — use `{{ trans('namespace.key') }}`
- All translations live in `src/locales/ar.json` and `src/locales/en.json`
- Both files MUST have identical key structures
- The `dir` attribute on `<html>` is set automatically based on `store.language.code`
- Use logical CSS properties when possible: `margin-inline-start` instead of `margin-left`

### SEO requirements (NON-NEGOTIABLE)
Every page must output:
- `<title>` and `<meta name="description">` from page-specific data
- `<link rel="canonical">` pointing to the current page
- Open Graph tags (og:title, og:description, og:image, og:url, og:locale)
- `<link rel="alternate" hreflang="...">` for both `ar` and `en`
- Breadcrumb JSON-LD schema on all non-home pages

Product pages must additionally output:
- Product JSON-LD with: name, image, description, sku, brand, offers (price, currency, availability, itemCondition), shippingDetails, hasMerchantReturnPolicy, aggregateRating
- `availability` MUST use exact schema.org URLs: `https://schema.org/InStock` or `https://schema.org/OutOfStock` — NEVER `in_stock` or `instock`
- `itemCondition` must be `https://schema.org/NewCondition` for new products
- `brand` is REQUIRED — fall back to `store.settings.default_brand_name` if `product.brand` is empty (Google Merchant Center will disapprove products without a brand)

### Performance
- All `<img>` tags need explicit `width`, `height`, `loading="lazy"` (except hero/above-fold images), and `decoding="async"`
- Hero images use `loading="eager"` and `fetchpriority="high"`
- No inline scripts in `<body>` — defer to footer or use the Salla `body:end` hook
- Lazy-load below-the-fold components

### File organization
```
src/
├── assets/
│   ├── images/
│   ├── js/         (custom JS, salla-theme.js as entry)
│   └── styles/     (main.scss as entry, partials prefixed with _)
├── locales/
│   ├── ar.json
│   └── en.json
└── views/
    ├── layouts/
    │   └── master.twig
    ├── pages/
    │   ├── index.twig
    │   ├── cart.twig
    │   ├── product/single.twig
    │   ├── product/index.twig (listing)
    │   └── ...
    └── components/
        ├── header/
        ├── footer/
        ├── home/
        └── product/
```

## What NOT to do
- Don't use `display:none` to hide elements when conditional rendering would work — keeps DOM clean
- Don't import jQuery — Salla provides utilities via `salla.*` global
- Don't write inline `style="..."` for theming — always use CSS variables
- Don't use `<font>` tags or deprecated HTML
- Don't create separate AR and EN templates — one template, locale-aware strings
- Don't bypass `{% hook %}` extension points — merchants and apps inject content there
- Don't write SEO tags inside `<body>` — they belong in `<head>` only

## When asked to add a new component
1. Create the file in `src/views/components/[category]/[name].twig`
2. Add an entry to `twilight.json` under `components`
3. Reference it in the appropriate page with `{% component category.name %}`
4. Add any user-facing strings to BOTH `ar.json` and `en.json`
5. Use existing CSS variables for all colors and spacing

## Brand identity (Catly)
- Primary: coral `#FF7A4D` (warm, appetite-friendly, distinctive vs other Salla themes)
- Secondary: mango `#FFB627`
- Accent: mint `#5DCAA5`
- Background: cream `#FFF4D6`
- Text: cocoa `#3D2817`
- Sale: tomato `#E24B4A`
- Personality: playful but premium, cat-loving, family-friendly
- Voice: friendly, warm, knowledgeable about pet nutrition
