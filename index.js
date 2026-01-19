const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const botonesContainer = document.querySelector('.botones-container');

// Alerta cuando se hace clic en SÍ
yesBtn.addEventListener('click', function() {
    alert('El día que puedas darle click en "NO" sabré que me quieres más que yo. YA SABÍA QUE TE QUIERO MÁS QUE TÚ. ❤️');
});

// Variables para controlar el movimiento del botón NO
let isMoving = false;
let moveTimeout;

// Función para obtener una posición aleatoria DENTRO del contenedor
function getRandomPosition() {
    const containerRect = botonesContainer.getBoundingClientRect();
    const buttonRect = noBtn.getBoundingClientRect();
    
    // Dimensiones del contenedor y del botón
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;
    
    // Calcular márgenes seguros (el botón debe estar completamente dentro)
    const margin = 5; // Pequeño margen
    const maxX = containerWidth - buttonWidth - margin;
    const maxY = containerHeight - buttonHeight - margin;
    
    // Si el contenedor es muy pequeño, usar porcentajes
    if (maxX <= 0 || maxY <= 0) {
        return {
            x: Math.random() * 30, // Porcentaje
            y: Math.random() * 30, // Porcentaje
            usePercentage: true
        };
    }
    
    // Calcular posición aleatoria en píxeles
    const randomX = Math.floor(Math.random() * maxX) + margin;
    const randomY = Math.floor(Math.random() * maxY) + margin;
    
    return {
        x: randomX,
        y: randomY,
        usePercentage: false
    };
}

// Función para mover el botón NO
function moveNoButton() {
    if (isMoving) return; // Evitar múltiples movimientos simultáneos
    
    isMoving = true;
    
    // Obtener nueva posición
    const newPos = getRandomPosition();
    
    // Aplicar la nueva posición
    if (newPos.usePercentage) {
        noBtn.style.left = `${newPos.x}%`;
        noBtn.style.top = `${newPos.y}%`;
    } else {
        noBtn.style.left = `${newPos.x}px`;
        noBtn.style.top = `${newPos.y}px`;
    }
    
    // Pequeño retraso antes de permitir otro movimiento
    setTimeout(() => {
        isMoving = false;
    }, 100);
}

// Función para mover el botón cuando el cursor/dedo se acerca
function startNoButtonMovement(event) {
    // Si ya hay un timeout programado, cancelarlo
    if (moveTimeout) {
        clearTimeout(moveTimeout);
    }
    
    // Programar el movimiento después de un pequeño retraso
    moveTimeout = setTimeout(() => {
        moveNoButton();
    }, 50);
}

// Eventos para DESKTOP (ratón)
noBtn.addEventListener('mouseover', startNoButtonMovement);
noBtn.addEventListener('mouseenter', startNoButtonMovement);

// Eventos para MÓVIL (touch)
noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    startNoButtonMovement();
});

noBtn.addEventListener('touchmove', function(e) {
    e.preventDefault();
    startNoButtonMovement();
});

// También mover cuando el cursor/dedo se acerca al botón
document.addEventListener('mousemove', function(e) {
    const noBtnRect = noBtn.getBoundingClientRect();
    const distanceX = Math.abs(e.clientX - (noBtnRect.left + noBtnRect.width / 2));
    const distanceY = Math.abs(e.clientY - (noBtnRect.top + noBtnRect.height / 2));
    
    // Si el cursor está dentro de un radio de 100px, mover el botón
    if (distanceX < 100 && distanceY < 100) {
        startNoButtonMovement();
    }
});

// Para móviles: detectar cuando el dedo está cerca
let lastTouchTime = 0;
document.addEventListener('touchmove', function(e) {
    const now = Date.now();
    if (now - lastTouchTime < 200) return; // Limitar frecuencia
    
    lastTouchTime = now;
    const touch = e.touches[0];
    const noBtnRect = noBtn.getBoundingClientRect();
    
    const distanceX = Math.abs(touch.clientX - (noBtnRect.left + noBtnRect.width / 2));
    const distanceY = Math.abs(touch.clientY - (noBtnRect.top + noBtnRect.height / 2));
    
    // Si el dedo está dentro de un radio de 150px, mover el botón
    if (distanceX < 150 && distanceY < 150) {
        startNoButtonMovement();
    }
}, { passive: true });

// Inicializar posición del botón NO
window.addEventListener('load', function() {
    // Asegurar que el botón NO esté dentro del contenedor
    noBtn.style.position = 'absolute';
    noBtn.style.left = '50%';
    noBtn.style.top = '50%';
    noBtn.style.transform = 'translate(-50%, -50%)';
    
    // Forzar un reflujo para asegurar que las dimensiones sean correctas
    setTimeout(() => {
        moveNoButton();
    }, 100);
});

// Ajustar el movimiento cuando cambia el tamaño de la ventana
window.addEventListener('resize', function() {
    // Mover el botón a una posición segura cuando se redimensiona
    setTimeout(() => {
        moveNoButton();
    }, 200);
});
