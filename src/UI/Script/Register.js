const registerForm = document.getElementById('register-form');

if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Tentativa de registro...');
        alert('Funcionalidade de registro ainda não implementada.');
    });
}
