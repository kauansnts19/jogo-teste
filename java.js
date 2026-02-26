const player = document.getElementById('player');

let x = 200;
let y = 120;           // começa em cima do chão
let velocityY = 0;
let isJumping = false;
let keys = {};

const gravity = 0.65;
const jumpForce = -13;
const speed = 5;
const groundY = 120;

window.addEventListener('keydown', e => {
  keys[e.key] = true;
  
  // pular (espaço ou seta para cima)
  if (e.key === ' ' || e.key === 'ArrowUp') {
    if (!isJumping) {
      velocityY = jumpForce;
      isJumping = true;
    }
  }
});

window.addEventListener('keyup', e => {
  keys[e.key] = false;
});

function update() {
  // movimento horizontal
  if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
    x -= speed;
  }
  if (keys['ArrowRight'] || keys['d'] || keys['D']) {
    x += speed;
  }

  // gravidade + pulo
  velocityY += gravity;
  y += velocityY;

  // colisão com o chão
  if (y >= groundY) {
    y = groundY;
    velocityY = 0;
    isJumping = false;
  }

  // não sair da tela (opcional)
  if (x < 0) x = 0;
  if (x > window.innerWidth - 60) x = window.innerWidth - 60;

  // aplicar posição no elemento
  player.style.left = x + 'px';
  player.style.bottom = y + 'px';

  requestAnimationFrame(update);
}

// inicia o loop do jogo
update();