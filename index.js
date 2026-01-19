const yesBtn = document.querySelector('#yesBtn');
const noBtn = document.querySelector('#noBtn');

yesBtn.addEventListener('click', function() {
    alert('El día que puedas darle click en "NO" sabré que me quieres más que yo. YA SABÍA QUE TE QUIERO MÁS QUE TÚ. ❤️');
});

// Función para mover el botón "No"
function moveNoBtn() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const buttonWidth = noBtn.offsetWidth;
    const buttonHeight = noBtn.offsetHeight;
    
    // Calcular márgenes seguros
    const margin = 20;
    const maxX = windowWidth - buttonWidth - margin;
    const maxY = windowHeight - buttonHeight - margin;
    
    // Asegurar que las posiciones sean válidas
    let randomX, randomY;
    
    if (maxX > 0 && maxY > 0) {
        randomX = Math.floor(Math.random() * maxX);
        randomY = Math.floor(Math.random() * maxY);
    } else {
        // Si la pantalla es muy pequeña, usar porcentajes
        randomX = Math.floor(Math.random() * 80);
        randomY = Math.floor(Math.random() * 80);
        noBtn.style.left = randomX + '%';
        noBtn.style.top = randomY + '%';
        noBtn.style.transform = 'translate(-50%, -50%)';
        return;
    }
    
    // Asegurar que no se salga de la pantalla
    randomX = Math.max(margin, Math.min(randomX, maxX));
    randomY = Math.max(margin, Math.min(randomY, maxY));
    
    // Aplicar la posición
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transform = 'none';
}

// Eventos para desktop (ratón)
noBtn.addEventListener('mouseover', moveNoBtn);
noBtn.addEventListener('mouseenter', moveNoBtn);

// Eventos para móviles (touch)
noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    moveNoBtn();
});

noBtn.addEventListener('touchmove', function(e) {
    e.preventDefault();
    moveNoBtn();
});

// Para evitar que el usuario pueda mantener presionado el botón en móviles
noBtn.addEventListener('touchend', function(e) {
    e.preventDefault();
    moveNoBtn();
});

// También mover cuando se acerca el dedo (simulación de hover)
document.addEventListener('touchmove', function(e) {
    const touch = e.touches[0];
    const noBtnRect = noBtn.getBoundingClientRect();
    
    // Si el dedo está cerca del botón (50px)
    const distanceX = Math.abs(touch.clientX - (noBtnRect.left + noBtnRect.width/2));
    const distanceY = Math.abs(touch.clientY - (noBtnRect.top + noBtnRect.height/2));
    
    if (distanceX < 50 && distanceY < 50) {
        moveNoBtn();
    }
}, { passive: false });
