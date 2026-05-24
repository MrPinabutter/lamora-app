import Link from "next/link";
import { CartSidebar } from "@/features/cart";
import { Text } from "@/shared/components/atoms/Text";
import { SiteNav, type SiteNavLink } from "@/shared/components/molecules/SiteNav";
import { CartButton } from "./_components/CartButton";

const NAV_LINKS: ReadonlyArray<SiteNavLink> = [
  { href: "/produtos", label: "Produtos" },
];

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const storePhone = process.env.STORE_PHONE ?? "";

  return (
    <>
      <header className="border-border bg-background/85 sticky top-0 z-40 border-b backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:h-20">
          <Link
            href="/"
            aria-label="Lamora — página inicial"
            className="focus-visible:ring-primary rounded-sm focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
          >
            <Text
              variant="h2"
              as="span"
              className="text-lg tracking-[0.32em] uppercase"
            >
              Lamora
            </Text>
          </Link>
          <div className="flex items-center gap-8">
            <SiteNav links={NAV_LINKS} />
            <CartButton />
          </div>
        </nav>
      </header>
      {children}
      <CartSidebar storePhone={storePhone} />
    </>
  );
}
