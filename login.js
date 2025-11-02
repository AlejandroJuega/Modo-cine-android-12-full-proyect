const loginBtn = document.getElementById('loginBtn');
const googleLogin = document.getElementById('googleLogin');
const music = document.getElementById('bgMusic');
music.volume = 0.6;

loginBtn.onclick = () => {
  const email = document.getElementById('email').value.trim();
  const pass = document.getElementById('password').value.trim();
  if (email && pass) {
    music.pause();
    localStorage.setItem('modoCineUser', email);
    window.location.href = 'index.html';
  } else {
    alert('Por favor, introduce tu correo y contraseña');
  }
};

googleLogin.onclick = () => {
  music.pause();
  localStorage.setItem('modoCineUser', 'googleUser');
  window.location.href = 'index.html';
};
