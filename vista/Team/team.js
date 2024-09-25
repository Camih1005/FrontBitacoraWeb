let usuario = {
    "nombre" : "Carlos Jhoan Aguilar",
    "rol" : "Project Manager",
    "foto" : ""
}

usuario.rol = localStorage.getItem("rol");

let jsonRoles;
let hashRol= {};

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
    
    const urlApiRoles = 'https://satisfied-rejoicing-production.up.railway.app/api/rol';
    
    fetch (urlApiRoles, {
        method: 'GET',
        mode: "cors",
        headers: {
        'Content-type' : 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        }, 
    })
    .then(response => response.json())
    .then(data => {

        let selectorRol = document.getElementById("select-rol");
        jsonRoles = data.slice(1, 3);
        

        jsonRoles.forEach(nuevoRol => {

            hashRol[nuevoRol.nombre] = nuevoRol.id;

            let elementoOptionRol = document.createElement("option");
            elementoOptionRol.value= nuevoRol.nombre;
            elementoOptionRol.textContent = nuevoRol.nombre;
            selectorRol.appendChild(elementoOptionRol);
        });

        console.log(jsonRoles)
        
        
    });

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

    let infoRegistro = {};
    const urlRegistrarIntegrante = "https://satisfied-rejoicing-production.up.railway.app/auth/registro";

    selectorRol = document.getElementById("nombre");

    nombreInput =  document.getElementById("nombre");
    let nombre =  nombreInput.value.trim();

    usuarioInput = document.getElementById("usuario");
    let nombreUsuario = usuarioInput.value.trim();

    emailInput = document.getElementById("email");
    let email = emailInput.value.trim();

    identificacionInput = document.getElementById("identificacion");
    let identificacion = identificacionInput.value.trim();

    let rolSelector = document.getElementById("select-rol");
    let nombreRol = rolSelector.value;

    let nombreFotoInput = document.getElementById("nombre-foto-perfil");
    let nombreFoto = nombreFotoInput.value;

    
    /*Expresiones regulares para validar información */
    const regex_name = /^[a-zA-Z\s]+$/; //Para comprobar nombres
    const regex_usuario = /^([a-z0-9]+)$/i; //para probar nombe de usuario
    const regex_whitespace = /\S/; //Regex para comprobar que no esté vacío
    const regex_identificacion = /^[0-9]+$/; //regex para comprobar la dentificación
    const regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; //reex para comprobar el email

    

    if  (regex_usuario.test(nombreUsuario)== false) {

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

    } else {

        if (nombreFoto == "") {
            nombreFoto = "sin-foto";
        }

        infoRegistro = {
            "username" : `${nombreUsuario}`,
            "nombre" : `${nombre}`,
            "password": `${identificacion}`,
            "profilepic": `${nombreFoto}`,
            "cedula" : `${identificacion}`,
            "correo" : `${email}`,
            "rolRegistrador": "Project Manager",
            "rol": {
                "id": `${hashRol[nombreRol]}`,
                "nombre": `${nombreRol}`
            }
        }

        

        /* Registor del nuevo integrante */
        fetch(urlRegistrarIntegrante, {
            
            method : 'POST',
            body : JSON.stringify(infoRegistro),
            headers : {
                'Content-type' : 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
            }
        })
        .then(response => response.status)
        .then(data => {
            
            if(data == 200 ) {
                alert("Se ha regsitrado un nuevo integrante exitosamente!")
                console.log(infoRegistro);
                cerrarFormularioRegistro();

            } else {
                alert("Error al registrar");

                // nombreInput.value = "";
                // usuarioInput.value = "";
                // emailInput.value = "";
                // identificacionInput.value = "";
                // nombreFotoInput.value = "";
            }

        })
        
    }

}


function cambiarColor(elementoInput) {
    if (elementoInput.style.color=="red") {
        elementoInput.style.color = "black";
        elementoInput.value="";
    }
    
}

