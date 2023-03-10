"use strict";

const overlay = document.querySelector("div.overlay");
const feedback_dom = document.querySelector("div.feedback");
const feedback_text = document.querySelector(".feedback > p#feedback_text");
const wrong_message = document.querySelector("div #wrong");

//FETCH
async function send_request(GET_or_POST) {
    const response = await fetch(GET_or_POST);
    console.log(response);

    feedback(response.status);

    const resource = await response.json();
    return resource;
}

//RETURNS FEEDBACK DEPENDING ON STATUS
function feedback(status) {
    console.log(status);

    //404 = NOT FOUND, SHOW DIV #WRONG FOR WRONG UN AND PW
    if (status === 404) {
        wrong_message.classList.remove("hidden");
        feedback_dom.classList.add("hidden");
        overlay.classList.add("hidden");
    } else {
        //DIFFERENT MESSAGE DEPENDING ON STATUS
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

        feedback_text.innerHTML = message;
        const button_dom = document.querySelector("div.feedback > button");
        button_dom.classList.remove("hidden");
        feedback_dom.style.padding = "12vh 0";

        //EVENT "CLICK" TO HIDE FEEDBACK
        button_dom.addEventListener("click", () => {
            feedback_dom.classList.add("hidden");
            feedback_dom.style.padding = "5vh 0";
            button_dom.classList.add("hidden");
            overlay.classList.add("hidden");
            feedback_text.innerHTML = "Connecting Server...";
        });
    }
}

