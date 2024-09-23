
document.body.setAttribute("onload", "cargarProyectos()")

function cargarProyectos() {
    console.log("Hola")
    document.getElementById("menu-inicio").setAttribute("onclick", "irAHome()");
    
}

function irAHome() {
    location.href="/vista/Home/home.html"
}