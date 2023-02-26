"use strict";

//LOCAL INDEX VARIABLE
let current_index = 0;

//SAME ARRAY FROM ARRAY "ALL_BREEDS" IN DATA.JS BUT A SORTED VERSION, 50/50
const random_array = ALL_BREEDS.sort(() => Math.random() < 0.5 ? -1 : 1);

//DOG_QUIZ
async function get_random_dog_image() {
    overlay.classList.remove("hidden");
    feedback_dom.classList.remove("hidden");
    feedback_text.innerHTML = "Getting random image...";
    const button_dom = document.querySelector("div.feedback > button");
    button_dom.classList.add("hidden");

    current_index;
    console.log(current_index);

    //GET REQUEST TO SERVER DOG ZINE CEO
    const GET_image = new Request(`https://dog.ceo/api/breed/${random_array[current_index].url}/images/random`);
    const resource = await send_request(GET_image);
    console.log(resource);
    overlay.classList.add("hidden");
    feedback_dom.classList.add("hidden");

    //RESOURCE RETURNS AN OBJECT WITH KEY MESSAGE THAT CONTAINS URL TO DOG IMAGE
    const image_dom = document.querySelector("#dog_quiz > img");
    image_dom.setAttribute('src', resource.message)

    //RESET ALTERNATIVES 
    document.querySelector("#alternatives").innerHTML = "";

    //CREATE FOUR ALTERNATIVE ANSWERS WITH RANDOM DOG NAMES
    const random_index = get_random_index();
    for (let i = 0; i < 4; i++) {
        const alternative_answer = document.createElement("div");
        alternative_answer.classList.add("alternative");
        alternative_answer.id = "number" + i;
        document.querySelector("#alternatives").append(alternative_answer);
        alternative_answer.textContent = ALL_BREEDS[random_index[i]].name;

        alternative_answer.addEventListener("click", select_check_answer);
    }

    //RETURNS ARRAY WITH 4 RANDOM INDEXES FROM ARRAY
    function get_random_index() {
        let random_indexes = [];
        while (random_indexes.length < 4) {
            const random_index = Math.floor(Math.random() * ALL_BREEDS.length);
            //CHECKS IF RANDOM_INDEX IS CURRENT_INDEX OR ALREADY INCLUDED IN RANDOM_INDEXES
            if (random_index !== current_index && !random_indexes.includes(random_index)) {
                random_indexes.push(random_index);
            }
        }
        console.log(random_indexes);
        return random_indexes;
    }

    //SELECT RANDOM ALTERNATIVE DIV(N 0,1,2 OR 3) AND CHANGES TEXTCONTENT TO NAME CONNECTED TO DOG IMAGE
    const correct_alternative = document.querySelector(`#number${Math.floor(Math.random() * 4)}`);
    correct_alternative.textContent = ALL_BREEDS[current_index].name;
    //ADD CLASS "CORRECT"
    correct_alternative.classList.add("correct");
}

//CHECKS SELECTED EVENT TARGET 
function select_check_answer(e) {
    overlay.classList.remove("hidden");

    //CREATE FEEDBACK
    const wrong_right = document.createElement("div");
    wrong_right.classList.add("wrong_or_correct");
    wrong_right.innerHTML = `
        <p id="w_r">-</p>
        <button id="next_quiz">ONE MORE</button>
    `;
    document.querySelector("#wrapper").append(wrong_right);

    //CHECKS IF EVENT TARGET ELEMENT CONTAINS CLASS "CORRECT" OR NOT
    if (e.target.classList.contains("correct")) {
        console.log("yes");
        document.querySelector("#w_r").textContent = "CORRECT:)";
        document.querySelector(".wrong_or_correct").style.backgroundColor = "rgb(138, 164, 138)";
    } else {
        console.log("no");
        document.querySelector("#w_r").textContent = "WRONG:(";
        document.querySelector(".wrong_or_correct").style.backgroundColor = "rgb(228, 156, 156)";
    }

    //EVENT "CLICK" FOR BUTTON TO GET NEXT DOG IMAGE AND QUESTION
    document.querySelector(".wrong_or_correct > button").addEventListener("click", () => {
        overlay.classList.add("hidden");
        wrong_right.remove();
        current_index++
        get_random_dog_image();
    })
}

