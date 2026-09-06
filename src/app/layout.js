import { Figtree, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { DatosProvider } from "@/lib/datos";
import { BarraLateral, BarraCelular } from "@/componentes/Navegacion";
import Aviso from "@/componentes/Aviso";

// next/font descarga las tipografías en el build y las sirve desde el mismo
// dominio. Así la aplicación se ve igual sin internet, que es exactamente el
// escenario de un aula: si las fuentes vinieran del CDN de Google, sin wifi
// la pantalla se vería con la tipografía de reserva.
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--fuente-titulo",
  display: "block",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--fuente-cuerpo",
  display: "block",
});

export const metadata = {
  title: "Hoy",
  description: "Sistema de gestión de casos para negocios de servicio.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${figtree.variable} ${sourceSans.variable}`}>
      <body className="antialiased">
        <DatosProvider>
          <div className="flex min-h-screen">
            <BarraLateral />
            <main className="min-w-0 flex-1 pb-20 md:pb-0">
              <div className="mx-auto w-full max-w-hoja px-4 py-6 sm:px-6 sm:py-8">
                <Aviso />
                {children}
              </div>
            </main>
          </div>
          <BarraCelular />
        </DatosProvider>
      </body>
    </html>
  );
}
