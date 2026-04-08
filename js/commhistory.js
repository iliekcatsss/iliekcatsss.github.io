fetch('https://api.github.com/repos/iliekcatsss/iliekcatsss.github.io/commits?per_page=30')
.then(r => r.json())
.then(data => {
    const container = document.getElementById("commits-list");

    container.innerHTML = "";

    data.forEach(commit => {
        const fecha = new Date (commit.commit.author.date);

        const div = document.createElement("div");
        div.className = "commit";

        div.innerHTML = `
            <p><strong>${commit.commit.message}</strong></p>
            <p>${fecha.toLocaleDateString("es-MX", { year:"numeric", month:"long", day:"numeric" })}</p>
            <p>SHA: ${commit.sha.slice(0,7)}</p>
            <a href="${commit.html_url}" class="link" target="_blank">Ver commit</a>
            <hr>
        `;
        container.appendChild(div);
    })
});