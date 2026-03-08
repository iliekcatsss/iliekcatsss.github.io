const pantalla = document.getElementById("display");

function presionar(valor) {
    pantalla.value += valor;
}

function borrar() {
    pantalla.value = "";
}

function calcular() {
    try {
        pantalla.value = eval(pantalla.value);
    } catch (error) {
        pantalla.value = "Error";
        setTimeout(borrar, 1500);
    }
}