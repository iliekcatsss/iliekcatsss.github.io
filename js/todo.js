// cargar
let notas = JSON.parse(localStorage.getItem("notas")) || [];
notas.forEach(nota => renderizarNota(nota));

function guardarNotas() {
    localStorage.setItem("notas", JSON.stringify(notas));
}

function renderizarNota(contenido) {
    const nota_div = document.createElement("div");
    nota_div.classList.add("nota");

    const titulo = document.createElement("titulo");
    titulo.classList.add("titulo");
    titulo.textContent = contenido.titulo;

    const texto = document.createElement("span");
    texto.textContent = contenido.cuerpo;

    const menuBtn = document.createElement("button");
    menuBtn.textContent = "⋮";
    menuBtn.classList.add("menu-btn");

    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown1");
    
    const borrar = document.createElement("div");
    borrar.textContent = "Eliminar";
    borrar.classList.add("dropdown1-item", "eliminar");
    borrar.onclick = () => {
        nota_div.remove();
        notas = notas .filter(n => n.id !== contenido.id);
        guardarNotas();
    };

    const editar = document.createElement("div");
    editar.textContent = "Editar";
    editar.classList.add("dropdown1-item", "editar");
    editar.onclick = () => {
        const inputTitulo = document.createElement("input");
        inputTitulo.value = contenido.titulo;

        const inputCuerpo = document.createElement("textarea");
        inputCuerpo.value = contenido.cuerpo;

        titulo.replaceWith(inputTitulo);
        texto.replaceWith(inputCuerpo);

        inputTitulo.focus();

        function guardarEdicion () {
            setTimeout(() => {
                if (document.activeElement === inputTitulo || document.activeElement === inputCuerpo) {
                    return;
                }
                if (inputTitulo.value === "" || inputCuerpo.value === "") {
                    alert("No puedes dejar una nota en blanco");
                    return;
                }
                contenido.titulo = inputTitulo.value;
                contenido.cuerpo = inputCuerpo.value;
                
                titulo.textContent = contenido.titulo;
                texto.textContent = contenido.cuerpo;
                
                inputTitulo.replaceWith(titulo);
                inputCuerpo.replaceWith(texto);
                
                guardarNotas();
            }, 100);
        }

        inputTitulo.onblur = guardarEdicion;
        inputCuerpo.onblur = guardarEdicion;
    }

    dropdown.appendChild(editar);
    dropdown.appendChild(borrar);

    menuBtn.onclick = (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("show");
    };

    nota_div.appendChild(titulo);
    nota_div.appendChild(texto);
    nota_div.appendChild(menuBtn);
    nota_div.appendChild(dropdown);

    const placeholder = document.getElementById("div1");
    placeholder.parentNode.insertBefore(nota_div, placeholder);
}

function crearNota() {
    let contenido = {
        id: Date.now(),
        titulo: document.getElementById("notaTitulo").value,
        cuerpo: document.getElementById("notaContenido").value,
    }

    if (contenido.titulo.trim() === "" && contenido.cuerpo.trim() ==="") {
        alert("Introduce el título y el contenido");
        return;
    } else if (contenido.titulo.trim() === "") {
        alert("No puedes dejar el título en blanco");
        return;
    } else if (contenido.cuerpo.trim() === "") {
        alert("No puedes dejar el contenido en blanco")
        return;
    }

    notas.push(contenido);
    guardarNotas();
    renderizarNota(contenido);

    document.getElementById("notaContenido").value = "";
    document.getElementById("notaTitulo").value = "";
}

document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("show"));
});