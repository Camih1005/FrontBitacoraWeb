// const usernameInput = document.getElementById('username-input');
// const passwordInput = document.getElementById('password-input');
const botonIngresar = document.getElementById('enter-button');
botonIngresar.setAttribute("onclick", "autenticarUser()");
let username;
let password;
const adminRole = false;
let verifiedMessage;
let registeredMessage;
let viewUrl;

// usernameInput.addEventListener('keyup', function (event) {
//     username = usernameInput.value;
//     password = passwordInput.value;

//     let jsonUserInfo = {
//         "username" : `${username}`,
//         "password" : `${password}`
//     }
//     query = "https://satisfied-rejoicing-production.up.railway.app/auth/login"
    
//     fetch (query, {
//         method: 'POST',
//         body: JSON.stringify(jsonUserInfo),
//         headers: {
//             'Content-type' : 'application/json; charset=UTF-8'
//         },
//         })
//         .then(response => response.json())
//         .then(json => {
//             verifiedMessage = json;
//         })
//         .catch(error => console.error("ERROR!!!:" + error))


// })

// passwordInput.addEventListener('keyup', function (event) {
//     username = usernameInput.value;
//     password = passwordInput.value;

//     let jsonUserInfo = {
//         "username" : `${username}`,
//         "password" : `${password}`
//     }
//     query = "https://satisfied-rejoicing-production.up.railway.app/auth/login"
    
//     fetch (query, {
//         method: 'POST',
//         body: JSON.stringify(jsonUserInfo),
//         headers: {
//             'Content-type' : 'application/json; charset=UTF-8'
//         },
//         })
//         .then(response => response.json())
//         .then(json => {
//             verifiedMessage = json;
//         })
//         .catch(error => console.error("ERROR!!!:" + error))

// })


function autenticarUser() {

    let usernameInput = document.getElementById('username-input');
    let passwordInput = document.getElementById('password-input');
    
    username = usernameInput.value;
    password = passwordInput.value;

    let jsonUserInfo = {
        "username" : `${username}`,
        "password" : `${password}`
    }
    console.log("Info que envío" + JSON.stringify(jsonUserInfo));
    query = "https://satisfied-rejoicing-production.up.railway.app/auth/login"
    
    fetch (query, {
        method: 'POST',
        body: JSON.stringify(jsonUserInfo),
        headers: {
            'Content-type' : 'application/json; charset=UTF-8'
        },
        })
        .then(response => response.json())
        .then(json => {
            if (json.status == undefined) {
                if(json.token.length > 100) {
                    localStorage.setItem("token", json.token);
                    localStorage.setItem("nombre", json.nombre);
                    localStorage.setItem("rol", json.rol);
                    localStorage.setItem("foto", json.foto);
                    localStorage.setItem("cedula", json.cedula);
                    location.href = "/vista/Home/home.html"; 

                }
            } else if (json.status == 403) {

                alert("Información incorrecta!");
            }
            
            
        })
        .catch(error => console.error("ERROR!!!:" + error))

}


// 