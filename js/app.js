//--------------------------------- selectors and variables ------------------------------------------//

const formulario = document.querySelector("#agregar-gasto");
const gastoLista = document.querySelector("#gastos ul");
// events
eventListener();

function eventListener() {
  window.addEventListener("DOMContentLoaded", preguntarPresupuesto);
  formulario.addEventListener("submit", validarInputs);
}
//--------------------------------- classses ------------------------------------------//

class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = presupuesto;
    this.restante = presupuesto;
    this.gastos = [];
  }
  generarGasto(gasto) {
    this.gastos = [...this.gastos, gasto];
    this.calcularRestante();
  }
  calcularRestante() {
    const totalGastado = this.gastos.reduce(
      (acum, gasto) => acum + gasto.cantidad,
      0
    );
    this.restante = this.presupuesto - totalGastado;
  }
  borrarGasto(id) {
    this.gastos = this.gastos.filter((gasto) => gasto.id !== id);
    this.calcularRestante();
  }
}
class UI {
  insertarPresupuesto(budget) {
    const { presupuesto, restante } = budget;
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

    formulario.querySelector('button[type="submit"]').disabled = true;
    setTimeout(() => {
      divMessage.remove();
      formulario.querySelector('button[type="submit"]').disabled = false;
    }, 3000);
  }
  imprimirLista(gastos) {
    this.limpiarListaHtml();
    gastos.forEach((gasto) => {
      //Limpiar el html
      const { nombre, cantidad, id } = gasto;
      //Crear LI
      const li = document.createElement("li");
      li.className =
        "list-group-item d-flex justify-content-between align-items-center";
      li.dataset.id = id;
      //Agregat el Html al li
      li.innerHTML = `${nombre}<span class="badge badge-primary badge-pill">$ ${cantidad}</span>`;
      //Boton para borrar el gasto
      const button = document.createElement("button");
      button.classList.add("btn", "btn-danger", "borrar-gasto");
      button.innerHTML = "Borrar &times";
      button.onclick = () => {
        borrarGasto(id);
      };
      li.appendChild(button);
      //Agregar el html
      gastoLista.appendChild(li);
    });
  }
  limpiarListaHtml() {
    while (gastoLista.firstChild) {
      gastoLista.removeChild(gastoLista.firstChild);
    }
  }
  imprimirRestante(restante) {
    const restanteNeto = document.querySelector("#restante");
    // const presupuesto = document.querySelector("#presupuesto");
    restanteNeto.innerText = restante;
  }

  // validar el gasto porcentual del presupuesto
  validarRestante(Presupuesto) {
    const { restante, presupuesto } = Presupuesto;
    const divRestante = document.querySelector(".restante");
    if (presupuesto / 4 > restante) {
      divRestante.classList.remove("alert-success", "alert-warning");
      divRestante.classList.add("alert-danger");
    } else if (presupuesto / 2 > restante) {
      divRestante.classList.remove("alert-success", "alert-danger");
      divRestante.classList.add("alert-warning");
    } else {
      divRestante.classList.remove("alert-danger", "alert-warning");
      divRestante.classList.add("alert-success");
    }
    if (restante <= 0) {
      this.imprimirAlerta("Presupuesto insuficiente", "error");
    }
  }
}

//----- Instanciación de las clase ----- //

let ui = new UI();
let presupuesto;

//--------------------------------- functions ------------------------------------------//

function preguntarPresupuesto() {
  const presupuestoUsuario = prompt("¿Cual es tu presupuesto?");
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
  const cantidad = Number(document.querySelector("#cantidad").value);
  const nombre = document.querySelector("#gasto").value;
  if (cantidad === "" || nombre === "") {
    ui.imprimirAlerta("Los campos deben estar llenos", "error");
    return;
  } else if (isNaN(cantidad)) {
    ui.imprimirAlerta("La cantidad insertada no es valida", "error");
    return;
  }

  //Crear objeto gasto//
  const gasto = { nombre, cantidad, id: Date.now() };
  presupuesto.generarGasto(gasto);
  // Mostrar gasto introducido exitosamente
  ui.imprimirAlerta("Nuevo gasto agreagado", "success");
  formulario.reset();
  // Agregaral Hmtl la lista de los gastos
  const { gastos, restante } = presupuesto;

  ui.imprimirLista(gastos);
  ui.imprimirRestante(restante);
  ui.validarRestante(presupuesto);
}

function borrarGasto(id) {
  presupuesto.borrarGasto(id);
  const { gastos, restante } = presupuesto;
  ui.imprimirLista(gastos);
  ui.imprimirRestante(restante);
  ui.validarRestante(presupuesto);
}
