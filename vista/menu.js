fetch('/vista/menu.html')
.then(response => response.text())
.then(data => {
        document.body.innerHTML += data;
        document.body.setAttribute("onload", "cargar()");

    }
);