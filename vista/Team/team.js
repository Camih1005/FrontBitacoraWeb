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
document.getElementById("bot-confirmar").setAttribute("onclick", "realizarRegistro()");

let nombreInput =  document.getElementById("nombre");
nombreInput.setAttribute("onclick", "cambiarColor(nombreInput)")
let usuarioInput = document.getElementById("usuario");
usuarioInput.setAttribute("onclick", "cambiarColor(usuarioInput)")
let emailInput = document.getElementById("email");
emailInput.setAttribute("onclick", "cambiarColor(emailInput)")
let identificacionInput = document.getElementById("identificacion");
identificacionInput.setAttribute("onclick", "cambiarColor(identificacionInput)")


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

function realizarRegistro() {

    let infoRegistro;
    nombreInput =  document.getElementById("nombre");
    let nombre =  nombreInput.value.trim();
    let usuario = usuarioInput.value.trim();
    let email = emailInput.value.trim();
    let identificacion = identificacionInput.value.trim();
    let idRol = document.getElementById("select-rol").value;
    let nombreFotoInput = document.getElementById("nombre-foto-perfil");
    let nombreFoto = nombreFotoInput.value;

    infoRegistro = {
        "nombre" : `${nombre}`,
        "usuario" : `${usuario}`,
        "email" : `${email}`,
        "identificacion" : `${identificacion}`,
        "idRol" : `${idRol}`,
        "foto" : `${nombreFoto}`
    }

    // const regex_name = /^[a-zA-Z\s]+$/; //Para comprobar nombres
    // const regex_whitespace = /\S/; //Regex para comprobar que no esté vacío
    // //const regex_identificacion = /^[0-9]+$/; //regex para comprobar el número de teléfono
    // const regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; //reex para comprobar el email

    // arr_id_input = [["nombre", Boolean(regex_whitespace.test(name_value)*regex_name.test(name_value))],
    //                 ["email", regex_email.test(email_value) ] ,
    //                 ["celular", regex_cel.test(celular_value)] ];

    if (nombre == "") {
        console.log(nombreInput.value)
        nombreInput.value = "Ingrese un nombre";
        nombreInput.style.color = "red"
    }


}


function cambiarColor(elementoInput) {
    if (elementoInput.style.color=="red") {
        elementoInput.style.color = "black";
        elementoInput.value="";
    }
    
}

