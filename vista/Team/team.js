let usuario = {
    "nombre" : "Carlos Jhoan Aguilar",
    "rol" : "Desarrollador",
    "foto" : ""
}

usuario.rol = localStorage.getItem("rol");

document.body.setAttribute("onload", "cargar()");

function cargar() {  

}
