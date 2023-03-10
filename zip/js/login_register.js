"use strict";

const login_and_register_main = document.getElementById("login_and_register");
const dog_quiz_section = document.getElementById("dog_quiz");
const logout_nav = document.getElementById("logout_dom");

const login = document.querySelector("#login");
const register = document.querySelector("#register");

//STICKY LOGIN SOLUTION
if (localStorage.getItem('display_dog_quiz_refresh') === 'true') {
    login_and_register_main.classList.add("hidden");
    dog_quiz_section.classList.remove("hidden");
    logout_nav.classList.remove("hidden");
}

//STORE USERNAME WHEN RELOAD AND GET NEW RANDOM DOG IMAGE
document.addEventListener("DOMContentLoaded", () => {
    const display_username = document.querySelector('.username_display');
    const stored_username = localStorage.getItem('username');
    if (stored_username) {
        display_username.textContent = stored_username;
    }

    if (localStorage.getItem('display_dog_quiz_refresh') === 'true') {
        get_random_dog_image()
        const stored_background_color = localStorage.getItem('background_color');
        document.getElementById("wrapper").style.backgroundColor = stored_background_color;
    }
})

//PORTAL TO REGISTER
document.querySelector("#portal_register").addEventListener("click", () => {
    login.classList.add("hidden");
    register.classList.remove("hidden");
    document.getElementById("wrapper").style.backgroundColor = "rgb(163, 150, 175)";
    document.querySelector("#input_field_register > input[name='username']").value = "";
    document.querySelector("#input_field_register > input[name='password']").value = "";
    wrong_message.classList.add("hidden");
})

//PORTAL TO LOGIN
document.querySelector("#portal_login").addEventListener("click", () => {
    register.classList.add("hidden");
    login.classList.remove("hidden");
    document.getElementById("wrapper").style.backgroundColor = "rgb(204, 189, 219)";
    document.querySelector("#input_field_login > input[name='username']").value = "";
    document.querySelector("#input_field_login > input[name='password']").value = "";
})

//EVENT "CLICK" TO LOGIN AND REGISTER BUTTON
document.querySelector("button.register").addEventListener("click", () => {
    register_user();
})
document.querySelector("button.login").addEventListener("click", () => {
    localStorage.setItem('display_dog_quiz_refresh', 'true');
    login_user();
    wrong_message.classList.add("hidden");
})

//REGISTER
async function register_user() {
    feedback_text.innerHTML = "Connecting Server...";
    feedback_dom.classList.remove("hidden");
    const button_dom = document.querySelector("div.feedback > button");
    button_dom.classList.add("hidden");

    overlay.classList.remove("hidden");

    const username_value = document.querySelector("#input_field_register > input[name='username']").value;
    const password_value = document.querySelector("#input_field_register > input[name='password']").value;

    //POST REQUEST TO SERVER
    const POST_rqst = new Request(prefix, {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            action: "register",
            user_name: username_value,
            password: password_value,
        }),
    })

    const resource = await send_request(POST_rqst);
    if (resource.data !== "true") {
        console.log(resource);
    }
}

//EVENT "CLICK" FOR BUTTON LOGOUT
document.querySelector("button.logout").addEventListener("click", () => {
    localStorage.setItem('display_dog_quiz_refresh', 'false');
    login_and_register_main.classList.remove("hidden");
    dog_quiz_section.classList.add("hidden");
    logout_nav.classList.add("hidden");
    document.getElementById("wrapper").style.backgroundColor = "rgb(204, 189, 219)";
})

//LOGIN
async function login_user() {
    feedback_text.innerHTML = "Connecting Server...";
    feedback_dom.classList.remove("hidden");
    const button_dom = document.querySelector("div.feedback > button");
    button_dom.classList.add("hidden");

    const overlay = document.querySelector("div.overlay");
    overlay.classList.remove("hidden");

    const username_value = document.querySelector("#input_field_login > input[name='username']").value;
    console.log(username_value);
    const password_value = document.querySelector("#input_field_login > input[name='password']").value;

    //GET REQUEST TO SERVER
    const GET_rqst = new Request(prefix + `?action=check_credentials&user_name=${username_value}&password=${password_value}`);
    const resource = await send_request(GET_rqst);
    console.log(resource);

    //CHECK RESOURCE
    if (resource.data === null) {
        console.log(resource);
    } else {
        login_and_register_main.classList.add("hidden");
        dog_quiz_section.classList.remove("hidden");
        logout_nav.classList.remove("hidden");
        overlay.classList.add("hidden");
        feedback_dom.classList.add("hidden");
        const background_color = document.getElementById("wrapper").style.backgroundColor = "rgb(175, 157, 194)";
        localStorage.setItem('background_color', background_color);

        document.querySelector("#input_field_login > input[name='password']").value = "";
        document.querySelector("#input_field_login > input[name='username']").value = "";

        //STORE USERNAME IN LOCALSTORAGE
        const display_username = document.querySelector(".username_display");
        display_username.textContent = username_value;
        localStorage.setItem('username', username_value);
        get_random_dog_image()
    }
}