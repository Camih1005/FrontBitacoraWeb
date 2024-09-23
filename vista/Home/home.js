
let usuario = {
    "nombre" : "Carlos Jhoan Aguilar",
    "rol" : "Project Manager",
    "foto" : " "
}


document.body.setAttribute("onload", "mostrarHome()");
document.getElementById("link-logout").setAttribute("href", "http://127.0.0.1:5501/index.html")
document.getElementById("bot-proyectos").setAttribute("onclick", "irAProyectos()");
document.getElementById("bot-mi-team").setAttribute("onclick", "irAUsuarios()");
document.getElementById("bot-actividades").setAttribute("onclick", "irAActividades()");
document.getElementById("bot-estadisticas").setAttribute("onclick", "irAEstadisticas()");

function mostrarHome() {

    // Cargar la foto del usuario
    let imgPerfilUsuario = document.getElementById("foto-perfil");

    imgPerfilUsuario.onerror = function() {
        usuario.foto = "  ";
    }

    //Verificación si la foto existe en la galería. Si no, pone ícono no-foto

    fetch(`/recursos/Images/${usuario.foto.trim()}`, {
        method: 'GET',
    })
    .then(response => response.status)
    .then(data =>  {

        if (data === 404) {

            imgPerfilUsuario.onerror();
        }

        if (usuario.foto.trim() === "") {

            imgPerfilUsuario.setAttribute("src", "/recursos/Images/no-foto.png");
        } else {
    
            imgPerfilUsuario.setAttribute("src", `/recursos/Images/${usuario.foto.trim()}`);
            
        }

    }

        
    );
        

    // Cargar el nombre del usuario
    let nombreUsuario = document.getElementById("nombre");
    nombreUsuario.textContent = usuario.nombre;

    // Cargar el Rol

    let rol = document.getElementById("rol");
    rol.textContent = usuario.rol;

    if (usuario.rol === "Desarrollador") {
        let divDev = document.getElementsByClassName("project-lider")
        //divDev.remove();
        for (let i=0; i < divDev.length; i++) {
            let divHijo = document.getElementById(divDev.item(i).id);
            divHijo.style.display = "none";
            
        }
    } else {
        divDev = document.getElementsByClassName("dev")
        //divDev.remove();
        for (let j=0; j < divDev.length; j++) {
            let divHijo = document.getElementById(divDev.item(j).id);
            divHijo.style.display = "none";
            
        }
    }
}

function irAProyectos() {

    location.href = "/vista/Proyectos/proyectos.html"
}

