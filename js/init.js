catID = localStorage.getItem("catID");
prodID = localStorage.getItem("prodID");

const CATEGORIES_URL = "https://pucciarelli21.github.io/APIS-Pruebas/categorias/categorias.json";
const PUBLISH_PRODUCT_URL = "https://pucciarelli21.github.io/APIS-Pruebas/carrito/1.json";
const PRODUCTS_URL = `https://pucciarelli21.github.io/APIS-Pruebas/categorias-productos/${catID}.json`;
const PRODUCT_INFO_URL = `https://pucciarelli21.github.io/APIS-Pruebas/productos/${prodID}.json`;
const PRODUCT_INFO_COMMENTS_URL = `https://pucciarelli21.github.io/APIS-Pruebas/productos-comentarios/${prodID}.json`;
const CART_INFO_URL = "https://pucciarelli21.github.io/APIS-Pruebas/carrito/1.json";
const CART_BUY_URL = "https://pucciarelli21.github.io/APIS-Pruebas/carrito/buy.json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

// Local storage - Guardado de usuario

function muestroUser() {;
  let emailValue = localStorage.getItem("email");
  if (emailValue !== null) {
  let nombreUsuario = document.getElementById("muestroEmail");
  nombreUsuario.innerHTML += emailValue;
  }
}

// Limpia el localStorage
function cerrarSesion() {
  localStorage.removeItem("email");
  location.href = "index.html"
}

// Se muestra el usuario

document.addEventListener("DOMContentLoaded", function() {
  muestroUser()
});


//Local storage de la identidad de la categoria seleccionada
function setCatID(id) {
  localStorage.setItem("catID", JSON.parse(id));
  window.location = "products.html"
}

//Local storage de la id del producto seleccionado
function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html"
}