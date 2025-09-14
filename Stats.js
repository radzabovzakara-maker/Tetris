const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const ROW = 20;
const COL = 10;
const SQ = 20;
let board = Array.from({ length: ROW }, () => Array(COL).fill('#000'));

function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ, y*SQ, SQ, SQ);
    ctx.strokeStyle = '#111';
    ctx.strokeRect(x*SQ, y*SQ, SQ, SQ);
}

function drawBoard() {
    for(let r=0; r<ROW; r++)
        for(let c=0; c<COL; c++)
            drawSquare(c, r, board[r][c]);
}

// Минимальные функции движения
function moveLeft() { console.log('Left'); }
function moveRight() { console.log('Right'); }
function rotatePiece() { console.log('Rotate'); }
function dropDown() { console.log('Drop'); }
function startGame() { console.log('Start'); }

drawBoard();

// Сенсорная поддержка
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
}, false);

document.addEventListener('touchend', function(e) {
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 30) moveRight();
        else if (deltaX < -30) moveLeft();
    } else {
        if (deltaY > 30) dropDown();
        else if (deltaY < -30) rotatePiece();
    }

    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
        startGame();
    }
}, false);