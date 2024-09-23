fetch('/vista/footer.html')
.then(response => response.text())
.then(data => document.body.innerHTML += data);