const registerForm = document.querySelector('#register-form');
const password = document.querySelector('#password');

const confirmPassword = document.querySelector('#confirm_password');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity('As senhas não coincidem');
  } else {
    registerForm.submit();
  }

  if (registerForm.reportValidity()) {
    registerForm.submit();
  }
});

confirmPassword.addEventListener('input', (e) => {
  confirmPassword.setCustomValidity('');
});