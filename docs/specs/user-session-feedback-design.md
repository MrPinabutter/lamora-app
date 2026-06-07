# User Session Feedback — Design Spec

**Date:** 2026-06-07  
**Status:** Approved  
**Living doc:** `docs/07-session-feedback.mdx`  

## Problem

A logged-in user has no visual feedback that they are authenticated. The profile page at `/perfil` is only reachable by typing the URL directly. The homepage Hero always shows "Criar conta" regardless of session state, which is confusing for returning users.

## Goal

Make it immediately obvious when a user is logged in and give them a persistent, one-click path to `/perfil` from any page — without adding visual noise to the minimalist design.

## Scope

Two touch points, both small and isolated:

1. A `UserButton` component in the global nav header.
2. Conditional Hero CTAs on the homepage.

Out of scope: logout action, redirect-after-login flow, wishlist, and any other auth UX (deferred to future tasks).

---

## Architecture

Session is stored as an httpOnly HMAC-signed cookie read via `readSession()` (server-only). Both touch points are Server Components, so they call `readSession()` directly — no client-side state, no new API route, no Zustand changes.

`readSession()` returns `null` on any failure (missing cookie, bad signature, expired). `null` is treated as "not logged in" — the unauthenticated UI is always the safe fallback.

All rendering happens server-side before the page is sent to the browser. No loading states, no flicker.

---

## Components

### 1. `UserButton` — new Server Component

**Location:** `src/app/(public)/_components/UserButton.tsx`

Reads the session internally. Renders one of two states:

| Session state | Renders | Destination |
|---|---|---|
| Logged in | `User` icon button (lucide-react) | `/perfil` |
| Not logged in | Text link "Entrar" (eyebrow style) | `/login` |

The icon button uses `aria-label="Meu perfil"` for accessibility. Sizing and visual weight match the existing `CartButton` — they live side by side in the header.

### 2. `PublicLayout` — edit

**Location:** `src/app/(public)/layout.tsx`

Add `<UserButton />` to the header's right-side flex group, between `<SiteNav />` and `<CartButton />`. No props needed — `UserButton` reads the session itself.

```
[Logo]          [Produtos]  [UserButton]  [CartButton]
```

### 3. `HomePage` — conditional Hero actions

**Location:** `src/app/(public)/page.tsx`

Call `readSession()` at the top of `HomePage`. Pass different `actions` to `<Hero>` based on session state:

| Session state | Hero primary CTA | Hero secondary CTA |
|---|---|---|
| Not logged in | "Criar conta" → `/cadastro` | "Ver Catálogo" → `/produtos` |
| Logged in | "Meu perfil" → `/perfil` | "Ver Catálogo" → `/produtos` |

The `Hero` component accepts `actions` as a `ReactNode` prop — no changes to `Hero` itself.

---

## Design Tokens & Style Rules

All new markup uses existing tokens:

- Icon button: same `focus-visible` ring pattern as `CartButton`
- "Entrar" text link: `Text variant="eyebrow"` — matches `SiteNav` link style
- Hero CTA buttons: reuse the exact class strings already in `page.tsx`; only the label and `href` change

No raw hex, no arbitrary font sizes, no new design tokens.

---

## Error Handling & Edge Cases

- **Session read failure** — `readSession()` returns `null`; UI falls back to unauthenticated state silently.
- **Expired cookie mid-session** — next server render shows "Entrar" in the nav. The `/perfil` guard (`if (!session) redirect("/login")`) remains untouched.
- **`/perfil` protection** — `UserButton` is a shortcut, not a bypass. The page-level session guard is the source of truth.
- **No flash** — server rendering means the correct UI is always on first paint.

---

## Files Changed

| File | Change |
|---|---|
| `src/app/(public)/_components/UserButton.tsx` | New file |
| `src/app/(public)/layout.tsx` | Add `<UserButton />` to nav |
| `src/app/(public)/page.tsx` | Read session, conditionally render Hero actions |
