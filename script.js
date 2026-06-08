document.addEventListener('DOMContentLoaded', () => {
  console.log("CampusVivo listo para transformar el campus.");
});
// Funciones adicionales para el sistema híbrido
function simularPuntos() {
  let puntos = localStorage.getItem('puntosUsuario') ? parseInt(localStorage.getItem('puntosUsuario')) : 100;
  puntos += Math.floor(Math.random() * 20) + 5;
  localStorage.setItem('puntosUsuario', puntos);
  Swal.fire({
    title: '🎉 +' + (Math.floor(Math.random() * 20) + 5) + ' puntos',
    text: '¡Sigue acumulando para canjear en el Mercadito!',
    icon: 'success',
    confirmButtonColor: '#2d6a4f'
  });
  actualizarPuntosHeader();
}

function actualizarPuntosHeader() {
  const puntos = localStorage.getItem('puntosUsuario') ? parseInt(localStorage.getItem('puntosUsuario')) : 100;
  const headerPuntos = document.getElementById('puntosHeader');
  if (headerPuntos) {
    headerPuntos.innerHTML = `⭐ ${puntos} pts`;
  }
}

// Inicializar puntos al cargar cualquier página
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('puntosUsuario')) {
    localStorage.setItem('puntosUsuario', '100');
  }
  actualizarPuntosHeader();
});

// EFECTO WOW: Partículas al hacer clic
document.addEventListener('click', function(e) {
  for(let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.innerHTML = ['🌿', '🍫', '⭐', '💚', '🌱', '🎯'][Math.floor(Math.random() * 6)];
    particle.style.position = 'fixed';
    particle.style.left = e.clientX + 'px';
    particle.style.top = e.clientY + 'px';
    particle.style.fontSize = Math.random() * 20 + 10 + 'px';
    particle.style.pointerEvents = 'none';
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000);
  }
});

// CONTADOR PROGRESIVO AL HACER SCROLL
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.stat-number');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        const updateCounter = () => {
          if(current < target) {
            current += increment;
            counter.innerText = Math.ceil(current);
            setTimeout(updateCounter, 20);
          } else {
            counter.innerText = target;
          }
        };
        updateCounter();
      });
    }
  });
}, observerOptions);

document.querySelectorAll('.stats-card, .stat-bienestar-card').forEach(el => observer.observe(el));

// Dark Mode
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Modo Oscuro';
darkModeToggle.className = 'dark-mode-toggle';
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if(document.body.classList.contains('dark-mode')) {
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
    localStorage.setItem('darkMode', 'enabled');
  } else {
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Modo Oscuro';
    localStorage.setItem('darkMode', 'disabled');
  }
});

if(localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
}

// ========== MODO OSCURO GLOBAL ==========
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  
  // Cambiar ícono del botón
  const darkBtn = document.getElementById('darkModeToggle');
  if(darkBtn) {
    darkBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }
}

// Crear botón flotante de modo oscuro
const darkModeBtn = document.createElement('button');
darkModeBtn.id = 'darkModeToggle';
darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
darkModeBtn.style.cssText = `
  position: fixed;
  bottom: 100px;
  left: 30px;
  z-index: 9999;
  background: #2d6a4f;
  color: white;
  border: none;
  border-radius: 50px;
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  transition: all 0.3s;
`;

darkModeBtn.onmouseenter = () => darkModeBtn.style.transform = 'scale(1.1)';
darkModeBtn.onmouseleave = () => darkModeBtn.style.transform = 'scale(1)';
darkModeBtn.onclick = toggleDarkMode;

// Solo agregar si no existe
if(!document.getElementById('darkModeToggle')) {
  document.body.appendChild(darkModeBtn);
}

// Cargar preferencia guardada
if(localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

// Estilos del modo oscuro (agregar al CSS si no están)
const darkModeStyles = `
  body.dark-mode {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    color: #ffffff;
  }
  body.dark-mode .card,
  body.dark-mode .navbar,
  body.dark-mode section,
  body.dark-mode .modal-content {
    background-color: #2d2d44 !important;
    color: #ffffff !important;
  }
  body.dark-mode .card-body {
    background-color: #2d2d44 !important;
  }
  body.dark-mode .text-muted {
    color: #aaa !important;
  }
  body.dark-mode .btn-outline-light {
    border-color: #fff;
    color: #fff;
  }
  body.dark-mode .table {
    color: #fff;
  }
  body.dark-mode .bg-light {
    background-color: #2d2d44 !important;
  }
`;

if(!document.querySelector('#darkModeStyles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'darkModeStyles';
  styleSheet.textContent = darkModeStyles;
  document.head.appendChild(styleSheet);
}
// Efecto de máquina de escribir
const textos = [
  "Transformamos el cemento en bienestar 🌿",
  "Conéctate con tu comunidad 🤝",
  "Apoya el talento local 🍫",
  "Protege tu salud mental 🧠"
];
let textoIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = textos[textoIndex];
  const typedElement = document.getElementById('typed-title');
  if(!typedElement) return;
  
  if(isDeleting) {
    typedElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }
  
  if(!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typeEffect, 2000);
  } else if(isDeleting && charIndex === 0) {
    isDeleting = false;
    textoIndex = (textoIndex + 1) % textos.length;
    setTimeout(typeEffect, 500);
  } else {
    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }
}
setTimeout(typeEffect, 1000);

// Sistema de notificaciones toast
function mostrarNotificacion(mensaje, icono = '🌿') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: linear-gradient(135deg, #2d6a4f, #43a047);
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    z-index: 10000;
    animation: slideIn 0.5s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    font-weight: bold;
  `;
  toast.innerHTML = `${icono} ${mensaje}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Estilo para la animación
const notifStyle = document.createElement('style');
notifStyle.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;
document.head.appendChild(notifStyle);

// Detectar cuando se completan misiones
function checkMisionesYNotificar() {
  const checks = document.querySelectorAll('#listaMisiones input[type="checkbox"]');
  if(checks) {
    const completadas = Array.from(checks).filter(chk => chk.checked).length;
    const total = checks.length;
    if(completadas === total && !localStorage.getItem('misionCompletaNotificada')) {
      mostrarNotificacion('🏆 ¡Misión completa! Ganaste 50 puntos', '🎉');
      let puntos = localStorage.getItem('puntosUsuario') ? parseInt(localStorage.getItem('puntosUsuario')) : 100;
      puntos += 50;
      localStorage.setItem('puntosUsuario', puntos);
      localStorage.setItem('misionCompletaNotificada', 'true');
      actualizarPuntosHeader();
    }
  }
}
setInterval(checkMisionesYNotificar, 1000);

// ========== PANEL ADMIN SECRETO ==========
// Presiona "A" + "D" + "M" + "I" + "N" para abrir
let adminCode = [];
const adminPassword = ['a', 'd', 'm', 'i', 'n'];

document.addEventListener('keydown', (e) => {
  adminCode.push(e.key.toLowerCase());
  if(adminCode.length > 5) adminCode.shift();
  
  if(JSON.stringify(adminCode) === JSON.stringify(adminPassword)) {
    abrirPanelAdmin();
  }
});

function abrirPanelAdmin() {
  Swal.fire({
    title: '🔐 Panel de Administración',
    html: `
      <div class="text-start">
        <div class="mb-3">
          <label>📊 Resetear puntos globales</label>
          <button class="btn btn-danger w-100 mt-1" onclick="resetearPuntosGlobales()">Resetear todos los puntos</button>
        </div>
        <div class="mb-3">
          <label>📈 Simular nuevo usuario</label>
          <button class="btn btn-primary w-100 mt-1" onclick="simularUsuarioNuevo()">+ Simular</button>
        </div>
        <div class="mb-3">
          <label>🎁 Dar puntos a todos</label>
          <button class="btn btn-success w-100 mt-1" onclick="darPuntosATodos()">+100 puntos a TODOS</button>
        </div>
        <div class="mb-3">
          <label>📢 Enviar notificación masiva</label>
          <input id="msgMasivo" class="form-control" placeholder="Mensaje para todos">
          <button class="btn btn-info w-100 mt-1" onclick="enviarNotificacionMasiva()">Enviar</button>
        </div>
      </div>
    `,
    width: '500px',
    showConfirmButton: false,
    showCloseButton: true
  });
}

function resetearPuntosGlobales() {
  localStorage.setItem('puntosUsuario', '100');
  Swal.fire('Reset completo', 'Todos los puntos vuelven a 100', 'success');
  location.reload();
}

function simularUsuarioNuevo() {
  const nombres = ['Juan Pérez', 'Laura Gómez', 'Diego Luna', 'Camila Ríos'];
  const nombreRand = nombres[Math.floor(Math.random() * nombres.length)];
  localStorage.setItem('usuario', nombreRand);
  localStorage.setItem('puntosUsuario', '150');
  Swal.fire('Usuario simulado', `Ahora eres ${nombreRand} con 150 puntos`, 'success');
  location.reload();
}

function darPuntosATodos() {
  let puntos = localStorage.getItem('puntosUsuario') ? parseInt(localStorage.getItem('puntosUsuario')) : 100;
  puntos += 100;
  localStorage.setItem('puntosUsuario', puntos);
  Swal.fire('¡Regalo!', 'Has recibido 100 puntos extras', 'success');
  actualizarPuntosHeader();
}

function enviarNotificacionMasiva() {
  const msg = document.getElementById('msgMasivo')?.value || '¡Nueva actividad en CampusVivo!';
  mostrarNotificacionGlobal(msg);
  Swal.fire('Enviado', 'Notificación enviada a todos los usuarios', 'success');
}

function mostrarNotificacionGlobal(mensaje) {
  const notif = document.createElement('div');
  notif.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 15px 30px;
    border-radius: 50px;
    z-index: 10001;
    animation: slideDown 0.5s ease;
    font-weight: bold;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  `;
  notif.innerHTML = `📢 ${mensaje}`;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 4000);
}

const slideDownStyle = document.createElement('style');
slideDownStyle.textContent = `
  @keyframes slideDown {
    from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
    to { transform: translateX(-50%) translateY(0); opacity: 1; }
  }
`;
document.head.appendChild(slideDownStyle);

// ========== CONFETTI EFFECT ==========
function lanzarConfetti() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };
  
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) return clearInterval(interval);
    const particleCount = 50 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}

// Llamar cuando se completa misión especial
function checkLogroEspecial() {
  const puntos = localStorage.getItem('puntosUsuario') ? parseInt(localStorage.getItem('puntosUsuario')) : 100;
  if(puntos >= 500 && !localStorage.getItem('logro500')) {
    lanzarConfetti();
    Swal.fire({
      title: '🏆 ¡LOGRO ÉPICO!',
      text: 'Alcanzaste 500 puntos - Eres un Guardian del Campus',
      icon: 'success',
      background: 'linear-gradient(135deg, #ffd700, #ffed4e)'
    });
    localStorage.setItem('logro500', 'true');
  }
}

// Llamar cada vez que se suman puntos
const originalSumarPuntos = window.sumarPuntos;
window.sumarPuntos = function(cantidad) {
  if(originalSumarPuntos) originalSumarPuntos(cantidad);
  checkLogroEspecial();
};

// ========== PANEL ADMIN MEJORADO ==========
let adminSequence = [];
const adminCode = ['a', 'd', 'm', 'i', 'n'];
let adminMode = false;

document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  adminSequence.push(key);
  if (adminSequence.length > 5) adminSequence.shift();
  
  console.log('Secuencia:', adminSequence); // Para depurar
  
  if (JSON.stringify(adminSequence) === JSON.stringify(adminCode)) {
    console.log('✅ Panel Admin Activado');
    mostrarPanelAdmin();
    adminSequence = [];
  }
});

function mostrarPanelAdmin() {
  Swal.fire({
    title: '🔒 PANEL DE ADMINISTRACIÓN',
    html: `
      <div class="text-start">
        <div class="mb-3 p-2" style="background: #f8f9fa; border-radius: 10px;">
          <strong>📊 ESTADÍSTICAS RÁPIDAS</strong><br>
          Usuario actual: ${localStorage.getItem('usuario') || 'No logueado'}<br>
          Puntos: ${localStorage.getItem('puntosUsuario') || 100}<br>
          Modo oscuro: ${localStorage.getItem('darkMode') === 'enabled' ? 'Activado' : 'Desactivado'}
        </div>
        
        <div class="mb-2">
          <button class="btn btn-danger w-100 mb-2" onclick="adminResetPuntos()">
            🔄 Resetear mis puntos
          </button>
          <button class="btn btn-warning w-100 mb-2" onclick="adminAddPuntos()">
            ➕ Añadir 500 puntos
          </button>
          <button class="btn btn-info w-100 mb-2" onclick="adminSimularUsuario()">
            🎭 Cambiar de usuario
          </button>
          <button class="btn btn-success w-100 mb-2" onclick="adminLimpiarCache()">
            🧹 Limpiar caché local
          </button>
          <button class="btn btn-dark w-100" onclick="adminVerTodo()">
            👁️ Ver todos los datos guardados
          </button>
        </div>
      </div>
    `,
    width: '450px',
    showConfirmButton: false,
    showCloseButton: true,
    backdrop: true
  });
}

function adminResetPuntos() {
  localStorage.setItem('puntosUsuario', '100');
  Swal.fire('✅ Reset completo', 'Tus puntos han vuelto a 100', 'success');
  location.reload();
}

function adminAddPuntos() {
  let puntos = parseInt(localStorage.getItem('puntosUsuario') || '100');
  puntos += 500;
  localStorage.setItem('puntosUsuario', puntos);
  Swal.fire('🎉 +500 puntos', `Ahora tienes ${puntos} puntos`, 'success');
  if(window.actualizarPuntosHeader) actualizarPuntosHeader();
}

function adminSimularUsuario() {
  Swal.fire({
    title: '👤 Simular usuario',
    input: 'text',
    inputPlaceholder: 'Nombre del usuario',
    showCancelButton: true,
    confirmButtonText: 'Simular'
  }).then(result => {
    if(result.isConfirmed && result.value) {
      localStorage.setItem('usuario', result.value);
      localStorage.setItem('puntosUsuario', '250');
      Swal.fire(`✅ Ahora eres ${result.value} con 250 puntos`, '', 'success');
      location.reload();
    }
  });
}

function adminLimpiarCache() {
  Swal.fire({
    title: '⚠️ ¿Limpiar caché?',
    text: 'Esto borrará tus datos locales',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, limpiar'
  }).then(result => {
    if(result.isConfirmed) {
      localStorage.clear();
      Swal.fire('🧹 Caché limpiado', 'Recarga la página', 'success');
      location.reload();
    }
  });
}

function adminVerTodo() {
  let datos = '';
  for(let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    datos += `${key}: ${localStorage.getItem(key)}\n`;
  }
  Swal.fire({
    title: '📦 Datos guardados',
    text: datos || 'No hay datos guardados',
    icon: 'info',
    width: '500px'
  });
}