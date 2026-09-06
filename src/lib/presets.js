// Presets de rubro (cartilla, sección 02).
//
// Un preset es un diccionario de etiquetas, no un motor de configuración.
// Renombra los estados y trae los motivos frecuentes del oficio. No puede
// agregar un sexto estado, ni cambiar un ícono, ni tocar los datos de un caso.
//
// En el Sprint 1 ningún preset esconde estados: si escondiera uno, los casos
// sembrados en ese estado desaparecerían de la lista en vivo.

export const PRESETS = {
  taller: {
    clave: "taller",
    nombre: "Taller mecánico",
    queEs: "Autos que entran, se diagnostican, se presupuestan y se entregan.",
    etiquetas: {
      nuevo: "Turno anotado",
      en_proceso: "Está en el taller",
      esperando: "Esperando",
      revision_final: "Control final",
      completado: "Entregado",
    },
    explica: {
      esperando: "El repuesto o el sí del cliente",
      revision_final: "Control antes de entregar",
    },
    motivos: [
      "Ruido raro",
      "Service de rutina",
      "Cambio de aceite y filtros",
      "Frenos",
      "No arranca",
      "Luz de tablero encendida",
      "Alineación y balanceo",
    ],
  },

  veterinaria: {
    clave: "veterinaria",
    nombre: "Veterinaria",
    queEs: "Mascotas que llegan a consulta, se atienden y se dan de alta.",
    etiquetas: {
      nuevo: "Turno pedido",
      en_proceso: "En consulta",
      esperando: "Esperando",
      revision_final: "Control final",
      completado: "De alta",
    },
    explica: {
      esperando: "El resultado del análisis",
      revision_final: "Control antes del alta",
    },
    motivos: [
      "Consulta general",
      "Vacunación",
      "No come",
      "Control post operatorio",
      "Análisis de sangre",
      "Desparasitación",
    ],
  },

  service: {
    clave: "service",
    nombre: "Service técnico",
    queEs: "Equipos que se reciben, se reparan, se prueban y se devuelven.",
    etiquetas: {
      nuevo: "Equipo recibido",
      en_proceso: "En reparación",
      esperando: "Esperando",
      revision_final: "Prueba final",
      completado: "Entregado",
    },
    explica: {
      esperando: "El repuesto o el presupuesto aprobado",
      revision_final: "Prueba antes de entregar",
    },
    motivos: [
      "No enciende",
      "Pantalla rota",
      "Se apaga solo",
      "No carga",
      "Presupuesto de reparación",
      "Limpieza y mantenimiento",
    ],
  },
};

export const RUBROS = Object.values(PRESETS);

export const preset = (rubro) => PRESETS[rubro] ?? PRESETS.taller;

// La palabra que ve el usuario para un estado, en el idioma de su rubro.
export const etiquetaEstado = (rubro, estado) =>
  preset(rubro).etiquetas[estado] ?? estado;
