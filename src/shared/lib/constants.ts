export const CATEGORY_LABELS = {
  PERFUME: "Perfume",
  HIDRATANTE: "Hidratante",
  ESFOLIANTE: "Esfoliante",
  SKIN_CARE: "Skin Care",
} as const;

export const NOTE_TIER_LABELS = {
  TOPO: "Nota de topo",
  CORACAO: "Nota de coração",
  FUNDO: "Nota de fundo",
} as const;

export const ANALYTICS_EVENT = {
  SESSION: "SESSION",
  SIGNUP: "SIGNUP",
  CART_ADD: "CART_ADD",
  WHATSAPP_SEND: "WHATSAPP_SEND",
} as const;

export type AnalyticsEventType =
  (typeof ANALYTICS_EVENT)[keyof typeof ANALYTICS_EVENT];
