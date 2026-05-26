import type { Metadata } from "next";
import Link from "next/link";
import { Text } from "@/shared/components/atoms/Text";

export const metadata: Metadata = {
  title: "Política de privacidade — Lamora",
  description:
    "Como a Lamora coleta, usa e protege seus dados pessoais — alinhado à LGPD.",
};

const LAST_UPDATED = "25 de maio de 2026";

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-12 lg:py-20">
      <header className="space-y-3">
        <Text variant="eyebrow">Legal · LGPD</Text>
        <Text variant="h1" className="text-2xl lg:text-[1.75rem]">
          Política de privacidade
        </Text>
        <Text variant="caption" as="p">
          Última atualização: {LAST_UPDATED}.
        </Text>
      </header>

      <article className="mt-12 space-y-10">
        <section className="space-y-3">
          <Text variant="h2" className="text-lg">
            1. Quem somos
          </Text>
          <Text variant="body" as="p">
            A Lamora é uma loja de perfumaria e skincare. Esta política descreve
            como tratamos seus dados pessoais — quais coletamos, por quê, e
            como você pode exercer seus direitos a qualquer momento.
          </Text>
        </section>

        <section className="space-y-3">
          <Text variant="h2" className="text-lg">
            2. Dados que coletamos
          </Text>
          <ul className="text-foreground space-y-2 text-sm leading-relaxed">
            <li>
              <strong className="font-medium">E-mail e senha</strong> —
              identificação e autenticação da sua conta.
            </li>
            <li>
              <strong className="font-medium">Data de nascimento</strong> —
              verificação de idade para venda de produtos cosméticos.
            </li>
            <li>
              <strong className="font-medium">Telefone</strong> — contato sobre
              o pedido e atendimento via WhatsApp.
            </li>
            <li>
              <strong className="font-medium">Dados de uso anônimos</strong> —
              eventos agregados (sessões, adições ao carrinho, envios de
              pedido) usados em relatórios internos.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <Text variant="h2" className="text-lg">
            3. Bases legais (LGPD)
          </Text>
          <Text variant="body" as="p">
            Tratamos seus dados com base no <em>consentimento</em> explícito
            no cadastro, na <em>execução de contrato</em> para processar
            pedidos e no <em>legítimo interesse</em> para análises agregadas
            que melhoram a loja.
          </Text>
        </section>

        <section className="space-y-3">
          <Text variant="h2" className="text-lg">
            4. Como usamos os dados
          </Text>
          <Text variant="body" as="p">
            Usamos os dados para criar e manter sua conta, processar o pedido
            pelo WhatsApp e atender solicitações. Não vendemos seus dados nem
            os compartilhamos com terceiros para fins de marketing.
          </Text>
        </section>

        <section className="space-y-3">
          <Text variant="h2" className="text-lg">
            5. Seus direitos
          </Text>
          <Text variant="body" as="p">
            Você pode acessar, corrigir e excluir seus dados a qualquer momento
            em{" "}
            <Link
              href="/perfil"
              className="underline underline-offset-4 hover:text-accent"
            >
              Meu perfil
            </Link>
            . Ao solicitar a exclusão, sua conta é{" "}
            <strong className="font-medium">anonimizada</strong> — registros
            internos são preservados sem PII reversível (e-mail e telefone são
            sobrescritos, senha apagada). Isso atende à LGPD e ao mesmo tempo
            mantém a integridade dos pedidos passados.
          </Text>
        </section>

        <section className="space-y-3">
          <Text variant="h2" className="text-lg">
            6. Cookies
          </Text>
          <Text variant="body" as="p">
            Usamos apenas o cookie de sessão necessário para manter você
            autenticado. Não usamos cookies de rastreamento publicitário.
          </Text>
        </section>

        <section className="space-y-3">
          <Text variant="h2" className="text-lg">
            7. Contato do encarregado (DPO)
          </Text>
          <Text variant="body" as="p">
            Para dúvidas ou solicitações relacionadas a dados pessoais, escreva
            para{" "}
            <a
              href="mailto:privacidade@lamora.local"
              className="underline underline-offset-4 hover:text-accent"
            >
              privacidade@lamora.local
            </a>
            .
          </Text>
        </section>

        <section className="space-y-3">
          <Text variant="h2" className="text-lg">
            8. Atualizações
          </Text>
          <Text variant="body" as="p">
            Esta política pode ser atualizada. Em mudanças relevantes,
            sinalizamos pela data no topo desta página.
          </Text>
        </section>
      </article>
    </main>
  );
}
