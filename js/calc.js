const pantalla = document.getElementById("display");

function presionar(valor) {
    pantalla.value += valor;
}

function borrar() {
    pantalla.value = "";
}

function calcular() {
    if (pantalla.value = undefined) {
        pantalla.value = "Error";
        setTimeout(borrar, 1500);
    }
    try {
        pantalla.value = eval(pantalla.value);
    } catch (error) {
        pantalla.value = "Error";
        setTimeout(borrar, 1500);
    }
}