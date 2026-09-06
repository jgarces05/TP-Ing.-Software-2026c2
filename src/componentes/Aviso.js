"use client";

// Los mensajes del sistema dicen qué pasó y qué hacer, sin culpar a nadie
// y sin jerga (cartilla, sección 07).

import { useDatos } from "@/lib/datos";
import Icono from "./Icono";
import { Boton } from "./ui";

function Banda({ tono, icono, texto, alDescartar }) {
  return (
    <div
      role="status"
      className={`mb-6 flex items-start gap-3 rounded-tarjeta border border-borde border-l-4 p-4 ${tono}`}
    >
      <Icono nombre={icono} className="size-6" />
      <p className="flex-1 text-cuerpo">{texto}</p>
      <Boton variante="plano" onClick={alDescartar} className="min-h-10 shrink-0">
        Entendido
      </Boton>
    </div>
  );
}

export default function Aviso() {
  const { aviso, exito, descartarAviso, descartarExito } = useDatos();

  return (
    <>
      {exito && (
        <Banda
          tono="border-l-completo bg-completo-fondo text-completo"
          icono="listo"
          texto={exito}
          alDescartar={descartarExito}
        />
      )}
      {aviso && (
        <Banda
          tono="border-l-espera bg-espera-fondo text-espera"
          icono="alerta"
          texto={aviso}
          alDescartar={descartarAviso}
        />
      )}
    </>
  );
}
