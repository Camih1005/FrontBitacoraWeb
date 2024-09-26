/*Simulación de la info del usuario*/
let usuario = {
    "nombre" : `${localStorage.getItem("nombre")}`,
    "rol" : `${localStorage.getItem("rol")}`,
    "foto" : `${localStorage.getItem("foto")}`
}

// usuario.rol = localStorage.getItem("rol");

document.body.setAttribute("onload", "cargar()");

let botCrearProyecto = document.getElementById("bot-crear-proyecto");
botCrearProyecto.setAttribute("onclick", "desplegarFormularioCrearProyecto()");

let botCancelarRegistro = document.getElementById("bot-cancelar");
botCancelarRegistro.setAttribute("onclick", "cancelarRegistroProyecto()");

let botAsignarTechLeader = document.getElementById("bot-asignar-lider");
botAsignarTechLeader.setAttribute("onclick", "desplegarTodosTechLeaders()")


let botCancelarAsignacionTechLeader = document.getElementById("bot-no-asignar-lider");
botCancelarAsignacionTechLeader.setAttribute("onclick", "cerrarContenedorTodosTechLeader()")

let idTechLeader=0;

let listaTodosTechLeader = [];
let listaTodosDevs = [];

let idLeaderSeleccionado= 0;

let imgLeaderSeleccionado = "";
let nombreLeaderSeleccionado = "";
let identLeadeSeleccionado = "";
let emailLeadeSeleccionado = "";

function cargar() {  

    let urlApiTodosDevsLeaders = "https://satisfied-rejoicing-production.up.railway.app/api/user";
    fetch(urlApiTodosDevsLeaders, {
        method : 'GET',
        mode: "cors",
        headers: {
            'Content-type' : 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
        }
    })
    .then(response => response.json())
    .then(data => {
        
        data.forEach(element => {
            
            if (element.rol.nombre == "Tech Leader") {
                listaTodosTechLeader.push(element)
            } else if (element.rol.nombre == "Desarrollador") {
                listaTodosDevs.push(element);
            }
        });

    })
}

function desplegarFormularioCrearProyecto() {
    let botCrearProyecto = document.getElementById("bot-crear-proyecto");
    let contenedorTodosProyectos = document.getElementById("contenedor-todos-proyectos");
    let contenedorFormularioRegistroProyecto = document.getElementById("contenedor-nuevo-proyecto");

    botCrearProyecto.style.display = "none";
    contenedorTodosProyectos.style.display = "none";
    contenedorFormularioRegistroProyecto.style.display = "flex";

}

function cancelarRegistroProyecto() {
    let botCrearProyecto = document.getElementById("bot-crear-proyecto");
    let contenedorTodosProyectos = document.getElementById("contenedor-todos-proyectos");
    let contenedorFormularioRegistroProyecto = document.getElementById("contenedor-nuevo-proyecto");

    botCrearProyecto.style.display = "flex";
    contenedorTodosProyectos.style.display = "flex";
    contenedorFormularioRegistroProyecto.style.display = "none";
}

function desplegarTodosTechLeaders() {

    
    let divTodosTechLeaders = document.getElementById("div-todos-integrantes");
    let contadorOnError = 0;
    let anteriorOnError= 0;
    listaTodosTechLeader.forEach(leader =>  {

        let fotoPerfil = leader.fotoPerfil;

        let contenedorNuevoTechLeader = document.createElement("div");
        contenedorNuevoTechLeader.id = `leader-${leader.id}`;
        contenedorNuevoTechLeader.classList.add("display-horizontal-between", "gap-3", "tarjeta-dev");
        contenedorNuevoTechLeader.innerHTML=`<img id="img-${leader.id}" src="" alt="" class="img-integrante"><div class="p-2"><p class="texto-fuente-playwrite"><b>Nombre:</b> ${leader.nombre}</p><p class="texto-fuente-playwrite"><b>Ident: </b>${leader.cedula}</p><p class="texto-fuente-playwrite"><b>Email: </b>${leader.correo}</p></div>`;
        

        divTodosTechLeaders.appendChild(contenedorNuevoTechLeader);

    
        let imgTechLeader = document.getElementById(`img-${leader.id}`);

        


        fetch(`/recursos/Images/${fotoPerfil.trim()}`, {
            method: 'GET',
        })
        .then(response => response.status)
        .then(data =>  {
            // console.log(data)
            // if (data != 304) {
                
            //     imgTechLeader.onerror();
            // } 
    
            if (data === 404) {
                
                imgTechLeader.setAttribute("src", "/recursos/Images/no-foto.png");
            } else {
        
                imgTechLeader.setAttribute("src", `/recursos/Images/${fotoPerfil.trim()}`);
                
            }

            let srcImagenSeleccionado = document.getElementById(`img-${leader.id}`).getAttribute("src");
        
        contenedorNuevoTechLeader.setAttribute("onclick", `seleccionarLeader(${leader.id}, '${leader.nombre}', '${leader.cedula}',  '${leader.correo}', '${srcImagenSeleccionado}')`);

           
    
        });

        

    
    }

    )
    
    let contenedorFormularioRegistroProyecto = document.getElementById("contenedor-nuevo-proyecto");
    contenedorFormularioRegistroProyecto.style.display = "none";

    let contenedorTodosDevsLeaders = document.getElementById("contenedor-devs-lideres");
    contenedorTodosDevsLeaders.style.display = "flex";
}

function desplegarTodosDevs() {

}

function cerrarContenedorTodosTechLeader() {

    

    let contenedorFormularioRegistroProyecto = document.getElementById("contenedor-nuevo-proyecto");
    contenedorFormularioRegistroProyecto.style.display = "flex";

    let contenedorTodosDevsLeaders = document.getElementById("contenedor-devs-lideres");
    contenedorTodosDevsLeaders.style.display = "none"

}

function seleccionarLeader(idLeaderSelecc, nombre, cedula, correo, srcImagen) {

    
    console.log(nombre + " " + cedula + " " + correo + " " + srcImagen);
    let divSleccionado = document.getElementById(`leader-${idLeaderSelecc}`);

    if(idTechLeader == 0) {

        
        divSleccionado.style.backgroundColor = "rgb(127, 250, 127)";

    } else if (idTechLeader != idLeaderSelecc) {

        let divAnterior = document.getElementById(`leader-${idTechLeader}`);
        divAnterior.style.backgroundColor = "#f6f6f6";
        divAnterior.addEventListener('mouseover', () => {
            divAnterior.style.backgroundColor = "rgb(173, 249, 173)";
        })

        divAnterior.addEventListener('mouseout', () => {
            divAnterior.style.backgroundColor = "#f6f6f6";
        });

        divAnterior.addEventListener('click', () => {
            divAnterior.style.backgroundColor = "rgb(127, 250, 127)";
        })

        divSleccionado.style.backgroundColor = "rgb(127, 250, 127)";
    }
    
    else {
        // Todo igual
    }

    
    idTechLeader = idLeaderSelecc;
    nombreLeaderSeleccionado = nombre;
    identLeadeSeleccionado = cedula;
    emailLeadeSeleccionado = correo;
    imgLeaderSeleccionado = srcImagen;

}


