const usuario = document.getElementById("usuario");
const contraseña = document.getElementById("contraseña");
const boton = document.getElementById("btn");

boton.addEventListener("click", function(){
    let Errores_ = "";
    if(usuario.value == "" || contraseña.value == ""){
        Errores_+=`
           <div style="color: red;">
           Los campos no pueden estar vacios
           </div>
           `
        document.getElementById('user').innerHTML = Errores_
        document.getElementById('contraseña').innerHTML = Errores_
    }else{
        window.location = "home.html"
    }
 })