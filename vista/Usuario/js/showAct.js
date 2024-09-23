document.addEventListener('DOMContentLoaded', () => {
    fetch('/vista/Usuario/showAct.html')
        .then(response => response.text())
        .then(data => document.body.innerHTML += data)
});

