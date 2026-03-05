function crearNota() {
    // let contenido = document.getElementById("notaContenido").value;
    let contenido = {
        titulo: document.getElementById("notaTitulo").value,
        cuerpo: document.getElementById("notaContenido").value,
    }

    if (contenido.titulo.trim() === "" && contenido.cuerpo.trim() === "") {
         alert("Introduce el título y el contenido")
         return;
    } else if (contenido.titulo.trim() === "") {
        alert("No puedes dejar el título en blanco");
        return;
    } else if (contenido.cuerpo.trim() === "") {
        alert("No puedes dejar el contenido en blanco");
        return;
    }
    
    // contenedor de la nota
    const nota = document.createElement("div");
    nota.classList.add("nota");

    // titulo
    const titulo = document.createElement("titulo");
    titulo.textContent = contenido.titulo;

    // texto
    const texto = document.createElement("span");
    texto.textContent = contenido.cuerpo;

    // botón
    const menuBtn = document .createElement("button");
    menuBtn.textContent = "⋮";
    menuBtn.classList.add("menu-btn");

    // dropdown
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");

    const borrar = document.createElement("div");
    borrar.textContent = "Eliminar";
    borrar.classList.add("dropdown-item");
    borrar.onclick = () => nota.remove();

    dropdown.appendChild(borrar);

    menuBtn.onclick = (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("show");
    };
    
    nota.appendChild(titulo);
    nota.appendChild(texto);
    nota.appendChild(menuBtn);
    nota.appendChild(dropdown);

    const placeholder = document.getElementById("div1");
    placeholder.parentNode.insertBefore(nota, placeholder);

    document.getElementById("notaContenido").value = "";
    document.getElementById("notaTitulo").value = "";
}

// cerrar dropdown al clickear fuera
document.addEventListener("click", () => {
    document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("show"));
});