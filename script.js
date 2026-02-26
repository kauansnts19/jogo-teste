const player = document.getElementById('player');

let x = 200;
let y = 120;
let velocityY = 0;
let isJumping = false;
let keys = {};

const gravity = 0.65;
const jumpForce = -13;
const speed = 5;
const groundY = 120;

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;

    if ((e.key === ' ' || e.key === 'ArrowUp') && !isJumping) {
        velocityY = jumpForce;
        isJumping = true;
    }
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function gameLoop() {
    // Movimento horizontal
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
        x -= speed;
    }
    if (keys['ArrowRight'] || keys['d'] || keys['D']) {
        x += speed;
    }

    // Gravidade e pulo
    velocityY += gravity;
    y += velocityY;

    // Chão
    if (y >= groundY) {
        y = groundY;
        velocityY = 0;
        isJumping = false;
    }

    // Limites da tela
    if (x < 0) x = 0;
    if (x > window.innerWidth - 68) x = window.innerWidth - 68; // 60px + borda

    // Aplica a posição
    player.style.left = x + 'px';
    player.style.bottom = y + 'px';

    requestAnimationFrame(gameLoop);
}

gameLoop();