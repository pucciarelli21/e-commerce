const usuario = document.getElementById("email");
const contraseña = document.getElementById("contraseña");

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn").addEventListener("click", function () {
        let vacio = "";
        let contra = ""
        let entrar = false
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
        if (regexEmail.test(usuario.value) == "" || contraseña.value == "") {
            vacio += `
                    <div style="color: red;">
                            Los campos no pueden estar vacios
                    </div>
                    `
            usuario.focus();
            entrar = true
        }
        if (contraseña.value.length < 6) {
            contra += `
                    <div style="color: red;">
                        La contraseña tiene que tener almenos 6 caracteres
                    </div>
                    `
            contraseña.focus()
            entrar = true
        }
        if (entrar) {
            document.getElementById('user').innerHTML = vacio
            document.getElementById('pass').innerHTML = contra
        } else {
            localStorage.setItem('email', usuario.value);
            window.location = "home.html"
        }
    });

})