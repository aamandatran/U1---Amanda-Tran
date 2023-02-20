//https://dog.ceo/api/breed/${ALL_BREEDS[i].url}/images/random

let current_index = 0;

async function get_random_dog_image() {
    const feedback_dom = document.querySelector("div.feedback");
    const overlay = document.querySelector("div.overlay");

    overlay.classList.remove("hidden");
    feedback_dom.classList.remove("hidden");
    document.querySelector(".feedback > p#feedback_text").innerHTML = "Getting random image...";

    current_index;
    console.log(current_index);

    const GET_image = new Request(`https://dog.ceo/api/breed/${ALL_BREEDS[current_index].url}/images/random`);
    const resource = await send_request(GET_image);
    console.log(resource);
    overlay.classList.add("hidden");
    feedback_dom.classList.add("hidden");

    const image_dom = document.querySelector("#quiz > img");
    image_dom.setAttribute('src', resource.message)

    document.querySelector("#alternatives").innerHTML = "";

    for (let i = 0; i < 4; i++) {
        const alternative_answer = document.createElement("div");
        alternative_answer.classList.add("alternative");
        alternative_answer.id = "number" + i;
        document.querySelector("#alternatives").append(alternative_answer);
        alternative_answer.textContent = ALL_BREEDS[get_random_index()[i]].name;
    }

    function get_random_index() {
        let random_indexes = [];
        while (random_indexes.length < 4) {
            const random_index = Math.floor(Math.random() * ALL_BREEDS.length);
            if (random_index !== current_index && !random_indexes.includes(random_index)) {
                random_indexes.push(random_index);
            }
        }
        return random_indexes;
    }

    const correct_alternative = document.querySelector(`#number${Math.floor(Math.random() * 4)}`);
    correct_alternative.textContent = ALL_BREEDS[current_index].name;
    correct_alternative.classList.add("correct");
}

