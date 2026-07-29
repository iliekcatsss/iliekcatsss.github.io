// Sliders
let input = document.querySelectorAll('.slidecontainer input');
let result = document.querySelectorAll('.slidecontainer span');

input.forEach(function(input_current, index) {
    result[index].innerHTML = input_current.value;
    input_current.oninput = function () {
        result[index].innerHTML = this.value;
    }
});

// Generar
const res = document.getElementById('result');

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function generate() {
    let charactersMax = parseInt(document.getElementById('characters').value);

    let allChars = characters + numbers + symbols;

    let pas = "";
    for (let i = 0; i < charactersMax; i++) {
        pas += allChars[Math.floor(Math.random() * allChars.length)];
    }

    let pasSafe = pas
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");

    let text = `Tu contraseña es: <strong>${pasSafe}</strong>`;

    if (charactersMax < 12) text += `<br><br><strong><u>${charactersMax} es muy corto para una contraseña, se recomiendan 12 caracteres o más</u></strong>`

    res.innerHTML = text;
}