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

function actualizarLista() {
    const lista = document.getElementById("entries");
    lista.innerHTML = entradas.map(e => `• ${e}`).join("<br>");
}

function dibujarRuleta(anguloOffset = 0) {
    const canvas = document.getElementById("ruleta");
    const ctx = canvas.getContext("2d");
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radio = cx - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (entradas.length === 0) return;

    const colores = ["#5ebcb2", "#26474b", "#666", "#353535", "#2a2a2a"];
    const slice = (2 *Math.PI) / entradas.length;

    entradas.forEach((entrada, i) => {
        const inicio = i * slice + anguloOffset;
        const fin = inicio + slice; 

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radio, inicio, fin);
        ctx.closePath();
        ctx.fillStyle = colores[i % colores.length];
        ctx.fill();
        ctx.strokeStyle = "#121212";
        ctx.stroke();

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(inicio + slice / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "white";
        ctx.font = "bold 14px Trebuchet MS";
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