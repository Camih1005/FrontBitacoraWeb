fetch('/vista/menu.html')
.then(response => response.text())
.then(data => {
        document.body.innerHTML += data;
        document.getElementById("menu-inicio").setAttribute("onclick", "irAHome()");
        
        fetch('/vista/Home/divsRol.js')
        .then(response => response.text())
        .then(data => {
            let pintarDivsScript = document.createElement("script");
            pintarDivsScript.innerHTML= data;
            document.body.appendChild(pintarDivsScript);
        })

    }
);