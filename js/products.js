// Fetch

document.addEventListener("DOMContentLoaded", async function(){
    let autos = await getJSONData(CAT_AUTOS);
    if(autos.status === "ok"){
        data = autos.data.products
        productos(data);
    }
    document.getElementById("productos").addEventListener("click", function(){
        window.location = "product-info.html"
    })
})

// Impresion de productos

function productos (data){
    let body = "";
    for (var i = 0; i < data.length; i++) {      
        body+=`
        <div onclick="setCatID(${data[i].id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${data[i].image}" alt="" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${data[i].name} - ${data[i].cost} ${data[i].currency}</h4>
                        <small class="text-muted">${data[i].soldCount} artículos</small>
                    </div>
                    <p class="mb-1">${data[i].description}</p>
                </div>
            </div>
        </div>
        `
     }
     //console.log(body);
     document.getElementById('productos').innerHTML = body
};