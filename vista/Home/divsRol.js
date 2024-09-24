function mostrarDivsPorRol() {
    
    if (usuario.rol === "Desarrollador") {
        
        let divDev = document.getElementsByClassName("project-lider")
        for (let i=0; i < divDev.length; i++) {
            console.log(divDev.length);
            let divHijo = document.getElementById(divDev.item(i).id);
            divHijo.style.display = "none";
            
        }
    } else {
        divDev = document.getElementsByClassName("dev")
        
        for (let j=0; j < divDev.length; j++) {
            console.log(divDev.length);
            let divHijo = document.getElementById(divDev.item(j).id);
            divHijo.style.display = "none";
            
        }
    }
}

mostrarDivsPorRol();


