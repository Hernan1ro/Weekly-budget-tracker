// selectors and variables
const formulario = document.querySelector("#agregar-gasto");
const gastoLista = document.querySelector("#gastos ul");
// events
eventListener();

function eventListener() {
  window.addEventListener("DOMContentLoaded", preguntarPresupuesto);
  formulario.addEventListener("submit", validarInputs);
}
// classes
class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = presupuesto;
    this.restante = presupuesto;
    this.gastos = [];
  }
}
class UI {
  insertarPresupuesto(budget) {
    const { presupuesto, restante } = budget;
    console.log(presupuesto, restante);
    document.querySelector("#total").textContent = presupuesto;
    document.querySelector("#restante").textContent = restante;
  }
  imprimirAlerta(mensaje, tipo) {
    const contenidoPrimario = document.querySelector(".primario");
    const divMessage = document.createElement("div");
    divMessage.classList.add("alert", "text-center");
    if (tipo === "error") {
      divMessage.classList.add("alert-danger");
    } else {
      divMessage.classList.add("alert-success");
    }
    divMessage.innerText = mensaje;
    contenidoPrimario.insertBefore(divMessage, formulario);

    setTimeout(() => {
      divMessage.remove();
    }, 3000);
  }
}
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
  // Mostrar presupuesto en pantalla
  ui.insertarPresupuesto(presupuesto);
}

// Verificar inputs
function validarInputs(event) {
  event.preventDefault();
  const cantidad = document.querySelector("#cantidad").value;
  const nombreGasto = document.querySelector("#gasto").value;
  if (cantidad === "" || nombreGasto === "") {
    ui.imprimirAlerta("Los campos deben estar llenos", "error");
    return;
  } else if (isNaN(cantidad)) {
    ui.imprimirAlerta("La cantidad insertada no es valida", "error");
    return;
  }

  ui.imprimirAlerta("Nuevo gasto agreagado", "success");
}
