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
document.getElementById("bot-confirmar").setAttribute("onclick", "realizarRegistro()")


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
    let nombre =  document.getElementById("nombre").value.trim();
    let usuario = document.getElementById("usuario").value.trim();
    let email = document.getElementById("email").value.trim();
    let identificacion = document.getElementById("identificacion").value.trim();
    let idRol = document.getElementById("select-rol").value;
    let nombreFoto = document.getElementById("nombre-foto-perfil").value;

    infoRegistro = {
        "nombre" : `${nombre}`,
        "usuario" : `${usuario}`,
        "email" : `${email}`,
        "identificacion" : `${identificacion}`,
        "idRol" : `${idRol}`,
        "foto" : `${nombreFoto}`
    }

    const regex_name = /^[a-zA-Z\s]+$/; //Para comprobar nombres
    const regex_whitespace = /\S/; //Regex para comprobar que no esté vacío
    //const regex_identificacion = /^[0-9]+$/; //regex para comprobar el número de teléfono
    const regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; //reex para comprobar el email

    arr_id_input = [["nombre", Boolean(regex_whitespace.test(name_value)*regex_name.test(name_value))],
                    ["email", regex_email.test(email_value) ] ,
                    ["celular", regex_cel.test(celular_value)] ];


    console.log(infoRegistro);


    


}

