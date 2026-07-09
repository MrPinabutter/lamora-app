import Link from "next/link";
import { CartSidebar } from "@/features/cart";
import { Text } from "@/shared/components/atoms/Text";
import {
  SiteNav,
  type SiteNavLink,
} from "@/shared/components/molecules/SiteNav";
import { AdminButton } from "./_components/AdminButton";
import { CartButton } from "./_components/CartButton";
import { SearchButton } from "./_components/SearchButton";
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
            <AdminButton />
            <SearchButton />
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
