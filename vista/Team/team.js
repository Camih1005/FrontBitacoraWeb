let usuario = {
    "nombre" : "Carlos Jhoan Aguilar",
    "rol" : "Desarrollador",
    "foto" : ""
}

usuario.rol = localStorage.getItem("rol");

document.body.setAttribute("onload", "cargar()");
document.getElementById("bot-registrar").setAttribute("onclick", "desplegarFormularioRegistro()")
document.getElementById("bot-cancelar").setAttribute("onclick", "cerrarFormularioRegistro()")
document.getElementById("foto-perfil-registro").setAttribute("onchange", "subirFoto()")


function cargar() {  
    console.log(document.getElementById("foto-perfil-registro").textContent)
}

function desplegarFormularioRegistro() {
    let divFormulario = document.getElementById("registrar-integrante"); 
    divFormulario.style.display="flex"
    
    
}

function cerrarFormularioRegistro() {
    let divFormulario = document.getElementById("registrar-integrante"); 
    divFormulario.style.display="none";
    
}

function subirFoto() {
    let nombreFotoPerfil =document.getElementById("foto-perfil-registro").value.split("\\")[2] 
    document.getElementById("nombre-foto-perfil").value = nombreFotoPerfil;
    
}

