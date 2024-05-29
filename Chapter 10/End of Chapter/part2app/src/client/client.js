//import { Counter } from "./counter_custom";
import * as Counter from "@templates/counter_client.handlebars";

const context = {
    counter: 0
}

const actions = {
    incrementCounter: () => {
        context.counter++; render();
    }
}

const render = () => {
    document.getElementById("target").innerHTML = Counter(context);
}

document.addEventListener('DOMContentLoaded', () => {
    document.onclick = (ev) => {
        const action = ev.target.getAttribute("action")
        if (action && actions[action]) {
            actions[action]()
        }
    }
    render();
});
