"use client";

// "Hoy" — lo primero que se ve al abrir (cartilla, sección 09).
//
// Arriba, lo que necesita una decisión. Abajo, todos los casos abiertos con
// su estado. Sin scrollear y sin filtrar: el principio 1 de la cartilla.

import Link from "next/link";
import { useDatos } from "@/lib/datos";
import { useTitulo } from "@/lib/useTitulo";
import { estaAbierto, ORDEN_ESTADOS } from "@/lib/estados";
import FilaCaso from "@/componentes/FilaCaso";
import Icono from "@/componentes/Icono";
import { Boton, Cargando, TituloSeccion, Vacio } from "@/componentes/ui";

const diaDe = (iso) =>
  new Intl.DateTimeFormat("es-AR", { weekday: "long" }).format(new Date(iso));

function TarjetaResumen({ href, icono, color, barra, titulo, cuanto, detalle }) {
  return (
    <Link
      href={href}
      className="flex flex-col overflow-hidden rounded-tarjeta border border-borde bg-tarjeta"
    >
      <span className={`h-1.5 w-full ${barra}`} aria-hidden="true" />
      <span className="flex flex-1 flex-col gap-1 p-4 sm:p-6">
        <span className={`flex items-center gap-2 font-bold text-etiqueta ${color}`}>
          <Icono nombre={icono} className="size-5" />
          {titulo}
        </span>
        <span className="font-titulo font-extrabold text-dato">{cuanto}</span>
        <span className="text-tinta-media">{detalle}</span>
      </span>
    </Link>
  );
}

export default function Hoy() {
  const { cargando, casos, insumos } = useDatos();
  useTitulo("Hoy");

  if (cargando) return <Cargando />;

  const abiertos = casos.filter(estaAbierto);
  const esperando = abiertos.filter((c) => c.estado === "esperando");
  const listos = abiertos.filter((c) => c.estado === "revision_final");
  const llegados = insumos.filter((i) => i.estado === "llegado");

  const masViejo = [...esperando].sort(
    (a, b) => new Date(a.abierto_en) - new Date(b.abierto_en)
  )[0];

  const casoDelInsumo = casos.find((c) => c.id === llegados[0]?.caso_id);

  const fecha = new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  const ordenados = [...abiertos].sort(
    (a, b) => ORDEN_ESTADOS.indexOf(a.estado) - ORDEN_ESTADOS.indexOf(b.estado)
  );

  return (
    <>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-pantalla first-letter:uppercase">Hoy</h1>
          <p className="mt-1 text-tinta-media first-letter:uppercase">
            {fecha} · {abiertos.length}{" "}
            {abiertos.length === 1 ? "caso abierto" : "casos abiertos"}
          </p>
        </div>

        {/* El único botón azul de la pantalla. */}
        <Link href="/casos/nuevo" className="w-full sm:w-auto">
          <span className="flex min-h-14 w-full items-center justify-center gap-2 rounded-campo bg-azul px-6 font-bold text-cuerpo text-white hover:bg-azul-apretado sm:min-h-12">
            <Icono nombre="mas" />
            Abrir un caso nuevo
          </span>
        </Link>
      </div>

      <TituloSeccion>Necesitan que hagas algo</TituloSeccion>
      <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <TarjetaResumen
          href="/aprobar"
          icono="reloj"
          color="text-espera"
          barra="bg-espera"
          titulo="Esperan tu respuesta"
          cuanto={`${esperando.length} ${esperando.length === 1 ? "caso" : "casos"}`}
          detalle={
            masViejo
              ? `El más viejo espera desde el ${diaDe(masViejo.abierto_en)}.`
              : "No hay ninguno esperando."
          }
        />
        <TarjetaResumen
          href="/inventario"
          icono="camion"
          color="text-terracota"
          barra="bg-terracota"
          titulo="Insumos que llegaron"
          cuanto={`${llegados.length} ${llegados.length === 1 ? "pedido" : "pedidos"}`}
          detalle={
            casoDelInsumo
              ? `${llegados[0].nombre} del caso ${casoDelInsumo.numero}.`
              : "No llegó nada nuevo."
          }
        />
        <TarjetaResumen
          href="/casos"
          icono="listo"
          color="text-completo"
          barra="bg-completo"
          titulo="Listos para entregar"
          cuanto={`${listos.length} ${listos.length === 1 ? "caso" : "casos"}`}
          detalle={listos.length ? "Falta avisarle al cliente." : "Ninguno pasó el control todavía."}
        />
      </div>

      <TituloSeccion>Todos los casos</TituloSeccion>
      {ordenados.length === 0 ? (
        <Vacio titulo="Todavía no hay casos abiertos">
          Cuando llegue el primer cliente, abrí un caso y va a aparecer acá.
        </Vacio>
      ) : (
        <ul className="overflow-hidden rounded-tarjeta border border-borde bg-tarjeta">
          {ordenados.map((caso) => (
            <FilaCaso key={caso.id} caso={caso} />
          ))}
        </ul>
      )}
    </>
  );
}
