const usuario = document.getElementById("email");
const contraseña = document.getElementById("contraseña");
const form = document.querySelector(".needs-validation")

function validacion() {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/ // Validacion de estructura de email
    if(regexEmail.test(usuario.value) == "" && contraseña.value == "") {
        console.log("false") 
    }
}

document.getElementById("btn").addEventListener("click", (e) => {
    if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        validacion();  
    }else{
        localStorage.setItem('email', usuario.value);
        window.location = "home.html"
    }
    form.classList.add('was-validated')
})