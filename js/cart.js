let compra = document.getElementById("compras");
let compras = [];
let button = document.getElementById("exito");

//Elementos del formulario
let direccion = document.getElementById("direccion");
let numero = document.getElementById("numero");
let esquina = document.getElementById("esquina");
let metTarjeta = document.getElementById("cuentatarjeta");
let nTarjeta = document.getElementById("numerotarjeta");
let codTarjeta = document.getElementById("codigoseguridad");
let fechaTarjeta = document.getElementById("vencimiento");
let metBanco = document.getElementById("cuentav");
let cuentBancaria = document.getElementById("cuentabanco");


//Funcion que crear el formato visual del carrito
function mostrarCompra(array) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        lista = `
                <tr>
                    <th scope="row"><img src="${element.image}" class="" id="imageCart" alt="" style="width:50px;"></th>
                    <td>${element.name}</td>
                    <td>${element.currency} ${element.unitCost}</td>
                    <td><input type="number" name="" id="cantBuy" class="col w-10" style="width:70px;" min="1" value="${element.count}"></td>
                    <td id="subtotal"><h4>${element.currency} ${element.unitCost}</h4></td>
                </tr>
        `
        compra.innerHTML = lista;
        document.getElementById("precioProductos").innerHTML = element.currency + " " + element.unitCost
        subTotal(element);
        costEnvio(element);
        document.getElementById("total").innerHTML = element.currency + " " + element.unitCost
    }
}

//funcion que calcula el subtotal
function subTotal(array) {
    document.getElementById("cantBuy").addEventListener("click", () => {
        let costo = array.unitCost;
        cantidad = document.getElementById("cantBuy").value;
        let stotal = costo * cantidad;
        let total = `
            <h4>${array.currency} ${stotal}</h4>
        `
        document.getElementById("subtotal").innerHTML = total
        document.getElementById("precioProductos").innerHTML = array.currency + " " + stotal
        localStorage.setItem("total", stotal);

    })
}

//funcion que realiza los impuestos por costo de envio
function costEnvio() {
    let premium = document.getElementById("premium");
    let express = document.getElementById("express");
    let precio = JSON.parse(localStorage.getItem("total"));
    
    impuestoEnvio = precio * (5 / 100)
    total = precio + impuestoEnvio
    document.getElementById("total").innerHTML = "USD " + total
    document.getElementById("costEnvio").innerHTML = "USD " + impuestoEnvio

    document.addEventListener("click", () => {
        if (premium.checked) {
            let precio = JSON.parse(localStorage.getItem("total"));
            impuestoEnvio = precio * (15 / 100)
            total = precio + impuestoEnvio
            document.getElementById("total").innerHTML = "USD " + total
            document.getElementById("costEnvio").innerHTML = "USD " + impuestoEnvio
        } else if (express.checked) {
            let precio = JSON.parse(localStorage.getItem("total"));
            impuestoEnvio = precio * (7 / 100)
            total = precio + impuestoEnvio
            document.getElementById("total").innerHTML = "USD " + total
            document.getElementById("costEnvio").innerHTML = "USD " + impuestoEnvio
        } else {
            let precio = JSON.parse(localStorage.getItem("total"));
            impuestoEnvio = precio * (5 / 100)
            total = precio + impuestoEnvio
            document.getElementById("total").innerHTML = "USD " + total
            document.getElementById("costEnvio").innerHTML = "USD " + impuestoEnvio
        }
    });
}


document.addEventListener("DOMContentLoaded", async () => {

    let prodBuy = await getJSONData(CART_INFO_URL);
    if (prodBuy.status === "ok") {
        compras = prodBuy.data.articles;
        mostrarCompra(compras);
        costEnvio(compras);
    }


    //Validacion de datos
    let data = await getJSONData(CART_BUY_URL);
    if (data.status === "ok") {
        let exito = data.data.msg;

        //Boton que realiza la compra
        button.addEventListener("click", () => {
            let mensajeMetodopago = document.getElementById("metodopago");
            if (!direccion.value == "" && !numero.value == "" && !esquina.value == "" && (!nTarjeta.value == "" && !codTarjeta.value == "" && !fechaTarjeta.value == "" || !cuentBancaria.value == "")) {
                alerta = `
                <div class="container">
                    <div class="alert alert-success text-center" role="alert">
                        <h4 class="alert-heading">${exito}</h4>
                    </div>
                </div>
                `
                document.getElementById("alerta").innerHTML = alerta
            }
            if (nTarjeta.value == "" && codTarjeta.value == "" && fechaTarjeta.value == "" || cuentBancaria == "") {
                mensajeMetodopago.innerHTML = "Debe ingresar metodo de pago"
                mensajeMetodopago.classList.add("validacionform")
            }
            if (nTarjeta.value != "" && codTarjeta.value != "" && fechaTarjeta.value != "" && !cuentBancaria == "") {
                mensajeMetodopago.innerHTML = ""
                mensajeMetodopago.classList.remove("validacionform")
            }
            if (!nTarjeta == "" && !codTarjeta == "" && !fechaTarjeta == "" && cuentBancaria.value != "") {
                mensajeMetodopago.innerHTML = ""
                mensajeMetodopago.classList.remove("validacionform")
            }

        })

        document.getElementById("guardarDatos").addEventListener("click", () => {
            let mensajeClickModal = document.getElementById("metodopago");
            mensajeClickModal.innerHTML = ""
            mensajeClickModal.classList.remove("validacionform")
        })
    }

    //Escucha a metodo de pago
    let metTarjeta = document.getElementById("cuentatarjeta");
    let metBanco = document.getElementById("cuentav");

    metTarjeta.addEventListener("click", () => {
        cuentBancaria.setAttribute("disabled", "");
        cuentBancaria.value = "";
        nTarjeta.removeAttribute("disabled", "");
        codTarjeta.removeAttribute("disabled", "");
        fechaTarjeta.removeAttribute("disabled", "");
    })

    metBanco.addEventListener("click", () => {
        nTarjeta.setAttribute("disabled", "");
        codTarjeta.setAttribute("disabled", "");
        fechaTarjeta.setAttribute("disabled", "");
        nTarjeta.value = "";
        codTarjeta.value = "";
        fechaTarjeta.value = "";
        cuentBancaria.removeAttribute("disabled", "");
    })
});


//Estilo validacion sacado de Boostrap

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()