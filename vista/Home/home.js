rol = "dev";
document.body.setAttribute("onload", "mostrarHome()");

function mostrarHome() {
    if (rol === "dev") {
        let divDev = document.getElementsByClassName("project-lider")
        //divDev.remove();
        for (let i=0; i < divDev.length; i++) {
            let divHijo = document.getElementById(divDev.item(i).id);
            divHijo.style.display = "none";
            
        }
    } else {
        divDev = document.getElementsByClassName("dev")
        //divDev.remove();
        for (let j=0; j < divDev.length; j++) {
            let divHijo = document.getElementById(divDev.item(j).id);
            divHijo.style.display = "none";
            
        }
    }
}