"use client";

import { ESTADOS } from "@/lib/estados";
import { etiquetaEstado } from "@/lib/presets";
import { useDatos } from "@/lib/datos";
import Icono from "./Icono";

// Tres señales por estado: color, ícono y palabra.
// Si se imprime en blanco y negro se sigue entendiendo (cartilla, sección 02).
export default function ChipEstado({ estado, className = "" }) {
  const { negocio } = useDatos();
  const e = ESTADOS[estado];
  if (!e) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-bold text-etiqueta ${e.fondo} ${e.texto} ${className}`}
    >
      <Icono nombre={e.icono} className="size-5" />
      {etiquetaEstado(negocio?.rubro, estado)}
    </span>
  );
}
