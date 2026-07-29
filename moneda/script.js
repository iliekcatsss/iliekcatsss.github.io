function convertir() {
    const cantidad = document.getElementById("cantidad").value;
    const origen = document.getElementById("monedaOrigen").value;
    const destino = document.getElementById("monedaDestino").value;
    let resultado = document.getElementById("resultado")

    if (origen == destino) {
        resultado.innerHTML = "Selecciona monedas diferentes";
        return;
    }

    fetch(`https://api.frankfurter.dev/v1/latest?from=${origen}&to=${destino}`)
        .then(res => res.json())
        .then(data => {
            let res = (data.rates[destino] * cantidad).toFixed(2)
            resultado.innerHTML = `
                ${cantidad} ${origen} = <strong>${res} ${destino}</strong>
            `
        })
}