import { Camera, Mail, Music, Share2 } from "lucide-react";
import Link from "next/link";
import { Text } from "@/shared/components/atoms/Text";

const SHOP_LINKS = [
  { href: "/produtos?categoria=PERFUME", label: "Perfumes" },
  { href: "/produtos?categoria=HIDRATANTE", label: "Hidratantes" },
  { href: "/produtos?categoria=ESFOLIANTE", label: "Esfoliantes" },
  { href: "/produtos?categoria=SKIN_CARE", label: "Skin care" },
  { href: "/produtos", label: "Catálogo completo" },
] as const;

const ABOUT_LINKS = [
  { href: "/", label: "Nosso ritual" },
  { href: "/", label: "Marcas parceiras" },
  { href: "/", label: "Diário olfativo" },
  { href: "/", label: "Sustentabilidade" },
] as const;

const HELP_LINKS = [
  { href: "/", label: "Frete & prazos" },
  { href: "/", label: "Trocas e devoluções" },
  { href: "/", label: "Atendimento" },
  { href: "/", label: "FAQ" },
] as const;

const LEGAL_LINKS = [
  { href: "/privacidade", label: "Privacidade" },
  { href: "/termos", label: "Termos" },
] as const;

const SOCIALS = [
  { label: "Instagram", icon: Camera, href: "#" },
  { label: "TikTok", icon: Music, href: "#" },
  { label: "Pinterest", icon: Share2, href: "#" },
  { label: "E-mail", icon: Mail, href: "mailto:ola@lamora.com.br" },
] as const;

interface FooterColumnProps {
  title: string;
  links: ReadonlyArray<{ href: string; label: string }>;
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h5 className="text-ink-muted mb-6 text-[11px] font-medium tracking-[0.22em] uppercase">
        {title}
      </h5>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-ink-foreground hover:text-ink-foreground-strong text-sm transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-9">
        <div className="border-ink-border grid gap-12 border-b pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-16">
          <div>
            <Text
              variant="h2"
              as="p"
              className="text-ink-foreground-strong mb-5 font-serif text-2xl font-normal tracking-[0.3em]"
            >
              L A M O R A
            </Text>
            <p className="text-ink-muted mb-7 max-w-xs text-sm leading-[1.7]">
              Perfumaria e cuidados, escolhidos com calma. Atendimento de
              segunda a sexta, das 10h às 18h.
            </p>
            <div className="flex gap-4">
              {SOCIALS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="border-ink-foreground/20 text-ink-foreground hover:border-ink-foreground/40 hover:bg-ink-foreground-strong/6 inline-grid size-9 place-items-center rounded-full border transition-all"
                >
                  <Icon className="size-3.5" aria-hidden />
                </a>
              ))}
            </div>
          </div>
          <FooterColumn title="Loja" links={SHOP_LINKS} />
          <FooterColumn title="Sobre" links={ABOUT_LINKS} />
          <FooterColumn title="Ajuda" links={HELP_LINKS} />
        </div>
        <div className="text-ink-muted-2 flex flex-col gap-4 pt-8 text-[11.5px] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getUTCFullYear()} Lamora Curadoria Ltda. — CNPJ
            00.000.000/0001-00
          </span>
          <ul className="flex gap-6">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-ink-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
