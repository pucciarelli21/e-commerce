let product = {};
let comentarios = [];


//Funcion que imprime el carrusel y data del producto
function mostrarImagenes(array) {
    carrusel = `
        <div class="carousel-item active">
        <img src="${array.images[0]}" alt="" class=" d-block w-100  img-fluid">
        </div>
    `
    nombreCarruselProd = ""
    description = ""
    description += `
            <div>
                <div>
                    <h2>${array.name}</h2>
                </div>
                <div class="justify-content-center">
                    <h4>${array.description}</h4>
                </div>
            </div>
                <h2 class="col-12 col-lg-12 p-0">Precio: ${array.currency} ${array.cost}</h2>
            <div class="d-flex">
                <h5 class="col-8 p-0">Total vendidos ${array.soldCount}</h5>
            </div>
                `
    for (let i = 1; i < array.images.length; i++) {
        let image = array.images
        carrusel += `
            <div class="carousel-item">
              <img src="${image[i]}" alt="" class="d-block w-100 img-fluid">
            </div>
            
        `
        document.getElementById("info-prod").innerHTML = carrusel;
    }
    document.getElementById("descripcion").innerHTML = description;
}



//Función que muestra los productos relacionados 

function mostrarRelatedProducts(array) {

    let contenidoHTML = "";
    for (let i = 0; i < array.relatedProducts.length; i++) {
        let prodRelacionado = array.relatedProducts[i];
        contenidoHTML += `
    <div class="btn" style="margin:10px 10px 0px 10px;" onclick="setProdID(${prodRelacionado.id})">   
        <div class="card">
        <img src=" `+ prodRelacionado.image + `" class="card-img-top" alt="Imagen">
            <div class="card-body">
            <h5 class="card-text">`+ prodRelacionado.name + `</h5>
            </div>
        </div>
    </div>
        `
        document.getElementById("prod-relacionados").innerHTML = contenidoHTML;

    }
}




function nuevoComentario() {
    let dateTime = new Date();
    let fecha = dateTime.getFullYear() + "-" + dateTime.getMonth() + "-" + dateTime.getDate() + " " + dateTime.toLocaleTimeString("es-UY");
    let descripcion = document.getElementById("descripcion-comentario").value;
    let score = document.getElementById("puntaje").value;

    if (descripcion === "" || isNaN(score)) {
        alert("Debe poner un comentario y puntaje");
    } else {
        //Formato del comentario en array
        let comentario = {
            description: descripcion,
            dateTime: fecha,
            score: score,
            user: localStorage.getItem("email")
        }
        //A la lista del json se le pushean los comentarios nuevos
        comentarios.push(comentario);
        //Se recarga la lista y se muestran todos los comentarios
        mostrarComentarios();
    }
}


//Funcion que crea la tarjeta de los comentarios

function mostrarComentarios() {
    let html = ""
    for (let i = comentarios.length - 1; i >= 0; i--) {
        let comentario = comentarios[i];
        html += ` 
        <div class= "card deck mt-4" >
         <div class="card-body">
                    <h5 class="card-title"> <i class='far fa-user-circle' style='font-size:24px'></i> ${comentario.user}</h5>
                    <p class="card-text">${comentario.description}</p>
                    <p class="card-text"> ${estrellas(comentario.score)}</p>
                    <h6 class="card-subtitle mb-2 text-muted">${comentario.dateTime}</h6>
                
             </div>      
        </div>`

    }

    document.getElementById("comentarios").innerHTML = html;
    document.getElementById("formulario").reset();
}

//Funcion que crea la puntuacion en fotma de estrella

function estrellas(score) {

    let number = parseInt(score);
    let retorno = "";
    for (let i = 1; i <= number; i++) {
        retorno += `<p class="fa fa-star checked"></p>`

    }
    for (let b = number + 1; b <= 5; b++) {
        retorno += `<p class="fa fa-star"></p>`
    }
    return retorno;

}

//Fetch

document.addEventListener("DOMContentLoaded", async function () {
    let a = await getJSONData(PRODUCT_INFO_URL);
    if (a.status === "ok") {
        product = a.data
    }
    mostrarImagenes(product)
    mostrarRelatedProducts(product)
    let c = await getJSONData(PRODUCT_INFO_COMMENTS_URL);
    if (c.status === "ok") {
        comentarios = c.data;
        mostrarComentarios(comentarios);
    }
});