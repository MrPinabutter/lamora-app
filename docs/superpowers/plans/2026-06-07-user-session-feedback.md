# User Session Feedback Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show logged-in users a persistent profile link in the nav and adapt the homepage Hero CTAs to reflect their authenticated state.

**Architecture:** Session is read server-side via `readSession()` (httpOnly cookie, server-only). Both touch points — the nav header and the homepage Hero — are Server Components, so they call `readSession()` directly with no client state, no API route, and no Zustand changes. `null` return always falls back to the unauthenticated UI.

**Tech Stack:** Next.js 16 App Router · Server Components · TypeScript · Tailwind CSS 4 · lucide-react · `@/server/auth/session`

**Spec:** `docs/superpowers/specs/2026-06-07-user-session-feedback-design.md`  
**Living doc:** `docs/07-session-feedback.mdx`

---

## File Map

| File | Action | What changes |
|---|---|---|
| `src/app/(public)/_components/UserButton.tsx` | **Create** | New Server Component — user icon or "Entrar" link |
| `src/app/(public)/layout.tsx` | **Modify** | Import and render `<UserButton />` in the header |
| `src/app/(public)/page.tsx` | **Modify** | Read session, conditionally render Hero `actions` |

---

## Task 1: Create `UserButton`

**Files:**
- Create: `src/app/(public)/_components/UserButton.tsx`

- [ ] **Step 1: Create the component file**

Create `src/app/(public)/_components/UserButton.tsx` with the following content:

```tsx
import Link from "next/link";
import { User } from "lucide-react";
import { readSession } from "@/server/auth/session";
import { Text } from "@/shared/components/atoms/Text";

export async function UserButton() {
  const session = await readSession();

  if (session) {
    return (
      <Link
        href="/perfil"
        aria-label="Meu perfil"
        className="text-foreground hover:text-accent focus-visible:ring-primary inline-flex size-9 items-center justify-center rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
      >
        <User className="size-4" aria-hidden />
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className="focus-visible:ring-primary group inline-flex flex-col items-center gap-1 rounded-sm py-1 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
    >
      <Text
        variant="eyebrow"
        as="span"
        className="text-muted transition-colors group-hover:text-foreground"
      >
        Entrar
      </Text>
    </Link>
  );
}
```

Key decisions:
- `async` function — required to `await readSession()`
- No `"use client"` — this is a Server Component intentionally; the session cookie is httpOnly and can only be read server-side
- Icon sizing (`size-4`) and focus ring classes match `CartIconButton` exactly
- "Entrar" link style matches `SiteNav` link style — same `eyebrow` variant and hover behavior

- [ ] **Step 2: Verify lint passes**

Run: `pnpm lint`

Expected: no errors. If you see `import/no-restricted-paths` or `boundaries` errors, it means the import path is wrong — double-check `@/server/auth/session` and `@/shared/components/atoms/Text` are the correct aliases.

- [ ] **Step 3: Commit**

```bash
git add src/app/(public)/_components/UserButton.tsx
git commit -m "feat: add UserButton server component"
```

---

## Task 2: Add `UserButton` to the nav header

**Files:**
- Modify: `src/app/(public)/layout.tsx`

- [ ] **Step 1: Read the current file**

Open `src/app/(public)/layout.tsx`. The right-side flex group currently looks like this:

```tsx
<div className="flex items-center gap-8">
  <SiteNav links={NAV_LINKS} />
  <CartButton />
</div>
```

- [ ] **Step 2: Add the import and render `UserButton`**

Add the import at the top of the file alongside the existing imports:

```tsx
import { UserButton } from "./_components/UserButton";
```

Then update the right-side flex group to place `UserButton` between `SiteNav` and `CartButton`:

```tsx
<div className="flex items-center gap-8">
  <SiteNav links={NAV_LINKS} />
  <UserButton />
  <CartButton />
</div>
```

The full updated file should look like:

```tsx
import Link from "next/link";
import { CartSidebar } from "@/features/cart";
import { Text } from "@/shared/components/atoms/Text";
import {
  SiteNav,
  type SiteNavLink,
} from "@/shared/components/molecules/SiteNav";
import { CartButton } from "./_components/CartButton";
import { SiteFooter } from "./_components/SiteFooter";
import { UserButton } from "./_components/UserButton";

const NAV_LINKS: ReadonlyArray<SiteNavLink> = [
  { href: "/produtos", label: "Produtos" },
];

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const storePhone = process.env.STORE_PHONE ?? "";

  return (
    <>
      <header className="border-border-soft bg-background/85 sticky top-0 z-40 border-b backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:h-20">
          <Link
            href="/"
            aria-label="Lamora — página inicial"
            className="focus-visible:ring-primary rounded-sm focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
          >
            <Text
              variant="h2"
              as="span"
              className="font-serif text-lg font-medium tracking-[0.32em] uppercase"
            >
              <img
                src="logo.svg"
                alt="Lamora"
                width={130}
                className="h-auto w-40"
              />
            </Text>
          </Link>
          <div className="flex items-center gap-8">
            <SiteNav links={NAV_LINKS} />
            <UserButton />
            <CartButton />
          </div>
        </nav>
      </header>
      <div className="flex-1">{children}</div>
      <SiteFooter />
      <CartSidebar storePhone={storePhone} />
    </>
  );
}
```

- [ ] **Step 3: Verify lint passes**

Run: `pnpm lint`

Expected: no errors.

- [ ] **Step 4: Verify visually in the browser**

The dev server is already running at `http://localhost:3000`.

Open the browser and check:

| What to check | Expected |
|---|---|
| Not logged in | Header shows "Entrar" text link on the right, before the cart icon |
| Clicking "Entrar" | Navigates to `/login` |
| Logged in (manually set cookie or log in via `/login`) | Header shows the `User` icon instead of "Entrar" |
| Clicking the user icon | Navigates to `/perfil` |
| Focus ring on both states | Visible ring on keyboard navigation (Tab key) |

- [ ] **Step 5: Commit**

```bash
git add src/app/(public)/layout.tsx
git commit -m "feat: render UserButton in public layout nav"
```

---

## Task 3: Adapt the homepage Hero CTAs

**Files:**
- Modify: `src/app/(public)/page.tsx`

- [ ] **Step 1: Read the current Hero actions block**

Open `src/app/(public)/page.tsx`. The `HomePage` function is an `async` function. The Hero's `actions` prop currently contains:

```tsx
actions={
  <>
    <Link
      href="/cadastro"
      className="bg-primary text-primary-foreground hover:bg-foreground focus-visible:ring-primary focus-visible:ring-offset-background inline-flex h-12 items-center justify-center rounded-full px-9 text-[12px] font-medium tracking-[0.18em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      Criar conta
    </Link>
    <Link
      href="/produtos"
      className="text-foreground hover:text-accent focus-visible:ring-primary group inline-flex items-center gap-2 rounded-sm py-1 text-[12px] font-medium tracking-[0.18em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
    >
      Ver Catálogo
      <ArrowRight
        className="size-3.5 transition-transform group-hover:translate-x-1"
        aria-hidden
      />
    </Link>
  </>
}
```

- [ ] **Step 2: Add `readSession` import and call**

Add the import at the top of the file:

```tsx
import { readSession } from "@/server/auth/session";
```

Then, inside `HomePage`, add the session read right after the existing `Promise.all` call:

```tsx
const session = await readSession();
```

The top of `HomePage` should now look like:

```tsx
export default async function HomePage() {
  const [featuredProducts, featuredFragrance, brands] = await Promise.all([
    getFeaturedProducts(4),
    getFeaturedFragrance(),
    getProductBrands(),
  ]);

  const session = await readSession();

  // ... rest of the function
```

- [ ] **Step 3: Extract Hero actions into a named variable**

Before the `return`, define the Hero actions based on session state. Add this block right after the `indexFor` helper function, before the `return`:

```tsx
const heroActions = session ? (
  <>
    <Link
      href="/perfil"
      className="bg-primary text-primary-foreground hover:bg-foreground focus-visible:ring-primary focus-visible:ring-offset-background inline-flex h-12 items-center justify-center rounded-full px-9 text-[12px] font-medium tracking-[0.18em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      Meu perfil
    </Link>
    <Link
      href="/produtos"
      className="text-foreground hover:text-accent focus-visible:ring-primary group inline-flex items-center gap-2 rounded-sm py-1 text-[12px] font-medium tracking-[0.18em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
    >
      Ver Catálogo
      <ArrowRight
        className="size-3.5 transition-transform group-hover:translate-x-1"
        aria-hidden
      />
    </Link>
  </>
) : (
  <>
    <Link
      href="/cadastro"
      className="bg-primary text-primary-foreground hover:bg-foreground focus-visible:ring-primary focus-visible:ring-offset-background inline-flex h-12 items-center justify-center rounded-full px-9 text-[12px] font-medium tracking-[0.18em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      Criar conta
    </Link>
    <Link
      href="/produtos"
      className="text-foreground hover:text-accent focus-visible:ring-primary group inline-flex items-center gap-2 rounded-sm py-1 text-[12px] font-medium tracking-[0.18em] uppercase transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
    >
      Ver Catálogo
      <ArrowRight
        className="size-3.5 transition-transform group-hover:translate-x-1"
        aria-hidden
      />
    </Link>
  </>
);
```

- [ ] **Step 4: Update the Hero JSX to use `heroActions`**

Replace the `actions={...}` inline block in `<Hero>` with the variable:

```tsx
<Hero
  eyebrow="Perfumaria · Curadoria"
  title={
    <>
      Fragrâncias e cuidados,
      <br />
      escolhidos com calma.
    </>
  }
  description="Uma seleção pensada para o seu ritmo. Crie sua conta para receber lançamentos em primeira mão e salvar suas favoritas."
  meta={HERO_META}
  actions={heroActions}
  scrollHint="Role para descobrir"
/>
```

- [ ] **Step 5: Verify lint passes**

Run: `pnpm lint`

Expected: no errors. Common mistake: forgetting to add `import { readSession } from "@/server/auth/session"` — ESLint will catch an undefined identifier.

- [ ] **Step 6: Verify visually in the browser**

| What to check | Expected |
|---|---|
| Not logged in — homepage Hero | Shows "Criar conta" (→ `/cadastro`) and "Ver Catálogo" |
| Logged in — homepage Hero | Shows "Meu perfil" (→ `/perfil`) and "Ver Catálogo" |
| Clicking "Meu perfil" when logged in | Navigates to `/perfil` correctly |
| Clicking "Meu perfil" when NOT logged in (impossible by design) | N/A — button only appears when session exists |

To test the logged-in state: log in via `/login` first, then navigate to `/` to see the adapted Hero.

- [ ] **Step 7: Commit**

```bash
git add src/app/(public)/page.tsx
git commit -m "feat: adapt homepage Hero CTAs based on session state"
```

---

## Final check

- [ ] **Run `pnpm build`** — confirms no TypeScript errors across the three changed files.

```bash
pnpm build
```

Expected: build completes with no errors. The output will show `/(public)` routes compiled successfully.
