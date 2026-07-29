        let playing = true;
        function toggleHidden(id) {
            var element = document.getElementById(id);
            if (element.hasAttribute("hidden")) {
                element.removeAttribute("hidden");
            } else {
                element.setAttribute("hidden", "hidden");
            }
        }
        
        toggleHidden('btnReload')

        let intentos = 0;
        let feedback = document.getElementById("mensaje-juego");
        function number() {
            let input = document.getElementById("intento");
            intentos = 0
            numero = Math.floor(Math.random() * 10) +1;
            console.log(numero)
            feedback.innerText = ""
            input.value = ""
        }

        number()

        function adivinar() {
            // if (playing == false) {
            //     return;
            // }
            let input = document.getElementById("intento").value;
            intentos = intentos + 1;

            if (input > 10 || input < 1) {
                alert("Ingresa un número entre 1 y 10");
                return;
            }
            if (input == numero) {
                playing = false;
                feedback.innerHTML = `
                    <strong>Ganaste we, el número era ${numero}<br>
                    <small>Lo hiciste en ${intentos} intentos<br>
                `;
                feedback.style.color = "#4caf50";
                toggleHidden('btnReload')
                toggleHidden('btnStart')
            } else if (input > numero) {
                feedback.innerHTML = `
                    <strong>Te pasaste we<br>
                    <small>Llevas ${intentos} intentos<br>
                `;
                feedback.style.color = "#ff5252"
            } else {
                feedback.innerHTML = `
                <strong>Te faltó we<br>
                <small>Llevas ${intentos} intentos<br>
                `;
                feedback.style.color = "#ffd740";
            }
        }