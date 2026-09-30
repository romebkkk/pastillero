/*! Pastillero v1.0.0 — horario de medicación imprimible
 *  by DataFlow Elegance · MIT · https://github.com/romebkkk/pastillero
 *  100% en el navegador. Ayuda a organizar tomas; NO es consejo médico.
 *  Sigue SIEMPRE las indicaciones de tu médico o farmacéutico.
 */
(function (global) {
  "use strict";

  var SLOTS = ["Desayuno", "Comida", "Merienda", "Cena", "Al acostarse"];

  /**
   * Genera el horario a partir de una lista de medicamentos.
   * @param {Array} meds - [{ nombre, dosis, slots:[..] , notas }]
   */
  function generarHorario(meds) {
    meds = (meds || []).filter(function (m) { return m && String(m.nombre || "").trim() !== ""; });

    var tabla = SLOTS.map(function (slot) {
      var lista = meds
        .filter(function (m) { return (m.slots || []).indexOf(slot) !== -1; })
        .map(function (m) { return { nombre: m.nombre, dosis: m.dosis || "", notas: m.notas || "" }; });
      return { slot: slot, meds: lista };
    });

    var tomas_dia = 0;
    meds.forEach(function (m) { tomas_dia += (m.slots || []).length; });

    return {
      slots: SLOTS,
      tabla: tabla,
      medicamentos: meds.length,
      tomas_dia: tomas_dia
    };
  }

  global.Pastillero = { version: "1.0.0", SLOTS: SLOTS, generarHorario: generarHorario };
})(typeof window !== "undefined" ? window : globalThis);
