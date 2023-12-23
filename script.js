let playerText = document.getElementById('header');
let resetBtn = document.querySelector('.resetbtn');
let boxes = Array.from(document.getElementsByClassName('box'));
//Get the color with which the winning blocks are to be highlighted
let winner = getComputedStyle(document.body).getPropertyValue("--winning-blocks");
let normal = getComputedStyle(document.body).getPropertyValue("--normal");
let wrong  = getComputedStyle(document.body).getPropertyValue("--wrong");
console.log(playerText);
let divcol = getComputedStyle(document.body).getPropertyValue("--purple");
let divpur = getComputedStyle(document.body).getPropertyValue("--divpur");
let container = document.querySelector('.wrapper');
const O_TEXT ="O";
const X_TEXT = "X";
let currentplayer = X_TEXT;

let spaces = Array(9).fill(null);
console.log(spaces);

const startGame = () => {
    boxes.forEach(box => box.addEventListener("click", boxClicked))
}

const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
]

function playerHasWon() {
    for(const cond of winningCombos){
        let [a,b,c] = cond;

        if(spaces[a] && (spaces[a]==spaces[b] && spaces[a]==spaces[c])){
            return [a,b,c];
        }
        
    }
    return false;
}
let count = 0;
function boxClicked(e) {
    const id = e.target.id;
    if(!spaces[id] && count<9){
        spaces[id] = currentplayer;
        e.target.innerText=currentplayer;

        if(playerHasWon()!==false){
            playerText.innerHTML = `${currentplayer} wins!!!`
            let winningblocks = playerHasWon();
            console.log(winningblocks);
            count=10;
            winningblocks.map(box => boxes[box].style.backgroundColor=winner);
            //restart();
            return;
        }
        count++;
        currentplayer = currentplayer==X_TEXT ? O_TEXT: X_TEXT;
    }
    if(count==9){
        playerText.innerHTML = 'DRAW GAME!';
        //boxes.forEach(box => box.style.color= wrong)
        playerText.style.color = wrong;
    }
}

resetBtn.addEventListener("click", restart);
function restart (){
    spaces.fill(null);
    count=0;
    playerText.innerHTML = "TicTacToe";
    currentplayer = X_TEXT;
    boxes.forEach(box => {
        box.innerText = "";
        box.style.backgroundColor= normal;
    })
    playerText.style.color = divcol;
    container.style.backgroundColor = normal;
}


startGame();

