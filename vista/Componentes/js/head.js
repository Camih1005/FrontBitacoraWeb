fetch('/vista/Componentes/html/head.html')
.then(response => response.text())
.then(data => document.head.innerHTML += data);