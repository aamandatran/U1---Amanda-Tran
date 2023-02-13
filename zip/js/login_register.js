"use strict";

function login_register() {
    const login = document.querySelector("#login");
    const register = document.querySelector("#register");

    document.querySelector("#portal_register").addEventListener("click", e => {
        login.classList.add("hidden");
        register.classList.remove("hidden");
        document.getElementById("wrapper").style.backgroundColor = "rgb(110, 134, 110)";
    });

    document.querySelector("#portal_login").addEventListener("click", e => {
        register.classList.add("hidden");
        login.classList.remove("hidden");
        document.getElementById("wrapper").style.backgroundColor = "rgb(154, 182, 154)";
    });
}




