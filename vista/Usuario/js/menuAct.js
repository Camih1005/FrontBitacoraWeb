document.addEventListener('DOMContentLoaded', () => {
    fetch('/vista/Usuario/menuAct.html')
        .then(response => response.text())
        .then(data => document.body.innerHTML += data)
});
