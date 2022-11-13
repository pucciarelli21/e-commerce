const ORDER_ASC_BY_COST = "AZ";
const ORDER_DESC_BY_COST = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let data = [];
let clasificacionProductos = undefined;
let buscador = undefined;
let = minCount = undefined;
let = maxCount = undefined;


// Se obtiene la id de la cateogira

id = localStorage.getItem("catID")

// Fetch

document.addEventListener("DOMContentLoaded", async function(){
    let listaProductos = await getJSONData(`https://japceibal.github.io/emercado-api/cats_products/${id}.json`);
    if(listaProductos.status === "ok"){
        data = listaProductos.data.products
    }
    productos(data)
    document.getElementById("productos").addEventListener("click", function(){
    window.location = "product-info.html"
    })

    document.getElementById("sortAsc").addEventListener("click", function(){
        mostrarProductos(ORDER_ASC_BY_COST);
    });
    
    document.getElementById("sortDesc").addEventListener("click", function(){
        mostrarProductos(ORDER_DESC_BY_COST);
    });
    
    document.getElementById("sortByCount").addEventListener("click", function(){
        mostrarProductos(ORDER_BY_PROD_COUNT);
    });
    
    document.getElementById("busqueda-productos").addEventListener("keyup", function(event) {
        buscador = document.getElementById("busqueda-productos").value.toLowerCase();
        productos(data);
    });
    
    //Limpia las variables globales de minCount y maxCount 
    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
    
        minCount = undefined;
        maxCount = undefined;
    
        productos(data);
    });
    
    document.getElementById("rangeFilterCount").addEventListener("click", function() {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por rango de precio 
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;
        //validar que los valores de minCount y maxCount sean números positivos y luego los asigna a las variables globales
        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        } else {
            minCount = undefined;
        }
    
        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        } else {
            maxCount = undefined;
        }
        //Muestra los productos según el rango que se haya definido en minCount y maxCount
        productos(data);
    });
});

//Clasificar los productos en función de criterio y de array

function ordenarProductos(criterio, array){
    //Se crea una variable que es un array vacío donde se cargará lo que se ordene
    let resultado = [];
    //Condición cuando lo querés ascendente 
    if (criterio === ORDER_ASC_BY_COST){
        // Se carga en resultado el array ya ordenado por criterio
        resultado = array.sort(function(a, b) {
            // Compara de uno contra uno y devuelve el menor 
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
        //Condición cuando lo querés por orden descendente
    }else if (criterio === ORDER_DESC_BY_COST){
        // Se carga en resultado el array ya ordenado por criterio
        resultado = array.sort(function(a, b) {
            // Compara de uno contra uno y devuelve el mayor
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
        // Condición cuando querés que se ordene por productos vendidos
    }else if (criterio === ORDER_BY_PROD_COUNT){
        // Variables que almacenan la cantidad de productos en enteros
        resultado = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);
        // Compara los valores de cantidad y retorna el mayor
            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }
    return resultado;
}

// función que ordena y muestra los productos
function mostrarProductos(sortCriteria, categoriesArray){
    clasificacionProductos = sortCriteria;
// si el array no está vacío lo copiamos en una variable auxiliar 
    if(categoriesArray != undefined){
        data = categoriesArray;
    }
    // se ordena la variable auxiliar que se creó anteriormente 
    data = ordenarProductos(clasificacionProductos, data);

    //Muestro las productos ordenados
    productos(data);
}

// Impresion de productos

function productos (data){
    let body = "";
    for (var i = 0; i < data.length; i++) {    
        
        let nombreProducto = data[i].name.toLowerCase();
        if(  //Filtro por rango de precio
            ((minCount == undefined) || (minCount != undefined && parseInt(data[i].productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(data[i].productCount) <= maxCount)) &&

             //Filtro de busqueda por nombre
            (buscador == undefined) || ((nombreProducto.includes(buscador)))) {

                body+=`
                <div onclick="setProdID(${data[i].id})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-12 col-sm-7 col-lg-3">
                            <img src="${data[i].image}" alt="" class="img-thumbnail">
                        </div>
                        <div class="col-12 col-sm-5 col-lg-7">
                            <div class=" w-100 justify-content-between">
                                <h4 class="mb-1">${data[i].name} - ${data[i].cost} ${data[i].currency}</h4>
                                
                            </div>
                            <p class="mb-1">${data[i].description}</p>
                            <small class="text-muted">${data[i].soldCount} artículos</small>
                        </div>
                    </div>
                </div>
                `
                }
            }
     //console.log(body);
     document.getElementById('productos').innerHTML = body
};