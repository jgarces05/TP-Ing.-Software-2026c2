"use client";

import Link from "next/link";
import { useDatos } from "@/lib/datos";
import { useTitulo } from "@/lib/useTitulo";
import { estaAbierto } from "@/lib/estados";
import ChipEstado from "@/componentes/ChipEstado";
import Icono from "@/componentes/Icono";
import { Cargando, Tarjeta, TituloSeccion, Vacio } from "@/componentes/ui";

const ROL = {
  duenio: "Dueño",
  encargado: "Encargado",
  tecnico: "Del taller",
};

export default function Equipo() {
  const { cargando, empleados, casos } = useDatos();
  useTitulo("Equipo");

  if (cargando) return <Cargando />;

  const sinAsignar = casos.filter((c) => estaAbierto(c) && !c.responsable_id);

  return (
    <>
      <h1 className="text-pantalla">Equipo</h1>
      <p className="mt-1 mb-8 max-w-[65ch] text-tinta-media">
        Quién está trabajando en qué. Invitar gente nueva es del próximo sprint.
      </p>

      {empleados.length === 0 ? (
        <Vacio icono="personas" titulo="Todavía no hay nadie cargado">
          Cargá a las personas que atienden los trabajos y vas a poder asignarles casos.
        </Vacio>
      ) : (
        <ul className="mb-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {empleados.map((e) => {
            const suyos = casos.filter((c) => c.responsable_id === e.id && estaAbierto(c));
            return (
              <li key={e.id}>
                <Tarjeta className="h-full">
                  <div className="flex items-center gap-3">
                    <span className="flex size-12 items-center justify-center rounded-full bg-superficie text-tinta-media">
                      <Icono nombre="persona" />
                    </span>
                    <div>
                      <p className="font-bold text-subtitulo">{e.nombre}</p>
                      <p className="text-apoyo text-tinta-suave">{ROL[e.rol] ?? e.rol}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-tinta-media">
                    {suyos.length === 0
                      ? "No tiene ningún caso ahora."
                      : `Tiene ${suyos.length} ${suyos.length === 1 ? "caso" : "casos"} sin cerrar.`}
                  </p>

                  {suyos.length > 0 && (
                    <ul className="mt-3 flex flex-col gap-2">
                      {suyos.map((c) => (
                        <li key={c.id}>
                          <Link
                            href={`/casos/${c.id}`}
                            className="flex min-h-12 items-center gap-2 text-azul"
                          >
                            <Icono nombre="carpeta" className="size-5" />
                            Caso {c.numero} · {c.servicio}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </Tarjeta>
              </li>
            );
          })}
        </ul>
      )}

      {sinAsignar.length > 0 && (
        <>
          <TituloSeccion>Casos que no tiene nadie</TituloSeccion>
          <ul className="overflow-hidden rounded-tarjeta border border-borde bg-tarjeta">
            {sinAsignar.map((c) => (
              <li
                key={c.id}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-borde p-4 last:border-b-0"
              >
                <div>
                  <Link href={`/casos/${c.id}`} className="font-bold text-azul">
                    Caso {c.numero}
                  </Link>
                  <p className="text-tinta-media">{c.servicio}</p>
                </div>
                <ChipEstado estado={c.estado} />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
