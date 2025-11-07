const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Tentativa de login...');
        alert('Funcionalidade de login ainda não implementada.');
    });
}
