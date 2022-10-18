let compra = document.getElementById("compras");
let compras = [];
let button = document.getElementById("exito");

//Funcion que crear el formato visual del carrito
function mostrarCompra(array) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        lista = `
                <tr>
                    <th scope="row"><img src="${element.image}" class="img-fluid" alt="" style="width:70px;"></th>
                    <td>${element.name}</td>
                    <td>${element.currency} ${element.unitCost}</td>
                    <td><input type="number" name="" id="cantBuy" class="col w-10" style="width:70px;" min="1" value="${element.count}"></td>
                    <td id="subtotal"><h4>${element.currency} ${element.unitCost}</h4></td>
                </tr>
        `
        compra.innerHTML = lista;
        subTotal(element);
        costEnvio();
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
        localStorage.setItem("total", stotal);
    })
}

//funcion que realiza los impuestos por costo de envio
function costEnvio() {
    let premium = document.getElementById("premium");
    let express = document.getElementById("express");
    document.addEventListener("click", () => {
        if (premium.checked) {
            let precio = JSON.parse(localStorage.getItem("total"));
            impuestoEnvio = precio * (15 / 100)
            total = precio + impuestoEnvio
            document.getElementById("total").innerHTML = "USD " + total
        } else if (express.checked) {
            let precio = JSON.parse(localStorage.getItem("total"));
            impuestoEnvio = precio * (7 / 100)
            total = precio + impuestoEnvio
            document.getElementById("total").innerHTML = "USD " + total
        } else {
            let precio = JSON.parse(localStorage.getItem("total"));
            impuestoEnvio = precio * (5 / 100)
            total = precio + impuestoEnvio
            document.getElementById("total").innerHTML = "USD " + total
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

    let data = await getJSONData(CART_BUY_URL);
    if (data.status === "ok") {
        let exito = data.data.msg;
        
        //Boton que realiza la compra
        button.addEventListener("click", () => {
            if (!button.click()) {
                alerta = `
                <div class="container">
                    <div class="alert alert-success text-center" role="alert">
                        <h4 class="alert-heading">${exito}</h4>
                    </div>
                </div>
                `
                document.getElementById("alerta").innerHTML  = alerta
            }
        })
    }
});