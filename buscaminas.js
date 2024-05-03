import { Juego } from "./Juego.js";

let loginformulario;
let usuario;
let contraseña;
let nacimiento;
let correo;
let nickname;
let fila;
let columna;
let minas;

export function init(){
    window.addEventListener("message", function(event) {
        if (event.data === document.cookie) {
            loginformulario = document.cookie;
            initjuego();
        }
    });
    
    document.getElementById("loginButton").addEventListener("click", function() {
        window.open("pagina_de_inicio_de_sesion.html","InicioSesion","width=500, height=500");
    });
    
    loginformulario = document.cookie;
    if (loginformulario){
        initjuego();
    }
    else{
        window.open("pagina_de_inicio_de_sesion.html","InicioSesion","width=500, height=500");
    }
}


function initjuego(){
    let cookiearray = loginformulario.split(";");
    let arrayinfo = cookiearray.map(function(cookie){
        return cookie.split("=");
    });
    asignarValores(arrayinfo);
    console.log(arrayinfo); 
    const juego = new Juego();
    juego.initJuego(fila, columna, minas);
}

function asignarValores(arrayinfo){
    for(let i = 0; i < arrayinfo.length; i++){
        if(arrayinfo[i][0].trimLeft() == "usuario"){
            usuario = arrayinfo[i][1];
        }
        if(arrayinfo[i][0].trimLeft()  == "contraseña"){
            contraseña = arrayinfo[i][1];
        }
        if(arrayinfo[i][0].trimLeft()  == "nacimiento"){
            nacimiento = arrayinfo[i][1];
        }
        if(arrayinfo[i][0].trimLeft()  == "correo"){
            correo = arrayinfo[i][1];
        }
        if(arrayinfo[i][0].trimLeft()  == "nickname"){
            nickname = arrayinfo[i][1];
        }
        if(arrayinfo[i][0].trimLeft()  == "filas"){
            fila = arrayinfo[i][1];
        }
        if(arrayinfo[i][0].trimLeft()  == "columnas"){
            columna = arrayinfo[i][1];
        }
        if(arrayinfo[i][0].trimLeft()  == "minas"){
            minas = arrayinfo[i][1];
        }
    }
}