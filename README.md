# ShopSphere — React Router E‑commerce

A portfolio‑ready **e‑commerce SPA** built with **React + Vite** and **React Router v6**.
It demonstrates realistic patterns recruiters expect to see:

- **Products list** with **query filters** (`?q=`, `?cat=`) via `useSearchParams`
- **Product detail** via dynamic **URL param** (`/products/:id`) + **route loader**
- **Cart** with localStorage persistence (Context API)
- **Protected** **Checkout** and **Dashboard** (`<Navigate/>` guard)
- **Nested routes** and **breadcrumbs** using `useMatches()`
- **Lazy‑loaded** route components (`React.lazy` + `Suspense`)
- **404** route and simple **scroll restoration**

## Quickstart
```bash
npm i
npm run dev
```

## Scripts
- `npm run dev` — start Vite dev server
- `npm run build` — build for production
- `npm run preview` — preview local production build

## Project Structure
```text
src/
  auth/             # AuthContext (fake login)
  cart/             # CartContext (persisted)
  components/       # ProtectedRoute, Breadcrumbs, ScrollToTop
  data/             # products.json
  pages/            # Route components (Home, Products, ProductDetail, Cart, Checkout, Dashboard/*)
  routes.jsx        # createBrowserRouter config with loaders and guards
  main.jsx          # RouterProvider mount
```

## How this highlights React Router
- **Data Routers**: `productsLoader`, `productDetailLoader` simulate data fetching.
- **Dynamic Params**: product page uses `:id` to fetch the right item.
- **Search Params**: `/products?q=watch&cat=Wearables` produces a filtered list.
- **Nested Layouts**: `RootLayout` + `DashboardLayout` share UI with `<Outlet/>`.
- **Protected Routes**: `Checkout` and `Dashboard/*` require login; otherwise `<Navigate/>` to `/login` with `state.from`.
- **Breadcrumbs**: Via route `handle.breadcrumb` and `useMatches()`.

## Deploy to GitHub Pages (two options)
### A) Simple manual deploy
1. Uncomment `base` in `vite.config.js` and set to `'/<your-repo-name>/'` (e.g., `/shopsphere/`).
2. Build:
   ```bash
   npm run build
   ```
3. Create a `gh-pages` branch and push `dist/` content there (or use any static hosting).

### B) GitHub Actions (recommended for resume)
1. Create a new repo on GitHub: **ShopSphere**.
2. Commit & push this project:
   ```bash
   git init
   git add .
   git commit -m "feat: bootstrap ShopSphere (React Router e-commerce)"
   git branch -M main
   git remote add origin https://github.com/<your-username>/ShopSphere.git
   git push -u origin main
   ```
3. In `vite.config.js`, set `base: '/ShopSphere/'`.
4. Add an Actions workflow (see below) to auto‑deploy to `gh-pages` on every push.

#### `.github/workflows/gh-pages.yml`
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci || npm i
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: 'dist' }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Then enable **Settings → Pages → Source: GitHub Actions**.

## Vercel / Netlify
- Vercel: Import the repo, framework **Vite**, build `npm run build`, output `dist/`.
- Netlify: Same build/output; no `base` change in `vite.config.js` required.

## Resume bullets (copy‑paste)
- Built **ShopSphere**, a React Router v6 e‑commerce SPA with nested layouts, protected checkout, and route‑based code splitting.
- Implemented **data loaders**, **URL params**, and **search params** for dynamic routing and discoverability.
- Added **cart persistence** via Context + localStorage; designed clean, responsive UI with Vite.

## License
MIT
