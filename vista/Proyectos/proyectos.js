/*Simulación de la info del usuario*/
let usuario = {
    "nombre" : `${localStorage.getItem("nombre")}`,
    "rol" : `${localStorage.getItem("rol")}`,
    "foto" : `${localStorage.getItem("foto")}`
}

console.log(usuario);

document.body.setAttribute("onload", "cargar()");

let botCrearProyecto = document.getElementById("bot-crear-proyecto");
botCrearProyecto.setAttribute("onclick", "desplegarFormularioCrearProyecto()");

let botCancelarRegistro = document.getElementById("bot-cancelar");
botCancelarRegistro.setAttribute("onclick", "cancelarRegistroProyecto()");

let botAsignarTechLeader = document.getElementById("bot-asignar-lider");
botAsignarTechLeader.setAttribute("onclick", "desplegarTodosTechLeaders()")

let botAgregarDevs = document.getElementById("agregar-devs");
botAgregarDevs.setAttribute("onclick", "desplegarTodosDevs()")


let botCancelarAsignacionTechLeader = document.getElementById("bot-no-asignar-lider");
botCancelarAsignacionTechLeader.setAttribute("onclick", "cerrarContenedorTodosTechLeader()")


let botAgregarActividad = document.getElementById("bot-agregar-actividad");
botAgregarActividad.setAttribute("onclick", "agregarActividad()");

let botConfirmarRegistroProyecto = document.getElementById("bot-confirmar");
botConfirmarRegistroProyecto.setAttribute("onclick", "confirmarCreacionProyecto()");


let idTechLeader=0;
let listDevsSeleccionados = [];

let listaTodosTechLeader = [];
let listaTodosDevs = [];

let jsonInfoDevsSeleccionados = {}

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
        console.log("aquí")
        data.forEach(element => {
            
            if (element.rol.nombre == "Tech Leader") {
                listaTodosTechLeader.push(element)
            } else if (element.rol.nombre == "Desarrollador") {
                listaTodosDevs.push(element);
            }
        })

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

    document.getElementById("bot-si-asignar-lider").setAttribute("onclick", "mostrarTechLeaderSeleccionado()");

    let divTodosTechLeaders = document.getElementById("div-todos-integrantes");

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
    document.getElementById("bot-si-asignar-lider").setAttribute("onclick", "mostrarDevsSeleccionados()");

    let divTodosDevs = document.getElementById("div-todos-integrantes");


    listaTodosDevs.forEach(dev =>  {

        let fotoPerfil = dev.fotoPerfil;

        let contenedorNuevoDev = document.createElement("div");
        contenedorNuevoDev.id = `dev-${dev.id}`;
        contenedorNuevoDev.classList.add("display-horizontal-between", "gap-3", "tarjeta-dev");
        contenedorNuevoDev.innerHTML=`<img id="img-${dev.id}" src="" alt="" class="img-integrante"><div class="p-2"><p class="texto-fuente-playwrite"><b>Nombre:</b> ${dev.nombre}</p><p class="texto-fuente-playwrite"><b>Ident: </b>${dev.cedula}</p><p class="texto-fuente-playwrite"><b>Email: </b>${dev.correo}</p></div>`;
        

        divTodosDevs.appendChild(contenedorNuevoDev);

    
        let imgDev = document.getElementById(`img-${dev.id}`);

    

        fetch(`/recursos/Images/${fotoPerfil.trim()}`, {
            method: 'GET',
        })
        .then(response => response.status)
        .then(data =>  {
            
            if (data === 404) {
                
                imgDev.setAttribute("src", "/recursos/Images/no-foto.png");
            } else {
        
                imgDev.setAttribute("src", `/recursos/Images/${fotoPerfil.trim()}`);
                
            }

            let srcImagenSeleccionado = document.getElementById(`img-${dev.id}`).getAttribute("src");
        
        contenedorNuevoDev.setAttribute("onclick", `seleccionarDev(${dev.id}, '${dev.nombre}', '${dev.cedula}',  '${dev.correo}', '${srcImagenSeleccionado}')`);

           
    
        });

    }

    )
    
    let contenedorFormularioRegistroProyecto = document.getElementById("contenedor-nuevo-proyecto");
    contenedorFormularioRegistroProyecto.style.display = "none";

    let contenedorTodosDevsLeaders = document.getElementById("contenedor-devs-lideres");
    contenedorTodosDevsLeaders.style.display = "flex";

}


function seleccionarDev(idDevSelecc, nombre, cedula, correo, srcImagen) {

    jsonInfoDevsSeleccionados[idDevSelecc] = [nombre, cedula, correo, srcImagen];

    let divSleccionado = document.getElementById(`dev-${idDevSelecc}`);

    if (listDevsSeleccionados.includes(idDevSelecc) == false) {
        
        divSleccionado.style.backgroundColor = "rgb(127, 250, 127)";
        listDevsSeleccionados.push(idDevSelecc);
        

    } else {
        divSleccionado.style.backgroundColor = "#f6f6f6";

        delete jsonInfoDevsSeleccionados[idDevSelecc];
        console.log(jsonInfoDevsSeleccionados)

        let indexIdDevEnLista = listDevsSeleccionados.indexOf(idDevSelecc);

        if (indexIdDevEnLista > -1) { 
            listDevsSeleccionados.splice(indexIdDevEnLista, 1); 
          }
        
    }

    console.log(jsonInfoDevsSeleccionados[idDevSelecc][3])
    

}

function cerrarContenedorTodosTechLeader() {


    let contenedorFormularioRegistroProyecto = document.getElementById("contenedor-nuevo-proyecto");
    contenedorFormularioRegistroProyecto.style.display = "flex";

    let contenedorTodosDevsLeaders = document.getElementById("contenedor-devs-lideres");
    contenedorTodosDevsLeaders.style.display = "none"

    document.getElementById("div-todos-integrantes").innerHTML = "";

}

function seleccionarLeader(idLeaderSelecc, nombre, cedula, correo, srcImagen) {

    
    
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

            if (divAnterior.style.backgroundColor == "rgb(127, 250, 127)") {

                divAnterior.style.backgroundColor = "rgb(127, 250, 127)";
            }else if (divAnterior.style.backgroundColor = "rgb(173, 249, 173)"){
                
                divAnterior.style.backgroundColor = "#f6f6f6";
            } else {
                divAnterior.style.backgroundColor = "#f6f6f6";
            }
            
        });

        divAnterior.addEventListener('click', () => {

            if (divAnterior.style.backgroundColor == "rgb(173, 249, 173)") {
                divAnterior.style.backgroundColor = "rgb(127, 250, 127)";
            } else {
                divAnterior.style.backgroundColor = "#f6f6f6";
            }
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


function mostrarTechLeaderSeleccionado() {

    let divTodosIntegrantes = document.getElementById("div-todos-integrantes");

    if (idTechLeader != 0) {

        document.getElementById("foto-leader-seleccionado").setAttribute("src", imgLeaderSeleccionado);
        document.getElementById("nombre-leader-seleccionado").innerHTML = `<b>Nombre: </b>${nombreLeaderSeleccionado}`;
        document.getElementById("cedula-leader-seleccionado").innerHTML = `<b>Indent: </b>${identLeadeSeleccionado}`;
        document.getElementById("correo-leader-seleccionado").innerHTML = `<b>Email: </b>${emailLeadeSeleccionado}`;

        document.getElementById("info-lider").style.display = "flex";

    } 

    divTodosIntegrantes.innerHTML="";
    
    document.getElementById("contenedor-devs-lideres").style.display = "none";
    document.getElementById("contenedor-nuevo-proyecto").style.display = "flex";
    
}

function mostrarDevsSeleccionados() {

    let divConDevs = document.getElementById("grupo-desarrolladores");
    let divTodosIntegrantes = document.getElementById("div-todos-integrantes");


    if (listDevsSeleccionados.length != 0) {

        listDevsSeleccionados.forEach(idDev => {

            let divPintarDev = document.createElement("div");
    
            divPintarDev.id = `div-dev-${idDev}`;
            divPintarDev.classList.add("display-horizontal-between", "gap-3", "flex");
            divPintarDev.innerHTML = `<div class="display-horizontal-between gap-3 border-gradiente carta-dev"><img id="img" src="${jsonInfoDevsSeleccionados[idDev][3]}" alt="" class="img-integrante"><div class="p-2"><p class="texto-fuente-playwrite"><b>Nombre:</b> ${jsonInfoDevsSeleccionados[idDev][0]}</p><p class="texto-fuente-playwrite"><b>Ident: </b>${jsonInfoDevsSeleccionados[idDev][1]}</p><p class="texto-fuente-playwrite"><b>Email: </b>${jsonInfoDevsSeleccionados[idDev][2]}</p></div><button type="button" class="btn-close quitar-dev" aria-label="Close" onclick="quitarDev(${idDev}, 'div-dev-${idDev}')"></button></div` 
    
            divConDevs.appendChild(divPintarDev);
    
            
                
        })

    }

    divTodosIntegrantes.innerHTML="";
    document.getElementById("contenedor-devs-lideres").style.display = "none";
    document.getElementById("contenedor-nuevo-proyecto").style.display = "flex";

}

function quitarDev(idDev, idDevPintado) {

    document.getElementById(idDevPintado).remove();

    let indexIdDevEnLista = listDevsSeleccionados.indexOf(idDev);

    if (indexIdDevEnLista > -1) { 
            listDevsSeleccionados.splice(indexIdDevEnLista, 1); 
    }

    delete jsonInfoDevsSeleccionados[idDev];

    console.log(listDevsSeleccionados);
    console.log(jsonInfoDevsSeleccionados)

}

function agregarActividad() {

    let contenedorActividades = document.getElementById("div-todas-tareas");
    let numActividades = contenedorActividades.children.length;
    console.log("Cantidad Actividades " + numActividades);
    let divNuevaActividad = document.createElement("div");
    let parteFinalId = ++numActividades;
    divNuevaActividad.id = `actividad-${parteFinalId}`;
    
    console.log("El id de la nueva pregunta " +divNuevaActividad.id)
    divNuevaActividad.classList.add("display-horizontal-between", "gap-3", "nueva-tarea");
    divNuevaActividad.innerHTML = `<div class="display-vertical-around gap-2 nombre-descr info-proyecto"><input type="text" id="nombre-act-${parteFinalId}" class="nombre-actividad border-gradiente text-center texto-fuente-playwrite" placeholder="Nombre de la actividad"><textarea name="" id="descripcion-actividad-${parteFinalId}" class="descrpcion-actividad border-gradiente p-2 texto-fuente-playwrite" placeholder="Descripción de la actividad"></textarea></div><button type="button" class="btn-close quitar-dev" aria-label="Close" onclick="quitarActividad('actividad-${parteFinalId}')"></button>`;

    contenedorActividades.appendChild(divNuevaActividad);
    

}

function quitarActividad(idDiv) {
    

    let divAQuitar = document.getElementById(idDiv);
    divAQuitar.remove();

}

function confirmarCreacionProyecto () {
    let divTituloProyecto = document.getElementById("titulo-proyecto");
    let tituloProyecto = divTituloProyecto.value;
    
    let divDescripcionProyecto = document.getElementById("descripcion-proyecto"); 
    let descripcionProyecto = divDescripcionProyecto.value;

    const regex_name = /^[a-zA-Z\s]+$/; //Para comprobar nombres

    if(regex_name.test(tituloProyecto) == false) {

        divTituloProyecto.value = "Título no puede ser vacío";
        divTituloProyecto.style.color = "red";

        divTituloProyecto.addEventListener("click", () => {
            if(divTituloProyecto.style.color = "red") {
                divTituloProyecto.value = "";
                divTituloProyecto.style.color = "black";
            }
        }) 
    } else {
        if(descripcionProyecto.trim() == "") {

            divDescripcionProyecto.value = "No puede haber proyecto sin descripción";
            divDescripcionProyecto.style.color = "red";

        divDescripcionProyecto.addEventListener("click", () => {
            if(divDescripcionProyecto.style.color = "red") {
                divDescripcionProyecto.value = "";
                divDescripcionProyecto.style.color = "black";
            }
        }) 
        } else {
            if (idTechLeader == 0) {
                alert("El proyecto debe tener un Tech Leader")
            } else {
                let divTodasTareas =  document.getElementById("div-todas-tareas");
                if (divTodasTareas.children.length == 0) {

                    let apiCrearProyecto = "https://satisfied-rejoicing-production.up.railway.app/api/proyecto/crear";

                    let bodyCrearProyecto = {
                        "nombre": `${tituloProyecto}`,
                        "descripcion": `${descripcionProyecto}`,
                        "horasUsadas": "40", 
                        "fechaInicio": "2024-09-01",
                        "fechaFin": "2024-12-01",
                        "idLeader": `${idTechLeader}`,
                        "idEstado": 4
                    }

                    fetch(apiCrearProyecto, {
                        method : 'POST',
                        body : JSON.stringify(bodyCrearProyecto),
                        headers: {
                            'Content-type' : 'application/json; charset=UTF-8',
                            'Access-Control-Allow-Origin': '*',
                        }
                    })
                    .then(response => response.json())
                    .then(data => {

                        let idProyecto = data.id;
                        console.log(data);
                        console.log(jsonInfoDevsSeleccionados);
                        
                        // if (listaTodosDevs.length > 0) {

                        //     console.log(jsonInfoDevsSeleccionados[20][1]);

                        //     listDevsSeleccionados.forEach(id => {
                                
                        //         let bodyDevProyecto = {
                        //         "idProyecto": `${idProyecto}`,
                        //         "CedulaUsuario": `'${jsonInfoDevsSeleccionados[id][1]}'`
                        //       }

                        //       let apiDevProyecto = "https://satisfied-rejoicing-production.up.railway.app/api/proyecto/asignarProyectoAUsuario";

                        //       fetch(apiDevProyecto, {
                        //         method : 'POST',
                        //         body : JSON.stringify(bodyDevProyecto),
                        //         headers: {
                        //             'Content-type' : 'application/json; charset=UTF-8',
                        //             'Access-Control-Allow-Origin': '*',
                        //         }
                        //       })
                        //       .then(response => response.json())
                        //       .then(data => console.log(data))

                        //     })

                        // }

                    }) 


                    alert("Nuevo proyecto ingresado (Sin actividades)");

                } else {
                    let claseNombreActividad = document.getElementsByClassName("nombre-actividad");
                    console.log(claseNombreActividad);
                }
                
            }
        }
    }
}
