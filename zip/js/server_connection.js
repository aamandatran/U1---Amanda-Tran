"use strict";

async function send_request(GET_or_POST) {
    const response = await fetch(GET_or_POST);
    console.log(response);

    let _resource;

    if (!response.ok) {
        connecting_feedback(response.status);
    } else {
        const resource = await response.json();
        console.log(resource);
        _resource = resource;
    }

    return _resource;

}

function connecting_feedback(status) {
    const feedback_dom = document.querySelector("div.feedback");
    const overlay = document.querySelector("div.overlay");

    if (status === 404) {
        const wrong_message = document.querySelector("div #wrong");
        wrong_message.classList.remove("hidden");
        feedback_dom.classList.add("hidden");
        overlay.classList.add("hidden");
        document.querySelector("button.login").removeAttribute("disabled");

    } else {
        console.log(status);
        let message = "";
        switch (status) {
            case 200:
                message = `Registration Complete. <br> Please proceed to login.`;
                break;
            case 409:
                message = `Sorry, that name is taken. <br> Please try with another one.`;
                break;
            case 418:
                message = "The server thinks it's not a teapot!";
                break;
            case 400:
                message = "User name or password is missing. Please try again.";

        }

        document.querySelector(".feedback > p#feedback_text").innerHTML = message;
        const button_dom = document.querySelector("div.feedback > button");
        button_dom.classList.remove("hidden");
        feedback_dom.style.padding = "12vh 0";
        console.log(message);
        document.querySelector(".feedback > button").addEventListener("click", e => {
            console.log(e);
            feedback_dom.classList.add("hidden");
            feedback_dom.style.padding = "5vh 0";
            button_dom.classList.add("hidden");
            overlay.classList.add("hidden");
            document.querySelector(".feedback > p#feedback_text").innerHTML = "Connecting Server...";
            document.querySelector("button.register").removeAttribute("disabled");
            document.querySelector("button.login").removeAttribute("disabled");
        });
    }


}

