"use client";

import { useEffect } from "react";

/**
 * Observa todos os elementos marcados com `data-reveal` na página e liga a
 * classe `is-visible` quando eles entram na viewport — o CSS cuida do fade-up.
 *
 * Vive fora dos componentes de seção (server components) de propósito: eles só
 * precisam carregar o atributo `data-reveal`, sem virar client components. Um
 * único observador serve a página inteira.
 *
 * Respeita `prefers-reduced-motion`: quem pede menos movimento (ou não tem
 * IntersectionObserver) recebe todo o conteúdo revelado de imediato.
 */
export function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (els.length === 0) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce || !("IntersectionObserver" in window)) {
      for (const el of els) el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );

    for (const el of els) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return null;
}
