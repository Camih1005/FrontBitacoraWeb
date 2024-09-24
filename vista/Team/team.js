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

let nombreFotoInput = document.getElementById("nombre-foto-perfil");


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

    nombreInput.value = "";
    usuarioInput.value = "";
    emailInput.value = "";
    identificacionInput.value = "";

    nombreFotoInput = document.getElementById("nombre-foto-perfil");
    nombreFotoInput.value="";


    
}

function subirFoto() {
    let nombreFotoPerfil =document.getElementById("foto-perfil-registro").value.split("\\")[2] 
    document.getElementById("nombre-foto-perfil").value = nombreFotoPerfil;
    
}

function realizarRegistro() {

    let infoRegistro;

    nombreInput =  document.getElementById("nombre");
    let nombre =  nombreInput.value.trim();

    usuarioInput = document.getElementById("usuario");
    let nombreUsuario = usuarioInput.value.trim();

    emailInput = document.getElementById("email");
    let email = emailInput.value.trim();

    identificacionInput = document.getElementById("identificacion");
    let identificacion = identificacionInput.value.trim();


    let idRol = document.getElementById("select-rol").value;
    let nombreFotoInput = document.getElementById("nombre-foto-perfil");
    let nombreFoto = nombreFotoInput.value;

    infoRegistro = {
        "nombre" : `${nombre}`,
        "usuario" : `${nombreUsuario}`,
        "email" : `${email}`,
        "identificacion" : `${identificacion}`,
        "idRol" : `${idRol}`,
        "foto" : `${nombreFoto}`
    }

    const regex_name = /^[a-zA-Z\s]+$/; //Para comprobar nombres
    const regex_whitespace = /\S/; //Regex para comprobar que no esté vacío
    const regex_identificacion = /^[0-9]+$/; //regex para comprobar la dentificación
    const regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; //reex para comprobar el email

    // arr_id_input = [["nombre", Boolean(regex_whitespace.test(name_value)*regex_name.test(name_value))],
    //                 ["email", regex_email.test(email_value) ] ,
    //                 ["celular", regex_cel.test(celular_value)] ];

    if  (Boolean(regex_whitespace.test(nombreUsuario)*regex_name.test(nombreUsuario))== false) {

        usuarioInput.value = "Usuario NO permitido";
        usuarioInput.style.color = "red";

    } else if(regex_identificacion.test(identificacion) == false) {

        identificacionInput.value = "Identificación NO permitida";
        identificacionInput.style.color = "red";

    }
    
    
    if(Boolean(regex_whitespace.test(nombre)*regex_name.test(nombre))== false) {
        
        nombreInput.value = "Nombre NO permitido";
        nombreInput.style.color = "red";

    } else if(regex_email.test(email) == false) {
        
        emailInput.value = "Email NO permitido";
        emailInput.style.color = "red";

    } 

}


function cambiarColor(elementoInput) {
    if (elementoInput.style.color=="red") {
        elementoInput.style.color = "black";
        elementoInput.value="";
    }
    
}

