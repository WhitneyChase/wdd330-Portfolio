const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const winningCombos = [
    [0,1,2], 
    [3,4,5], 
    [6,7,8], 
    [0,3,6], 
    [1,4,7], 
    [2,5,8], 
    [0,4,8], 
    [2,4,6], 
]
const cellElements = document.querySelectorAll('[data-call]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]') 
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame(){
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once:true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e){
    const cell = e.target 
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS

    //placeMark
    placeMark(cell, currentClass)

    //Check for a Win 
    if(checkWin(currentClass)){
        endGame(flase)
    } else if (isDraw()){
        endGame(true)
    } else{
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw){
    if (draw){
        winningMessageTextElement.innerText = 'Draw!'
    }else{
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}


function isDraw(){
    //you can destrucure an element to make the cellElement an array
    return [...cellElements].every(cell => {
       return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS) 
    })
}


function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS) 
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return winningCombos.some(combination => {
        return combination.every(index => {
            //if the current class is present in all of the numbers in a winning 
            //combos array
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
















// function game(){

// }
// function turn(){

// }
// divNames = ['topLeft', 'topMid','topRight','midLeft','midMid','midRight','bottomLeft', 'bottomMid', 'bottomRight'];

// for(var i =0; i < 9; i++){
//     document.getElementById(divNames[i]).addEventListener('click', clickDiv(divNames[i]));
// }
// function clickDiv(val) {
//     if(document.getElementById(val).value == 'X' || document.getElementById(val).value == 'O'){
//         alert("This Space is Occupied.");
//     }else{
//         addXorO(val);
//     }
// }
// function addXorO(cell){
//     if(player.name == 'Player 1'){document.getElementById(cell).innerHTML('X');}
//     else{document.getElementById(cell).innerHTML('O');}
// }