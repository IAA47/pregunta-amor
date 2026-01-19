const yesBtn = document.querySelector('#yesBtn');
const noBtn = document.querySelector('#noBtn');

// Alerta cuando se hace clic en SÍ
yesBtn.addEventListener('click', function() {
    alert('El día que puedas darle click en "NO" sabré que me quieres más que yo. YA SABÍA QUE TE QUIERO MÁS QUE TÚ. ❤️');
});

// Función para mover el botón NO
function moverBotonNo() {
    const botonNo = noBtn;
    const contenedor = document.querySelector('.contenedor');
    
    // Obtener dimensiones
    const containerRect = contenedor.getBoundingClientRect();
    const buttonRect = botonNo.getBoundingClientRect();
    
    // Calcular posiciones máximas
    const maxX = containerRect.width - buttonRect.width - 20;
    const maxY = containerRect.height - buttonRect.height - 20;
    
    // Si las dimensiones son válidas
    if (maxX > 0 && maxY > 0) {
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        // Posicionar el botón
        botonNo.style.position = 'absolute';
        botonNo.style.left = `${randomX}px`;
        botonNo.style.top = `${randomY}px`;
    }
}

// Eventos para mover el botón NO
noBtn.addEventListener('mouseover', moverBotonNo);
noBtn.addEventListener('mouseenter', moverBotonNo);

// Para dispositivos táctiles (móviles)
noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    moverBotonNo();
});

// Mover cuando el dedo se acerca (para móviles)
let lastMoveTime = 0;
document.addEventListener('touchmove', function(e) {
    const now = Date.now();
    if (now - lastMoveTime < 200) return; // Limitar a 5 veces por segundo
    
    lastMoveTime = now;
    const touch = e.touches[0];
    const noBtnRect = noBtn.getBoundingClientRect();
    
    // Calcular centro del botón
    const btnCenterX = noBtnRect.left + noBtnRect.width / 2;
    const btnCenterY = noBtnRect.top + noBtnRect.height / 2;
    
    // Calcular distancia entre el dedo y el botón
    const distanciaX = Math.abs(touch.clientX - btnCenterX);
    const distanciaY = Math.abs(touch.clientY - btnCenterY);
    
    // Si el dedo está a menos de 150px del botón, moverlo
    if (distanciaX < 150 && distanciaY < 150) {
        moverBotonNo();
    }
}, { passive: false });

// Asegurar que el texto sea visible al cargar la página
window.addEventListener('load', function() {
    const texto = document.querySelector('p');
    // Forzar color blanco
    texto.style.color = '#FFFFFF';
    texto.style.textShadow = '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000';
});
