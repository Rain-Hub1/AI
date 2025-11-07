const contentArea = document.getElementById('content-area');

async function loadPage(page) {
    try {
        const response = await fetch(`src/Pages/${page}`);
        if (!response.ok) {
            throw new Error(`Página não encontrada: ${page}`);
        }
        const html = await response.text();
        contentArea.innerHTML = html;
        const scripts = contentArea.querySelectorAll('script');
        scripts.forEach(oldScript => {
            const newScript = document.createElement('script');
            if (oldScript.src) {
                newScript.src = oldScript.src;
                newScript.onload = () => console.log(`Script ${oldScript.src} carregado.`);
                document.body.appendChild(newScript).parentNode.removeChild(newScript);
            }
        });

    } catch (error) {
        contentArea.innerHTML = `<p style="text-align:center; color:red;">Erro ao carregar a página.</p>`;
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadPage('Login.html');
});
