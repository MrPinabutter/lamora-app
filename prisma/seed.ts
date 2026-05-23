/* eslint-disable no-console */
// Popula o banco com produtos de exemplo nas 4 categorias.
// Executado por `pnpm db:seed` (ver package.json -> prisma.seed).
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedNote = {
  name: string;
  tier: "TOPO" | "CORACAO" | "FUNDO";
  intensity: number;
};

type SeedProduct = {
  slug: string;
  name: string;
  brand: string;
  price: number;
  category: "PERFUME" | "HIDRATANTE" | "ESFOLIANTE" | "SKIN_CARE";
  shortDesc: string;
  fullDesc: string;
  stock: number;
  imageCount: number;
  olfactory: SeedNote[];
};

const PRODUCTS: SeedProduct[] = [
  {
    slug: "ambar-nomade",
    name: "Âmbar Nômade",
    brand: "Maison Lumière",
    price: 389.9,
    category: "PERFUME",
    shortDesc: "Eau de parfum quente e envolvente, de rastro marcante.",
    fullDesc:
      "Âmbar Nômade abre com um toque cítrico e especiado que logo cede a um coração floral aveludado. No fundo, âmbar, baunilha e sândalo constroem um rastro caloroso, ideal para as noites mais frias.",
    stock: 12,
    imageCount: 3,
    olfactory: [
      { name: "Bergamota", tier: "TOPO", intensity: 3 },
      { name: "Pimenta-rosa", tier: "TOPO", intensity: 2 },
      { name: "Lavanda", tier: "CORACAO", intensity: 4 },
      { name: "Íris", tier: "CORACAO", intensity: 3 },
      { name: "Âmbar", tier: "FUNDO", intensity: 5 },
      { name: "Baunilha", tier: "FUNDO", intensity: 4 },
      { name: "Sândalo", tier: "FUNDO", intensity: 3 },
    ],
  },
  {
    slug: "brisa-de-vetiver",
    name: "Brisa de Vetiver",
    brand: "Atelier Côte",
    price: 299.0,
    category: "PERFUME",
    shortDesc: "Amadeirado fresco e seco, de elegância discreta.",
    fullDesc:
      "Brisa de Vetiver equilibra a vivacidade dos cítricos com a secura terrosa do vetiver. Cardamomo e gerânio dão o tom no coração, enquanto cedro e musk garantem uma assinatura sóbria e duradoura.",
    stock: 9,
    imageCount: 3,
    olfactory: [
      { name: "Limão", tier: "TOPO", intensity: 4 },
      { name: "Bergamota", tier: "TOPO", intensity: 3 },
      { name: "Gerânio", tier: "CORACAO", intensity: 3 },
      { name: "Cardamomo", tier: "CORACAO", intensity: 2 },
      { name: "Vetiver", tier: "FUNDO", intensity: 5 },
      { name: "Cedro", tier: "FUNDO", intensity: 4 },
      { name: "Musk", tier: "FUNDO", intensity: 3 },
    ],
  },
  {
    slug: "flor-de-sal",
    name: "Flor de Sal",
    brand: "Maison Lumière",
    price: 259.9,
    category: "PERFUME",
    shortDesc: "Floral marinho luminoso, leve como uma manhã de praia.",
    fullDesc:
      "Flor de Sal traduz o ar salino do litoral em um floral delicado. Néroli e maresia abrem o caminho para um buquê de jasmim e flor de laranjeira, suavizados por um fundo de almíscar e madeira clara.",
    stock: 15,
    imageCount: 3,
    olfactory: [
      { name: "Maresia", tier: "TOPO", intensity: 4 },
      { name: "Néroli", tier: "TOPO", intensity: 3 },
      { name: "Jasmim", tier: "CORACAO", intensity: 4 },
      { name: "Flor de laranjeira", tier: "CORACAO", intensity: 3 },
      { name: "Almíscar", tier: "FUNDO", intensity: 3 },
      { name: "Madeira clara", tier: "FUNDO", intensity: 2 },
    ],
  },
  {
    slug: "couro-e-fumo",
    name: "Couro & Fumo",
    brand: "Atelier Côte",
    price: 449.0,
    category: "PERFUME",
    shortDesc: "Intenso e enigmático, para quem busca presença.",
    fullDesc:
      "Couro & Fumo é uma composição densa e sofisticada. Açafrão e zimbro introduzem um coração de couro e tabaco, sustentado por oud, incenso e patchouli — um rastro profundo que não passa despercebido.",
    stock: 6,
    imageCount: 3,
    olfactory: [
      { name: "Açafrão", tier: "TOPO", intensity: 2 },
      { name: "Zimbro", tier: "TOPO", intensity: 3 },
      { name: "Couro", tier: "CORACAO", intensity: 5 },
      { name: "Tabaco", tier: "CORACAO", intensity: 4 },
      { name: "Oud", tier: "FUNDO", intensity: 5 },
      { name: "Incenso", tier: "FUNDO", intensity: 4 },
      { name: "Patchouli", tier: "FUNDO", intensity: 3 },
    ],
  },
  {
    slug: "hidratante-karite-intenso",
    name: "Hidratante Karité Intenso",
    brand: "Botânica Pura",
    price: 89.9,
    category: "HIDRATANTE",
    shortDesc: "Manteiga de karité para peles muito ressecadas.",
    fullDesc:
      "Um creme corporal rico em manteiga de karité e óleo de amêndoas que repõe a hidratação por até 48 horas. Textura encorpada de rápida absorção, sem sensação pegajosa.",
    stock: 30,
    imageCount: 2,
    olfactory: [],
  },
  {
    slug: "locao-aveia-e-mel",
    name: "Loção Aveia & Mel",
    brand: "Botânica Pura",
    price: 69.9,
    category: "HIDRATANTE",
    shortDesc: "Loção leve e calmante para o uso diário.",
    fullDesc:
      "Combina extrato de aveia coloidal e mel para acalmar e hidratar a pele sensível. Fórmula leve, de toque seco, indicada para uso diário no corpo todo.",
    stock: 28,
    imageCount: 2,
    olfactory: [],
  },
  {
    slug: "esfoliante-cafe-e-coco",
    name: "Esfoliante Café & Coco",
    brand: "Botânica Pura",
    price: 59.9,
    category: "ESFOLIANTE",
    shortDesc: "Esfoliante corporal com borra de café e óleo de coco.",
    fullDesc:
      "Esfoliante corporal que une grãos de café a óleo de coco para renovar a pele e deixá-la macia. A massagem revigorante ajuda a ativar a circulação durante o banho.",
    stock: 22,
    imageCount: 2,
    olfactory: [],
  },
  {
    slug: "esfoliante-sal-rosa",
    name: "Esfoliante Sal Rosa",
    brand: "Maré Alta",
    price: 74.9,
    category: "ESFOLIANTE",
    shortDesc: "Sal rosa do Himalaia para uma esfoliação mineral.",
    fullDesc:
      "Esfoliante corporal com cristais de sal rosa do Himalaia e óleo de girassol. Remove células mortas e nutre a pele, deixando um acabamento sedoso e uniforme.",
    stock: 18,
    imageCount: 2,
    olfactory: [],
  },
  {
    slug: "serum-vitamina-c",
    name: "Sérum Vitamina C",
    brand: "Dermo Lab",
    price: 159.9,
    category: "SKIN_CARE",
    shortDesc: "Sérum antioxidante que ilumina e uniformiza o tom.",
    fullDesc:
      "Sérum facial com 10% de vitamina C estável e ácido hialurônico. Atua na luminosidade, na uniformização do tom e na proteção antioxidante contra os danos diários.",
    stock: 20,
    imageCount: 3,
    olfactory: [],
  },
  {
    slug: "gel-de-limpeza-suave",
    name: "Gel de Limpeza Suave",
    brand: "Dermo Lab",
    price: 84.9,
    category: "SKIN_CARE",
    shortDesc: "Limpeza facial diária sem ressecar a pele.",
    fullDesc:
      "Gel de limpeza facial de pH balanceado que remove impurezas e oleosidade sem comprometer a barreira cutânea. Indicado para todos os tipos de pele, no uso diário.",
    stock: 26,
    imageCount: 2,
    olfactory: [],
  },
];

function buildImages(slug: string, count: number) {
  return Array.from({ length: count }, (_, index) => ({
    url: `https://picsum.photos/seed/lamora-${slug}-${index}/800/1000`,
    position: index,
    isPrimary: index === 0,
  }));
}

async function main() {
  console.log("Limpando produtos existentes...");
  await prisma.product.deleteMany();

  for (const product of PRODUCTS) {
    const { imageCount, olfactory, ...data } = product;
    await prisma.product.create({
      data: {
        ...data,
        images: { create: buildImages(product.slug, imageCount) },
        olfactory: { create: olfactory },
      },
    });
    console.log(`  ✓ ${product.name}`);
  }

  console.log(`\n${PRODUCTS.length} produtos criados com sucesso.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    void prisma.$disconnect();
  });
