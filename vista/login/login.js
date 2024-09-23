const usernameInput = document.getElementById('username-input');
const passwordInput = document.getElementById('password-input');
const enterInput = document.getElementById('enter-button');
const registerInput = document.getElementById('register-button');
enterInput.setAttribute("onclick", "authenticateUser()");
registerInput.setAttribute("onclick", "registerUser()");
let username;
let password;
const adminRole = false;
let verifiedMessage;
let registeredMessage;
let viewUrl;

usernameInput.addEventListener('keyup', function (event) {
    username = usernameInput.value;
    password = passwordInput.value;

    let jsonUserInfo = {
        "username" : `${username}`,
        "password" : `${password}`
    }
    query = "http://localhost:8090/api/users/verify"
    
    fetch (query, {
        method: 'POST',
        body: JSON.stringify(jsonUserInfo),
        headers: {
            'Content-type' : 'application/json; charset=UTF-8'
        },
        })
        .then(response => response.text())
        .then(json => {
            verifiedMessage = json;
        })
        .catch(error => console.error("ERROR!!!:" + error))


})

passwordInput.addEventListener('keyup', function (event) {
    username = usernameInput.value;
    password = passwordInput.value;

    let jsonUserInfo = {
        "username" : `${username}`,
        "password" : `${password}`
    }
    query = "http://localhost:8090/api/users/verify"
    
    fetch (query, {
        method: 'POST',
        body: JSON.stringify(jsonUserInfo),
        headers: {
            'Content-type' : 'application/json; charset=UTF-8'
        },
        })
        .then(response => response.text())
        .then(json => {
            verifiedMessage = json;
        })
        .catch(error => console.error("ERROR!!!:" + error))

})


function authenticateUser() {
    
    if (verifiedMessage === "Usuario NO registrado") {

        alert(verifiedMessage);
        usernameInput.value = "";
        passwordInput.value = "";

    } else if (verifiedMessage === "Contraseña incorrecta") {
        
        alert(verifiedMessage);
        passwordInput.value = "";

    } else if (verifiedMessage=== "Admin") {
        location.href = "http://localhost:8090/admin";

    } else if (verifiedMessage=== "User") {
        location.href = "http://localhost:8090/user";
    } 

}


function registerUser() {

    username = usernameInput.value;
    password = passwordInput.value;

    if (username === "" || password === "") {

        alert("No puede haber información de registro vacía!!");

    } else if (username.length >12) {

        alert("El nombre nombre de usuario excede la cantidad máxima de caracteres permitidos (12)");
        usernameInput.value = "";
    
    }else {

        let jsonUserInfo = {
            "username" : `${username}`,
            "password" : `${password}`,
            "admin" : false
        }
        query = "http://localhost:8090/api/users/login"
        
        fetch (query, {
            method: 'POST',
            body: JSON.stringify(jsonUserInfo),
            headers: {
                'Content-type' : 'application/json; charset=UTF-8'
            },
            })
            .then(response => response.text())
            .then(json => {

                registeredMessage = json;

                if (registeredMessage === "true") {

                    alert("Registro Exitoso. Puedes ingresar!!");
                    usernameInput.value = "";
                    passwordInput.value = "";

                } else {

                    alert("Ya hay un registro con este nombre de usuario!!");
                    usernameInput.value = "";
                    passwordInput.value = "";

                }
    
            })
            .catch(error => console.error("ERROR!!!:" + error))

    }


}
