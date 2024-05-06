let nombre = document.getElementById("nombreUser")
let segundoNombre = document.getElementById("snombreUser")
let apellido = document.getElementById("apellidoUser")
let segundoApellido = document.getElementById("sapellidoUser")
let email = document.getElementById("email")
let telefono = document.getElementById("tel")

let datos = [];
let perfilImagen = [];

//Poner y/o Cambiar foto de perfil

//Funcion que muestra la imagen
function mostrarImagen(event) {
    let imagenSource = event.target.result;
    let visualizarImagen = document.getElementById("fotoPerfil");
    visualizarImagen.src = imagenSource;
}

//funcion que carga la imagen
function procesarArchivo(event) {
    let imagen = event.target.files[0];
    let lector = new FileReader();

    lector.addEventListener("load", mostrarImagen)
    lector.readAsDataURL(imagen)
    lector.onload = function () {
        localStorage.setItem("fotoPerfil", JSON.stringify(lector.result))
    }
}

//Escucha al input type file
document.getElementById("cambiarFoto").addEventListener("change", procesarArchivo)


//funcion que valida los fatos del formulario

function validacion() {
    if (nombre.value != "" && apellido.value != "") {
        nombre.classList.add("is-valid")
        apellido.classList.add("is-valid")
    } else {
        nombre.classList.add("is-invalid")
        apellido.classList.add("is-invalid")
    }
}

//funcion que muestra los datos del usuario ya guardados
function datosUSer(array1, array2) {
    let datosUser = JSON.parse(localStorage.getItem("perfilUser"));
    array1.push(datosUser)

    for (let i = 0; i < array1.length; i++) {
        const element = array1[i];
        nombre.value = element.nombre
        segundoNombre.value = element.segundoNombre
        segundoApellido.value = element.segundoApellido
        apellido.value = element.apellido
        telefono.value = element.telefono
    }
    let foto = JSON.parse(localStorage.getItem("fotoPerfil"));
    array2 = foto;
    perfilImagen.push(array2)
    document.getElementById("fotoPerfil").src = array2
}

document.addEventListener("DOMContentLoaded", () => {
    //Se obtiene el correo
    let correo = localStorage.getItem("email");
    email.value = correo

    //Boton del formulario
    document.addEventListener("submit", (e) => {
        form = document.querySelector(".needs-validation")
        if (!form.checkValidity()) {
            e.preventDefault()
            e.stopPropagation()
            validacion()
        }
        //Guarda los datos del usuario
        let datos = {
            nombre: nombre.value,
            segundoNombre: segundoNombre.value,
            apellido: apellido.value,
            segundoApellido: segundoApellido.value,
            telefono: telefono.value,
            email: localStorage.getItem("email"),
        }
        localStorage.setItem("perfilUser", JSON.stringify(datos))

        form.classList.add('was-validated')

    })

    //Se llama la funcion para que muestre los datos del usuario permanentemente
    datosUSer(datos, perfilImagen)
})

