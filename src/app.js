import "bootstrap";
import "./style.css";

let startingBoard = ["", "", "", "", "", "", "", "", ""]
let actualPlayer = "X"
let activeGame = true

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

const motion = (e) => {
  const element = e.currentTarget;
  const index = element.getAttribute('data-index');

  if (startingBoard[index] !== "" || !activeGame) return;

  startingBoard[index] = actualPlayer;
  element.innerHTML = `<h1>${actualPlayer}</h1>`;
  checkResult();
}

const checkResult = () => {
  let roundWin = false
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i]
    if (startingBoard[a] && startingBoard[a] === startingBoard[b] && startingBoard[a] === startingBoard[c]) {
      roundWin = true
    }
  }
  if (roundWin) {
    alert(`Player ${actualPlayer} has won.`)
    activeGame = false
    return
  }
  if (!startingBoard.includes("")) {
    alert(`Draw!`)
  }
  actualPlayer = actualPlayer === "X" ? "O" : "X";
}

document.getElementById('restart').addEventListener('click', () => {
  startingBoard = ["", "", "", "", "", "", "", "", ""];
  activeGame = true;
  actualPlayer = "X";
  document.querySelectorAll('.box').forEach(b => b.innerHTML = "");
})
document.querySelectorAll('.box').forEach(box => {
  box.addEventListener('click', motion);
});