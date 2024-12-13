const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// lets create a function to initialise a game 

function initGame(){
    currentPlayer ="X";
    gameGrid =["","","","","","","","",""];
    newGamebtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    boxes.forEach((box,index)=>{
        box.innerText ="";
        boxes [index].style.pointerEvents="all";
        // one more thing is missing, initialise box with css properties aga
            box.classList = `box box${index+1}`;
    });


    newGamebtn.classList.remove("active");
    gameInfoinnerText = `Current Player — ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O" ;
    }else{
        currentPlayer="X";
    }
    // UI UPdate 

    gameInfo.innerHTML =`CurrentPlayer - ${currentPlayer}`;
}

function checkGameOver(){
    // newGamebtn.classList.add("active");

    let answer ="";
    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="")
        && (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]])){
            
            if(gameGrid[position[0]] === "X")
                answer ="X";
            else
               answer= "O";


            //    disablw pointer event 

            boxes.forEach((box)=>{
                box.style.pointerEvents ="none";
            })
            //    color change to green for winners X/O

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");    

        }
    });



    if(answer!==""){
        gameInfo.innerText =`Winner Player - ${currentPlayer}`;
        newGamebtn.classList.add("active");
        return; 
    }

    // when player is no winner for tied 

    let fillcount = 0;
    gameGrid.forEach((box)=>{
        if(box !=="" ){
            fillcount++;
        }
    });

// if board is filled then GAMe will Tie !!


if(fillcount === 9){
    gameInfo.innerText = "Game Tied !";
    newGamebtn.classList.add("active");
}

}

// har kisi par click ho yega toh - index dega kaha click hua hea 
function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText= currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents ="none";

        
        // turn badlo 
        swapTurn();
        // check koi jeet toh nahi gaya 
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGamebtn.addEventListener("click", initGame);
