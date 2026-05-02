# 🐱 Catly — Salla Twilight Theme

A playful, premium cat food theme for Salla stores with full Arabic/English support, merchant-customizable colors, and Google SEO + Merchant Center compliance built in.

## Features

- 🎨 **Merchant-customizable colors** — primary, secondary, accent, background, text, and sale colors all editable from the Salla Partners Portal
- 🌍 **Bilingual (Arabic / English)** — full RTL support, locale files, separate RTL/LTR CSS builds
- 🔍 **SEO-ready** — JSON-LD structured data, Open Graph, hreflang, canonical URLs, sitemap-friendly
- 🛍️ **Google Merchant Center compliant** — Product schema with brand, GTIN/MPN, condition, availability, shipping, and return policy
- 📱 **Mobile-first** — sticky header, bottom nav, optimized for ~375px screens
- ♿ **Accessible** — semantic HTML, ARIA labels, keyboard navigation, screen-reader-friendly
- ⚡ **Fast** — lazy loading, optimized fonts, no jQuery, minimal JavaScript

---

## Setup on macOS with VS Code + Claude Code

### 1. Prerequisites

```bash
# Check Node.js (need 16.13.1+)
node --version

# Check npm (need 6.14.0+)
npm --version
```

If you don't have these, install via [nvm](https://github.com/nvm-sh/nvm):
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
nvm install --lts
```

You also need:
- A [Salla Partners account](https://salla.partners)
- A GitHub account
- VS Code installed
- Rosetta 2 (if on Apple Silicon): `softwareupdate --install-rosetta`

### 2. Install Salla CLI and Claude Code

```bash
npm install -g @salla.sa/cli
npm install -g @anthropic-ai/claude-code
```

### 3. Set up the theme

```bash
cd ~/Projects   # or wherever you keep code
# Place this catly-theme folder here
cd catly-theme
npm install
```

### 4. Authenticate with Salla

```bash
salla login
```

Follow the prompts to authorize via Partners Portal.

### 5. Open in VS Code with Claude Code

```bash
code .
```

In VS Code:
1. Install the **Claude Code** extension from the marketplace (publisher: Anthropic)
2. Sign in with your Anthropic account
3. The `CLAUDE.md` file in the project root will automatically guide Claude on every request

### 6. Preview the theme locally

```bash
salla theme preview
```

This launches the Twilight Watcher and opens your demo store in the browser. Edits to any `.twig`, `.scss`, or `.js` file reflect live.

---

## Project Structure

```
catly-theme/
├── twilight.json              ← Theme config: settings, features, components
├── package.json
├── webpack.config.js          ← Builds RTL + LTR CSS, bundles JS
├── CLAUDE.md                  ← Instructions for Claude Code
├── README.md
└── src/
    ├── assets/
    │   ├── images/
    │   ├── js/
    │   │   └── salla-theme.js
    │   └── styles/
    │       └── main.scss
    ├── locales/
    │   ├── ar.json
    │   └── en.json
    └── views/
        ├── layouts/
        │   └── master.twig    ← Main layout: SEO, fonts, color vars
        ├── pages/
        │   ├── index.twig     ← Home page
        │   ├── cart.twig
        │   └── product/
        │       └── single.twig ← Full Product schema for Merchant Center
        └── components/
            ├── header/
            │   ├── header.twig
            │   └── mobile-nav.twig
            ├── footer/
            │   └── footer.twig
            ├── home/
            │   ├── cat-categories-grid.twig
            │   └── subscription-banner.twig
            └── product/
                └── card.twig
```

---

## Customization

### Colors

Merchants change colors from the Partners Portal under **Theme Settings → Brand colors**. The CSS variables in `master.twig` pick up these values automatically:

```css
--color-primary    /* Buttons, badges, accents */
--color-secondary  /* Highlights, secondary CTAs */
--color-accent     /* Success, eco/grain-free badges */
--color-bg         /* Page background */
--color-text       /* Body text */
--color-sale       /* Sale badges, discount markers */
```

### Adding a custom component

1. Create the file: `src/views/components/home/my-component.twig`
2. Add to `twilight.json`:
   ```json
   {
     "name": "my-component",
     "label": { "ar": "...", "en": "..." },
     "icon": "fas fa-star",
     "path": "home.my-component"
   }
   ```
3. Reference in `index.twig`: `{% component home.my-component %}`
4. Add translations to **both** `ar.json` and `en.json`

### Asking Claude to help

With Claude Code open in VS Code, examples of what to ask:

> "Add a recently viewed products component below the related products on the product page."

> "The Add to Cart button needs a loading state while the request is in flight."

> "Add a product comparison feature where customers can compare up to 3 cat foods side by side."

Claude will read `CLAUDE.md`, your existing files, and the locale structure, then make consistent changes.

---

## SEO Compliance Checklist

✅ Title and meta description on every page
✅ Canonical URLs
✅ Open Graph and Twitter Card meta tags
✅ hreflang for `ar` and `en`
✅ Robots meta (with `noindex` flag for hidden pages)
✅ Organization schema (every page)
✅ BreadcrumbList schema (category + product pages)
✅ Product schema with all Merchant Center required fields
✅ Image alt text on all product images
✅ Lazy loading for below-the-fold images
✅ Fast Core Web Vitals (no render-blocking JS)

## Google Merchant Center Required Fields

Every product page outputs:

| Field | Source | Notes |
|-------|--------|-------|
| `name` | `product.name` | Required |
| `image` | `product.images` | Required, multiple supported |
| `description` | `product.description` | Stripped of HTML |
| `sku` / `mpn` | `product.sku` | One required |
| `gtin13` | `product.barcode` | Optional but boosts ranking |
| `brand` | `product.brand.name` | **Required** — falls back to `default_brand_name` setting |
| `offers.price` | `product.price.amount` | Required |
| `offers.priceCurrency` | `store.currency` | Required |
| `offers.availability` | Calculated from quantity | Uses exact `https://schema.org/InStock` URL |
| `offers.itemCondition` | Hardcoded `NewCondition` | Required |
| `shippingDetails` | `product.shipping_cost` + store country | Required |
| `hasMerchantReturnPolicy` | 14-day free return | Required |

---

## Publishing the theme

```bash
# Build production assets
npm run build

# Submit for Salla review
salla theme publish
```

Salla reviews check:
1. UI/UX (uniqueness, cohesive look across all pages)
2. Technical (code quality, hooks usage, performance)
3. Metadata (theme listing info)
4. Pre-launch (functional QA on demo store)

---

## License

MIT
