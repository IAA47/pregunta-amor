const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

// Alerta cuando se hace clic en SÍ
yesBtn.addEventListener('click', function() {
    alert('El día que puedas darle click en "NO" sabré que me quieres más que yo. YA SABÍA QUE TE QUIERO MÁS QUE TÚ. ❤️');
});

// Variables para controlar el movimiento
let isMoving = false;
let moveTimeout;
let lastMoveTime = 0;

// Función para obtener una posición aleatoria en TODA LA PANTALLA
function getRandomPosition() {
    // Obtener dimensiones de la ventana
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Obtener dimensiones del botón
    const buttonWidth = noBtn.offsetWidth;
    const buttonHeight = noBtn.offsetHeight;
    
    // Calcular márgenes seguros para que el botón no se salga
    const margin = 10;
    const maxX = windowWidth - buttonWidth - margin;
    const maxY = windowHeight - buttonHeight - margin;
    
    // Si la pantalla es muy pequeña, asegurar posiciones válidas
    if (maxX <= 0 || maxY <= 0) {
        return {
            x: Math.random() * (windowWidth - buttonWidth),
            y: Math.random() * (windowHeight - buttonHeight)
        };
    }
    
    // Calcular posición aleatoria
    const randomX = Math.floor(Math.random() * maxX) + margin;
    const randomY = Math.floor(Math.random() * maxY) + margin;
    
    return { x: randomX, y: randomY };
}

// Función para mover el botón NO por TODA LA PANTALLA
function moveNoButton() {
    if (isMoving) return;
    
    isMoving = true;
    
    // Obtener nueva posición
    const newPos = getRandomPosition();
    
    // Aplicar la nueva posición
    noBtn.style.left = `${newPos.x}px`;
    noBtn.style.top = `${newPos.y}px`;
    
    // Pequeña animación
    noBtn.style.transition = 'left 0.3s ease, top 0.3s ease';
    
    // Permitir otro movimiento después de un breve retraso
    setTimeout(() => {
        isMoving = false;
        noBtn.style.transition = 'left 0.1s ease, top 0.1s ease';
    }, 300);
}

// Función para mover el botón cuando el cursor/dedo se acerca
function startNoButtonMovement(event) {
    const now = Date.now();
    // Limitar la frecuencia de movimiento (máximo cada 100ms)
    if (now - lastMoveTime < 100) return;
    
    lastMoveTime = now;
    
    // Cancelar timeout anterior
    if (moveTimeout) {
        clearTimeout(moveTimeout);
    }
    
    // Programar movimiento
    moveTimeout = setTimeout(() => {
        moveNoButton();
    }, 50);
}

// EVENTOS PARA DESKTOP (ratón) - SE MUEVE POR ACERCAMIENTO

// Mover cuando el mouse está sobre el botón
noBtn.addEventListener('mouseover', startNoButtonMovement);

// Mover cuando el mouse se acerca al botón (sin tocarlo)
document.addEventListener('mousemove', function(e) {
    const noBtnRect = noBtn.getBoundingClientRect();
    
    // Calcular distancia entre el cursor y el centro del botón
    const centerX = noBtnRect.left + noBtnRect.width / 2;
    const centerY = noBtnRect.top + noBtnRect.height / 2;
    
    const distanceX = Math.abs(e.clientX - centerX);
    const distanceY = Math.abs(e.clientY - centerY);
    
    // Si el cursor está dentro de un radio de 100px, mover el botón
    if (distanceX < 100 && distanceY < 100) {
        startNoButtonMovement();
    }
});

// EVENTOS PARA MÓVIL (touch) - SE MUEVE AL TOCAR O ACERCARSE

// Mover al tocar el botón
noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    startNoButtonMovement();
});

// Mover al arrastrar el dedo cerca del botón
let lastTouchMoveTime = 0;
document.addEventListener('touchmove', function(e) {
    const now = Date.now();
    // Limitar frecuencia para mejor rendimiento
    if (now - lastTouchMoveTime < 150) return;
    
    lastTouchMoveTime = now;
    const touch = e.touches[0];
    const noBtnRect = noBtn.getBoundingClientRect();
    
    // Calcular distancia entre el dedo y el centro del botón
    const centerX = noBtnRect.left + noBtnRect.width / 2;
    const centerY = noBtnRect.top + noBtnRect.height / 2;
    
    const distanceX = Math.abs(touch.clientX - centerX);
    const distanceY = Math.abs(touch.clientY - centerY);
    
    // Si el dedo está dentro de un radio de 150px, mover el botón
    if (distanceX < 150 && distanceY < 150) {
        startNoButtonMovement();
    }
}, { passive: true });

// Inicializar posición aleatoria al cargar la página
window.addEventListener('load', function() {
    // Esperar un momento para que todo cargue
    setTimeout(() => {
        moveNoButton();
    }, 500);
});

// Mover el botón también cuando se redimensiona la ventana
window.addEventListener('resize', function() {
    // Asegurar que el botón no quede fuera de la pantalla
    setTimeout(() => {
        moveNoButton();
    }, 200);
});

// Función EXTRA: Hacer que el botón sea aún más difícil de tocar en móvil
if ('ontouchstart' in window) {
    // Es un dispositivo táctil
    document.addEventListener('touchmove', function(e) {
        // Mover el botón incluso si el dedo está en cualquier parte de la pantalla
        // (hacerlo más difícil)
        const touch = e.touches[0];
        const noBtnRect = noBtn.getBoundingClientRect();
        
        // Calcular distancia
        const centerX = noBtnRect.left + noBtnRect.width / 2;
        const centerY = noBtnRect.top + noBtnRect.height / 2;
        
        const distanceX = Math.abs(touch.clientX - centerX);
        const distanceY = Math.abs(touch.clientY - centerY);
        
        // Radio más grande para hacerlo más difícil
        if (distanceX < 200 && distanceY < 200) {
            startNoButtonMovement();
        }
    }, { passive: true });
}

// Hacer que el botón se mueva automáticamente cada cierto tiempo (solo en móvil)
if ('ontouchstart' in window) {
    setInterval(() => {
        // Mover automáticamente cada 3 segundos (hacerlo difícil)
        moveNoButton();
    }, 3000);
}
