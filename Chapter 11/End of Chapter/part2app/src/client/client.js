import { validate } from "./client_validation";

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("age_form").onsubmit = (ev => {
        const data = new FormData(ev.target);

        const nameValid = validate("name", data)
            .required()
            .minLength(5);

        const ageValid = validate("age", data)
            .isInteger();

        const allValid = [nameValid, ageValid].flatMap(v_result =>
            Object.entries(v_result.results).map(([test, valid]) => {
                const e = document.getElementById(
                        `err_${v_result.propertyName}_${test}`);
                e.classList.add("bg-dark-subtle");
                e.style.display = valid ? "none" : "block";                       
                return valid
            })).every(v => v === true);

        if (!allValid) {
            ev.preventDefault();
        } 
    });
});
