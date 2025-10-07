const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get('level') || 'easy';

const game = new Chess();
const board = Chessboard('board', {
  draggable: true,
  position: 'start',
  onDrop: onDrop
});

function onDrop(source, target) {
  const move = game.move({ from: source, to: target, promotion: 'q' });
  if (move === null) return 'snapback';

  updateStatus();
  setTimeout(makeAIMove, 500);
}

function makeAIMove() {
  const moves = game.moves();
  if (moves.length === 0) return;

  let move;
  if (level === 'easy') {
    move = moves[Math.floor(Math.random() * moves.length)];
  } else if (level === 'medium') {
    move = moves[Math.floor(Math.random() * moves.length)];
  } else {
    move = moves[0]; // placeholder for smarter AI
  }

  game.move(move);
  board.position(game.fen());
  updateStatus();
}

function updateStatus() {
  const status = document.getElementById('status');
  if (game.in_checkmate()) {
    status.textContent = 'Skakmat!';
  } else if (game.in_draw()) {
    status.textContent = 'Seri!';
  } else {
    status.textContent = 'Giliran: ' + (game.turn() === 'w' ? 'Putih' : 'Hitam');
  }
}
