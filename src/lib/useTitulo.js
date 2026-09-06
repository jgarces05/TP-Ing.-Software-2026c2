"use client";

import { useEffect } from "react";
import { useDatos } from "./datos";

// Cada pantalla tiene su propio título (WCAG 2.1 AA, criterio 2.4.2).
export function useTitulo(texto) {
  const { negocio } = useDatos();
  const nombre = negocio?.nombre ?? "Mi negocio";

  useEffect(() => {
    document.title = texto ? `${texto} · ${nombre}` : nombre;
  }, [texto, nombre]);
}
