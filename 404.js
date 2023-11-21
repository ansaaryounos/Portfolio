const humanPlayer = 'h_marked';
const aiPlayer = 'a_marked';
const clickable = 'unmarked';

const h_img = '/Portfolio/img/404/four.png';
const a_img = '/Portfolio/img/404/zero.png';

const combs = [
    [0,1,2], 
    [3,4,5], 
    [6,7,8],
    [0,3,6], 
    [1,4,7], 
    [2,5,8],
    [0,4,8], 
    [2,4,6]];

const cells = document.querySelectorAll('.cell');

let playerWin;
let canClick = true;
let tc = 0;
let aiCalculting = false;

Start(cells);

function Start(cells) {

    for (let cell of cells) {
        cell.addEventListener('click', function PlaceMark() {

            let selectedCell = document.getElementById(this.id + 'p');

            //Add the Player's Mark
            if (cell.dataset.marked == clickable && canClick) {
                selectedCell.src = h_img;
                selectedCell.classList.remove('mark');
                selectedCell.classList.add('mark-applied');
                tc++;
                canClick = false;
                cell.dataset.marked = humanPlayer;
                this.removeEventListener('click', PlaceMark);

                console.log('clicked one time');

                //Check for Player Victory
                if (IsVictory(cells) && playerWin) {
                    return;
                }

                //Check for Draw
                // else if (tc == 10) {
                //     alert("draw");
                // }

                //Add the Ai's Mark
                AiMove(cells);
            }
        })
    };
}

//Return true if there is a combination
function IsVictory(cells) {

    for (let comb of combs) {
        if(cells[comb[0]].dataset.marked == cells[comb[1]].dataset.marked &&
            cells[comb[1]].dataset.marked == cells[comb[2]].dataset.marked &&
            cells[comb[0]].dataset.marked != clickable) {

                if (cells[comb[0]].dataset.marked == humanPlayer) { 
                    playerWin = true;
                } else if (cells[comb[0]].dataset.marked == aiPlayer){
                    playerWin = false;
                }

                if (!aiCalculting) {

                    setTimeout(()=> {
                        cells[comb[0]].style.backgroundColor = '#353535';
                        cells[comb[1]].style.backgroundColor = '#353535';
                        cells[comb[2]].style.backgroundColor = '#353535';
                    }, 1000)

                    canClick = false;
                }

                return true;
            }
    }

    return false;
}

//The AI places a Mark
function AiMove(cells) {

    aiCalculting = true;
    //Find Available Cells 
    let availableCells = [];
    
    for (let i = 0; i < cells.length; i++) {

        if (cells[i].dataset.marked == clickable) {
            availableCells.push(cells[i]);
        }
    }

    if (availableCells.length > 0) {

        let winMoves = []; //Moves that cause the AI to win
        let saveMoves = []; //Moves that save the AI from losing

        for (let j = 0; j < availableCells.length; j++) {

            availableCells[j].classList.remove('hover');
            
            //Find all the Winning Moves
            availableCells[j].dataset.marked = aiPlayer;
            if (IsVictory(cells) && !playerWin) {
                winMoves.push(availableCells[j]);
            }
            availableCells[j].dataset.marked = clickable;

            //Find all the Saving Moves
            availableCells[j].dataset.marked = humanPlayer;
            if (IsVictory(cells) && playerWin) {
                saveMoves.push(availableCells[j]);
            }
            availableCells[j].dataset.marked = clickable;

            console.log("bug");
        }

        let selected;
        let aiCell;

        if (winMoves.length > 0) {

            selected = winMoves[Math.floor(Math.random()*winMoves.length)]

        } else if (saveMoves.length > 0) {

            selected = saveMoves[Math.floor(Math.random()*saveMoves.length)]

        } else {

            selected = availableCells[Math.floor(Math.random()*availableCells.length)]
        }

        selected.dataset.marked = aiPlayer;
        aiCell = document.getElementById(selected.id + 'p')
        aiCell.src = a_img;

        setTimeout(()=> {
            aiCell.classList.remove('mark');
            aiCell.classList.add('mark-applied');
            

            for (let j = 0; j < availableCells.length; j++) {
                availableCells[j].classList.add('hover');
            }

        },1000)

        console.log(winMoves);
        console.log(saveMoves);

        winMoves = [];
        saveMoves = []
        aiCalculting = false;
    }

    tc++;
    canClick = true;

    //Check for AI Victory
    if (IsVictory(cells) && !playerWin) {
        return;
    }
    //Check for Draw
    // else if (tc == 10) {
    //     alert("draw");
    // }
}