import type { Metadata } from "next";
import Link from "next/link";
import { Text } from "@/shared/components/atoms/Text";

export const metadata: Metadata = {
  title: "Termos de uso — Lamora",
  description:
    "Termos e condições de uso da loja Lamora — perfumaria e skincare.",
};

const LAST_UPDATED = "25 de maio de 2026";

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-12 lg:py-20">
      <header className="space-y-3">
        <Text variant="eyebrow">Legal</Text>
        <Text variant="h1" className="text-2xl lg:text-[1.75rem]">
          Termos de uso
        </Text>
        <Text variant="caption" as="p">
          Última atualização: {LAST_UPDATED}.
        </Text>
      </header>

      <article className="mt-12 space-y-10">
        <section className="space-y-3">
          <Text variant="h2" className="text-lg">
            1. Sobre estes termos
          </Text>
          <Text variant="body" as="p">
            Ao criar uma conta ou usar o site da Lamora, você concorda com
            estas condições. Caso não concorde, basta não criar a conta nem
            enviar pedidos.
          </Text>
        </section>

        <section className="space-y-3">
          <Text variant="h2" className="text-lg">
            2. Cadastro e conta
          </Text>
          <Text variant="body" as="p">
            Você é responsável pelas informações fornecidas no cadastro e por
            manter sua senha em sigilo. Pode editar seus dados ou solicitar a
            exclusão da conta a qualquer momento em{" "}
            <Link
              href="/perfil"
              className="underline underline-offset-4 hover:text-accent"
            >
              Meu perfil
            </Link>
            . A exclusão anonimiza seus dados pessoais — não há reversão.
          </Text>
        </section>

        <section className="space-y-3">
          <Text variant="h2" className="text-lg">
            3. Pedidos via WhatsApp
          </Text>
          <Text variant="body" as="p">
            Nesta versão da loja, o checkout acontece pelo WhatsApp. A mensagem
            gerada contém os itens, quantidades e total do seu carrinho. A
            confirmação do pagamento, prazo de entrega e demais condições
            comerciais são tratados diretamente no atendimento.
          </Text>
        </section>

        <section className="space-y-3">
          <Text variant="h2" className="text-lg">
            4. Catálogo e preços
          </Text>
          <Text variant="body" as="p">
            Fazemos esforços para manter o catálogo, fotos e preços atualizados.
            Em caso de divergência ou ruptura de estoque, o atendimento entra
            em contato antes da confirmação do pedido.
          </Text>
        </section>

        <section className="space-y-3">
          <Text variant="h2" className="text-lg">
            5. Propriedade intelectual
          </Text>
          <Text variant="body" as="p">
            Marcas, fotos e textos pertencem aos seus respectivos titulares. O
            uso comercial sem autorização não é permitido.
          </Text>
        </section>

        <section className="space-y-3">
          <Text variant="h2" className="text-lg">
            6. Privacidade
          </Text>
          <Text variant="body" as="p">
            O tratamento de dados pessoais segue nossa{" "}
            <Link
              href="/privacidade"
              className="underline underline-offset-4 hover:text-accent"
            >
              Política de privacidade
            </Link>
            , alinhada à LGPD.
          </Text>
        </section>

        <section className="space-y-3">
          <Text variant="h2" className="text-lg">
            7. Alterações
          </Text>
          <Text variant="body" as="p">
            Estes termos podem ser atualizados a qualquer momento. Quando
            houver mudança relevante, sinalizamos pela data no topo desta
            página.
          </Text>
        </section>
      </article>
    </main>
  );
}
