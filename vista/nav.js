fetch('/vista/nav.html')
.then(response => response.text())
.then(data => document.body.innerHTML += data);

document.getElementById("link-logout").setAttribute("href", "http://127.0.0.1:5501/index.html");
