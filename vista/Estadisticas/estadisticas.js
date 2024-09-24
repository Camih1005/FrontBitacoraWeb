/*Simulación de la info del usuario*/
let usuario = {
    "nombre" : "Carlos Jhoan Aguilar",
    "rol" : "Desarrollador",
    "foto" : ""
}

usuario.rol = localStorage.getItem("rol");

document.body.setAttribute("onload", "cargar()");

function cargar() {  

    
    

}

// function irAHome() {
    
//     location.href="/vista/Home/home.html";
// }

// function irAProyectos() {

//     location.href = "/vista/Proyectos/proyectos.html"
// }

// function irAUsuarios() {

//     location.href = "/vista/Team/team.html"
// }

// function irAEstadisticas() {

//     location.href = "/vista/Estadisticas/estadisticas.html"
// }

