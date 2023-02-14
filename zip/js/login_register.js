"use strict";

function login_register() {
    const login = document.querySelector("#login");
    const register = document.querySelector("#register");

    document.querySelector("#portal_register").addEventListener("click", e => {
        login.classList.add("hidden");
        register.classList.remove("hidden");
        document.getElementById("wrapper").style.backgroundColor = "rgb(110, 134, 110)";
        document.querySelector("#input_field_register > input[name='username']").value = "";
        document.querySelector("#input_field_register > input[name='password']").value = "";
        const wrong_message = document.querySelector("div #wrong");
        wrong_message.classList.add("hidden");
    });

    document.querySelector("#portal_login").addEventListener("click", e => {
        register.classList.add("hidden");
        login.classList.remove("hidden");
        document.getElementById("wrapper").style.backgroundColor = "rgb(154, 182, 154)";
        document.querySelector("#input_field_login > input[name='username']").value = "";
        document.querySelector("#input_field_login > input[name='password']").value = "";
    });

    document.querySelector("button.register").addEventListener("click", e => {
        console.log(e);
        register_user();
    });

    document.querySelector("button.login").addEventListener("click", e => {
        console.log(e);
        const wrong_message = document.querySelector("div #wrong");
        wrong_message.classList.add("hidden");
        login_user();
    });
}


async function register_user() {
    /*
    när den här event funktionen anropas så ska vi ta input values och skicka en POST-förfrågan
    "Contacting server..."" ska skickas som feedback
    när servern har registrerat användaren (status 200)så ska feedback vara "Registration Complete. Please proceed to login."" och det ska finnas en CLOSE knapp som stänger feedback fönstret
    OBS om användarnamnet är taget så ska feedback ange "Sorry, that name is taken. Please try another one." response status är då 409
    */

    document.querySelector("button.register").setAttribute("disabled", true);

    const feedback_dom = document.querySelector("div.feedback");
    feedback_dom.classList.remove("hidden");

    const overlay = document.querySelector("div.overlay");
    overlay.classList.remove("hidden");

    const username_value = document.querySelector("#input_field_register > input[name='username']").value;
    console.log(username_value);
    const password_value = document.querySelector("#input_field_register > input[name='password']").value;

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
    if (resource === undefined) {
        console.log(resource);
    } else {
        connecting_feedback(200);
    }
}

async function login_user() {
    document.querySelector("button.register").setAttribute("disabled", true);
    const feedback_dom = document.querySelector("div.feedback");
    feedback_dom.classList.remove("hidden");

    const overlay = document.querySelector("div.overlay");
    overlay.classList.remove("hidden");

    const username_value = document.querySelector("#input_field_login > input[name='username']").value;
    console.log(username_value);
    const password_value = document.querySelector("#input_field_login > input[name='password']").value;

    const GET_rqst = new Request(prefix + `?action=check_credentials&user_name=${username_value}&password=${password_value}`);

    const resource = await send_request(GET_rqst);
    console.log(resource);

}