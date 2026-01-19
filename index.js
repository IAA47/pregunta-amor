const yesBtn = document.querySelector('#yesBtn');
const noBtn = document.querySelector('#noBtn');

yesBtn.addEventListener('click', function() {
    alert('El día que puedas darle click en "NO" sabré que me quieres más que yo. YA SABÍA QUE TE QUIERO MÁS QUE TÚ. ❤️');
});

// Función para mover el botón "No"
function moverBotonNo() {
    // Obtener dimensiones de la ventana
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Obtener dimensiones del botón
    const buttonWidth = noBtn.offsetWidth;
    const buttonHeight = noBtn.offsetHeight;
    
    // Calcular posiciones máximas (dejando un margen)
    const margin = 20;
    const maxX = windowWidth - buttonWidth - margin;
    const maxY = windowHeight - buttonHeight - margin;
    
    // Asegurarnos de que no haya valores negativos (para pantallas muy pequeñas)
    const safeMaxX = Math.max(0, maxX);
    const safeMaxY = Math.max(0, maxY);
    
    // Generar posición aleatoria
    const randomX = Math.floor(Math.random() * safeMaxX);
    const randomY = Math.floor(Math.random() * safeMaxY);
    
    // Posicionar el botón
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// Eventos para mover el botón "No"
noBtn.addEventListener('mouseover', moverBotonNo);
noBtn.addEventListener('touchstart', moverBotonNo); // Para dispositivos táctiles

// También mover cuando el cursor se acerca (solo para desktop)
noBtn.addEventListener('mouseenter', moverBotonNo);

// Ajustar el botón si se redimensiona la ventana
window.addEventListener('resize', function() {
    // Si el botón "No" está en posición fija, reajustarlo
    if (noBtn.style.position === 'fixed') {
        moverBotonNo();
    }
});
