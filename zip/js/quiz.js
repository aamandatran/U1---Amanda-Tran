"use strict";

let current_index = 0;
const random_array = ALL_BREEDS.sort(() => Math.random() < 0.5 ? -1 : 1);

async function get_random_dog_image() {
    overlay.classList.remove("hidden");
    feedback_dom.classList.remove("hidden");
    feedback_text.innerHTML = "Getting random image...";
    const button_dom = document.querySelector("div.feedback > button");
    button_dom.classList.add("hidden");

    current_index;
    console.log(current_index);

    const GET_image = new Request(`https://dog.ceo/api/breed/${random_array[current_index].url}/images/random`);
    const resource = await send_request(GET_image);
    console.log(resource);
    overlay.classList.add("hidden");
    feedback_dom.classList.add("hidden");

    const image_dom = document.querySelector("#dog_quiz > img");
    image_dom.setAttribute('src', resource.message)

    document.querySelector("#alternatives").innerHTML = "";

    const random_index = get_random_index();
    for (let i = 0; i < 4; i++) {
        const alternative_answer = document.createElement("div");
        alternative_answer.classList.add("alternative");
        alternative_answer.id = "number" + i;
        document.querySelector("#alternatives").append(alternative_answer);
        alternative_answer.textContent = ALL_BREEDS[random_index[i]].name;

        alternative_answer.addEventListener("click", select_check_answer);
    }

    function get_random_index() {
        let random_indexes = [];
        while (random_indexes.length < 4) {
            const random_index = Math.floor(Math.random() * ALL_BREEDS.length);
            if (random_index !== current_index && !random_indexes.includes(random_index)) {
                random_indexes.push(random_index);
            }
        }
        console.log(random_indexes);
        return random_indexes;
    }

    const correct_alternative = document.querySelector(`#number${Math.floor(Math.random() * 4)}`);
    correct_alternative.textContent = ALL_BREEDS[current_index].name;
    correct_alternative.classList.add("correct");
}


function select_check_answer(e) {
    overlay.classList.remove("hidden");
    const wrong_right = document.createElement("div");
    wrong_right.classList.add("wrong_or_correct");
    wrong_right.innerHTML = `
        <p id="w_r">-</p>
        <button id="next_quiz">ONE MORE</button>
    `;
    document.querySelector("#wrapper").append(wrong_right);

    if (e.target.classList.contains("correct")) {
        console.log("yes");
        document.querySelector("#w_r").textContent = "CORRECT:)";
        document.querySelector(".wrong_or_correct").style.backgroundColor = "rgb(138, 164, 138)";
    } else {
        console.log("no");
        document.querySelector("#w_r").textContent = "WRONG:(";
        document.querySelector(".wrong_or_correct").style.backgroundColor = "rgb(228, 156, 156)";
    }

    document.querySelector(".wrong_or_correct > button").addEventListener("click", () => {
        overlay.classList.add("hidden");
        wrong_right.remove();
        current_index++
        get_random_dog_image();
    })
}

