let entradas = [];

function addEntry() {
    const input = document.querySelector("input");
    const valor = input.value.trim();

    if (valor === "") return;

    entradas.push(valor);
    input.value = "";
    dibujarRuleta();
    actualizarLista();
}

function borrarEntrada(i) {
    console.log(`Se borró la entrada ${i}`);
    entradas.splice(i, 1);
    actualizarLista();
    dibujarRuleta();
}

function actualizarLista() {
    const lista = document.getElementById("entries");
    // lista.innerHTML = entradas.map(e => `• ${e}`).join("<br>");
    lista.innerHTML = entradas.map((e, i) =>
        `• ${e} <span onclick="borrarEntrada(${i})" style="cursor:pointer; color: #ff4d4d;">✕</span>`
    ).join("<br>");
}

function ajustarCanvas() {
    const canvas = document.getElementById("ruleta");
    const card = canvas.parentElement;
    const size = Math.min(card.clientWidth - 50, 400);
    canvas.width = size;
    canvas.height = size;
    dibujarRuleta();
}

window.addEventListener("resize", ajustarCanvas);
ajustarCanvas(); // al cargar

function barajar(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function dibujarRuleta(anguloOffset = 0) {
    const canvas = document.getElementById("ruleta");
    const ctx = canvas.getContext("2d");
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radio = cx - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (entradas.length === 0) return;

    const coloresBase = ["#3369e8","#d50f25","#eeb211","#009925"];
    const coloresAsignados = entradas.map((_, i) => coloresBase[i % coloresBase.length]);
    const slice = (2 *Math.PI) / entradas.length;

    entradas.forEach((entrada, i) => {
        const inicio = i * slice + anguloOffset;
        const fin = inicio + slice;
        const fontSize = Math.max(8, 16 - entradas.length * 0.5);
        
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radio, inicio, fin);
        ctx.closePath();
        ctx.fillStyle = coloresAsignados[i % coloresBase.length];
        ctx.fill();
        // vv Borde vv
        // ctx.strokeStyle = "#121212";
        // ctx.stroke();
        
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(inicio + slice / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "white";
        ctx.font = `bold ${fontSize}px Trebuchet MS`;
        ctx.fillText(entrada, radio - 10, 5);
        ctx.restore();
    });
        
    ctx.beginPath();
    ctx.moveTo(cx + radio - 10, cy);
    ctx.lineTo(cx + radio + 10, cy - 10);
    ctx.lineTo(cx + radio + 10, cy + 10);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
}

function girar() {
    if (entradas.length === 0) return;

    const btn = document.getElementById("btnGirar");
    const btnAdd = document.getElementById("btnAdd");
    btn.disabled = true;
    btnAdd.disabled = true;

    const duracion = 4000;
    const inicio = performance.now();
    const vueltasExtra = (Math.random() * 3 + 3) * 2 * Math.PI;
    const anguloFinal = Math.random() * 2 * Math.PI;
    let anguloActual = 0;

    function animar(ahora) {
        const transcurrido = ahora - inicio;
        const progreso = Math.min(transcurrido / duracion, 1);

        const eased = 1 - Math.pow(1 - progreso, 3);
        anguloActual = (vueltasExtra + anguloFinal) * eased;

        dibujarRuleta(anguloActual);

        if (progreso < 1) {
            requestAnimationFrame(animar);
        } else {
            btn.disabled = false;
            btnAdd.disabled = false;
            mostrarGanador(anguloActual);
        }
    }
    requestAnimationFrame(animar);
}

function mostrarGanador(angulo) {
    const slice = (2 * Math.PI) / entradas.length;
    const anguloNorm = (((-angulo) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const indice = Math.floor(anguloNorm / slice) % entradas.length;

    document.getElementById("entries").innerHTML =
    `🎉 <strong>${entradas[indice]}</strong><br><br>` +
    entradas.map(e => `• ${e}`).join("<br>");
}