// selectors and variables
const formulario = document.querySelector("#agregar-gasto");
const gastoLista = document.querySelector("#gastos ul");
// events
eventListener();

function eventListener() {
  window.addEventListener("DOMContentLoaded", preguntarPresupuesto);
}
// classes
class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = presupuesto;
    this.restante = presupuesto;
    this.gastos = [];
  }
}
class UI {}
let ui = new UI();
let presupuesto;

// functions

function preguntarPresupuesto() {
  const presupuestoUsuario = prompt("Cual es tu presupuesto nigga?");
  if (
    presupuestoUsuario === "" ||
    presupuestoUsuario <= 0 ||
    isNaN(presupuestoUsuario) ||
    presupuestoUsuario === null
  ) {
    window.location.reload();
  }
  presupuesto = new Presupuesto(Number(presupuestoUsuario));
  console.log(presupuesto);
}
