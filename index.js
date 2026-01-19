const yesBtn = document.querySelector('#yesBtn');
const noBtn = document.querySelector('#noBtn');

// Función para cambiar el color del texto cada segundo
function cambiarColorTexto() {
    const texto = document.querySelector('p');
    const colores = [
        '#FFFFFF', // Blanco
        '#FFEB3B', // Amarillo
        '#00E5FF', // Cyan
        '#FF4081', // Rosa
        '#00E676', // Verde brillante
        '#FF9800', // Naranja
        '#E040FB'  // Púrpura
    ];
    
    let colorIndex = 0;
    
    setInterval(() => {
        texto.style.color = colores[colorIndex];
        colorIndex = (colorIndex + 1) % colores.length;
    }, 1000); // Cambia cada segundo
}

// Iniciar cambio de color cuando la página cargue
window.addEventListener('load', cambiarColorTexto);

// Alerta cuando se hace clic en SÍ
yesBtn.addEventListener('click', function() {
    alert('El día que puedas darle click en "NO" sabré que me quieres más que yo. YA SABÍA QUE TE QUIERO MÁS QUE TÚ. ❤️');
});

// Función para mover el botón NO
function moverBotonNo() {
    const contenedor = document.querySelector('.contenedor');
    const botonNo = noBtn;
    
    // Obtener dimensiones
    const containerWidth = contenedor.offsetWidth;
    const containerHeight = contenedor.offsetHeight;
    const buttonWidth = botonNo.offsetWidth;
    const buttonHeight = botonNo.offsetHeight;
    
    // Calcular posición aleatoria asegurando que no se salga
    const maxX = containerWidth - buttonWidth - 20;
    const maxY = containerHeight - buttonHeight - 20;
    
    if (maxX > 0 && maxY > 0) {
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        botonNo.style.position = 'absolute';
        botonNo.style.left = randomX + 'px';
        botonNo.style.top = randomY + 'px';
    }
}

// Eventos para mover el botón NO
noBtn.addEventListener('mouseover', moverBotonNo);
noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    moverBotonNo();
});

// Para dispositivos móviles: mover cuando el dedo se acerca
document.addEventListener('touchmove', function(e) {
    const touch = e.touches[0];
    const noBtnRect = noBtn.getBoundingClientRect();
    const btnCenterX = noBtnRect.left + noBtnRect.width / 2;
    const btnCenterY = noBtnRect.top + noBtnRect.height / 2;
    
    // Calcular distancia entre el dedo y el botón
    const distanciaX = Math.abs(touch.clientX - btnCenterX);
    const distanciaY = Math.abs(touch.clientY - btnCenterY);
    const distancia = Math.sqrt(distanciaX * distanciaX + distanciaY * distanciaY);
    
    // Si el dedo está a menos de 100px del botón, moverlo
    if (distancia < 100) {
        moverBotonNo();
    }
}, { passive: false });
