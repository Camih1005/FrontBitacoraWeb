/*Simulación de la info del usuario*/
let usuario = {
    "nombre" : `${localStorage.getItem("nombre")}`,
    "rol" : `${localStorage.getItem("rol")}`,
    "foto" : `${localStorage.getItem("foto")}`
}

usuario.rol = localStorage.getItem("rol");

document.body.setAttribute("onload", "cargar()");

function cargar() {  

    
    

}



