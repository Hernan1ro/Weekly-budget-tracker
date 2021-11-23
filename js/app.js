// selectors and variables
const formulario = document.querySelector("#agregar-gasto");
const gastoLista = document.querySelector("#gastos ul");
// events
eventListener();

function eventListener() {
  window.addEventListener("DOMContentLoaded", preguntarPresupuesto);
}
// classes

// functions

function preguntarPresupuesto() {
  const presupuesto = prompt("Cual es tu presupuesto nigga?");
  if (
    presupuesto === "" ||
    presupuesto <= 0 ||
    isNaN(presupuesto) ||
    presupuesto === null
  ) {
    window.location.reload();
  }
  console.log(presupuesto);
}
