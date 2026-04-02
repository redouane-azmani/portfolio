// Effet de parallaxe subtil
document.querySelector('.about-content').addEventListener('mousemove', (e) => {
    const bounds = e.target.getBoundingClientRect();
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    // Rotation limitée à 3 degrés maximum
    const angleX = ((mouseY - centerY) / centerY) * 3;
    const angleY = ((mouseX - centerX) / centerX) * 3;

    e.target.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
});

document.querySelector('.about-content').addEventListener('mouseleave', (e) => {
    e.target.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
});