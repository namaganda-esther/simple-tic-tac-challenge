const PLAYER_X_CLASS = "x";
const PLAYER_O_CLASS = "circle";
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]; 
// we used the id tags we assigned in the index.html to save the values of all the board elements, winning message and the restart button. 
// For this we used the JavaScript method getElementById(). 
// For the winning message text element we used the querySelector() method which returns the first element within the document that matches the specified selector. We also used the squared brackets ([]) to target the data-cell attribute.

const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winningMessageText')
let isPlayer_O_Turn = false

// We set the isPlayer_O_Turn variable to false, meaning the first to play will be an x character
// The rest of the function removes all the characters left from previous gameplay. 
// Here we also trigger the events which may happen on our board, which are the mouse clicks.
startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
	isPlayer_O_Turn = false
	cellElements.forEach(cell => {
		cell.classList.remove(PLAYER_X_CLASS)
		cell.classList.remove(PLAYER_O_CLASS)
		cell.removeEventListener('click', handleCellClick)
		cell.addEventListener('click', handleCellClick, { once: true })
	})
	setBoardHoverClass()
	winningMessageElement.classList.remove('show')
}

// we handle the mouse click events for the cells in the board.
// the currentClass variable saves the character (X or O),
//  whose turn it is at the moment. Another function is 
// used in the if statement to check if someone has already
//  won by comparing the winning combinations to the gameplay
function handleCellClick(e) {
	const cell = e.target
	const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS
	placeMark(cell, currentClass)
	if (checkWin(currentClass)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
		swapTurns()
		setBoardHoverClass()
	}
}

// winningMessageElement.classList.remove("show");
function endGame(draw){
    if (draw) {
        winningMessageTextElement.innerText = "Its a draw";
    }
    else{
        winningMessageTextElement.innerText = `Player with ${isPlayer_O_Turn ? "O's" : "X's"} wins!`;
    }
    winningMessageTextElement.classList.add("show");
}



// function that returns the value in case there is a draw
function isDraw() {
	return [...cellElements].every(cell => {
		return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS)
	})
}

// places the character in the cell. currentClass being either an X or an O depending on whose turn it is. 
function placeMark(cell, currentClass) {
	cell.classList.add(currentClass)
}

function swapTurns() {
	isPlayer_O_Turn = !isPlayer_O_Turn
}

// we will set the cursor hovering effect onto the board. 
// This will make it easier for the player to aim at the cells. 
// It also makes our game a bit more responsive.
function setBoardHoverClass() {
	boardElement.classList.remove(PLAYER_X_CLASS)
	boardElement.classList.remove(PLAYER_O_CLASS)
	if (isPlayer_O_Turn) {
		boardElement.classList.add(PLAYER_O_CLASS)
	} else {
		boardElement.classList.add(PLAYER_X_CLASS)
	}
}

// checks if our board matches any of the winning combinations.
function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})
}