fetch('/vista/Componentes/html/menu.html')
.then(response => response.text())
.then(data => {
        document.body.innerHTML += data;

        document.getElementById("menu-inicio").setAttribute("onclick", "irAHome()");
        document.getElementById("menu-proyectos").setAttribute("onclick", "irAProyectos()");
        document.getElementById("menu-team").setAttribute("onclick", "irAUsuarios()");
        document.getElementById("menu-actividades").setAttribute("onclick", "irAActividades()");
        document.getElementById("menu-estadisticas").setAttribute("onclick", "irAEstadisticas()");
        
        fetch('/vista/Home/divsRol.js')
        .then(response => response.text())
        .then(data => {
            let pintarDivsScript = document.createElement("script");
            pintarDivsScript.innerHTML= data;
            document.body.appendChild(pintarDivsScript);
        })

    }
);