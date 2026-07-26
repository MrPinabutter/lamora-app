---
name: verify
description: Como buildar, rodar e dirigir o Lamora app para verificar mudanças end-to-end (dev server local, banco local, sessões forjadas, Chrome headless via CDP).
---

# Verificação end-to-end — Lamora

## Banco

- `.env` aponta `DATABASE_URL` para o banco REMOTO (Render) — **nunca escrever nele durante verificação**.
- Banco local: container docker `lamora-db` em `localhost:5433`, URL
  `postgresql://lamora:lamora@localhost:5433/lamora?schema=public`.
- Prepare com: `DATABASE_URL=<local> npx prisma migrate deploy` e `DATABASE_URL=<local> npx prisma db seed`
  (o seed apaga e recria os 10 produtos; IDs mudam).
- Usuário: modelo exige `birthDate` e `phone`; senha é `salt.scrypt64hex` (ver `src/features/auth/lib/password.ts`). Crie usuários de teste via script Node com `createRequire` apontando para o `package.json` do projeto (scripts fora do repo não resolvem `@prisma/client`).

## Servidor

- Next 16 recusa dois `next dev` no mesmo diretório. O dev server do usuário costuma rodar na :3000 — se precisar de outro, mate-o (`kill <pid>` que o próprio Next indica) e **reinicie ao final** com `setsid nohup npm run dev`.
- Rode o servidor de verificação com o banco local: `DATABASE_URL=<local> npx next dev -p 3457`.
- O hook rtk resume/filtra a saída de `next`, `ls`, `cat`, `grep` e pipelines — quando a saída importa, use `rtk proxy <cmd>`, `find`, ou o tool Read.

## Sessões

- Cookie `lamora_session` = `base64url(JSON{userId,expiresAt}) + "." + HMAC-SHA256-hex(payload, AUTH_SECRET)` (ver `src/server/auth/session.ts`). Com o `AUTH_SECRET` do `.env` dá para forjar sessões de qualquer usuário e testar páginas server-rendered com `curl -b "lamora_session=..."`.
- Admin = `User.isAdmin=true` + `status=ACTIVE`; `/admin/*` redireciona 307 → `/login` sem isso.

## Browser (fluxos client-side: carrinho/zustand/localStorage)

- Sem Playwright instalado. Use o Chrome flatpak headless:
  `flatpak run com.google.Chrome --headless=new --remote-debugging-port=9222 --user-data-dir=/tmp/verify-chrome-profile --no-first-run about:blank`
- Dirija via CDP puro (Node ≥22 tem `WebSocket` global): crie aba com `PUT http://localhost:9222/json/new?url=...`, conecte no `webSocketDebuggerUrl` da aba e use `Runtime.evaluate` (com `awaitPromise`/`returnByValue`) e `Page.captureScreenshot`.
- **Gotchas de driving:**
  - Cliques podem cair antes da hidratação do React — repita o clique até a condição valer; para "Adicionar" cheque o `localStorage` (síncrono), não o texto do drawer, para não adicionar duas vezes.
  - Ache o botão "Adicionar" de um produto subindo a partir de `a[href="/produtos/<slug>"]` até o menor contêiner com o botão — andar N níveis para cima casa com o card errado.
  - Drawer do carrinho: `dialog[open]`; fechar: `[aria-label='Fechar']`; abrir: `button[aria-label^='Abrir carrinho']`; quantidade: `[aria-label='Aumentar quantidade']`.
  - Estado persistido: chave `localStorage["lamora-cart"]` (`{state:{items:[...]}}`).
  - O sync do carrinho é assíncrono: um fetch em voo pode regravar a chave depois de um `removeItem` manual — para testar carrinho vazio use o botão "Esvaziar carrinho" do app.

## Fluxos que valem dirigir

- Catálogo público `/produtos` com filtros via query (`?category=&brand=&minPrice=&maxPrice=`).
- `/admin/produtos` (mesmos filtros; exige sessão admin).
- Carrinho: adicionar → drawer abre; reabrir sincroniza nome/preço com o banco e remove produto deletado; re-adicionar mescla por id (não duplica linha).
