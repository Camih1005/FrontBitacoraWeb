



document.body.setAttribute("onload", "cargar()");
  

function cargar() {
    
    document.getElementById("menu-inicio").setAttribute("onclick", "irAHome()");
    
}

function irAHome() {
    location.href="/vista/Home/home.html";
}