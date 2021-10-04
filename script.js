//cards user will be playing with
let card_amount = prompt("Enter amount of cards you want to play with: ");
card_amount = parseInt(card_amount);
console.log(`User chose ${card_amount} cards`);

//the steps user will take to complete
let runtime_counter = (2 ** card_amount) - 1;
let steps_counter = 0;


// function runTime(){

//     if(steps_counter !== runtime_counter){
//         steps_counter++;
//         console.log("STEP " + steps_counter);

//         //playGame
//         // playGame();
        
//         //execute recursive function
//         runTime();

//         playGame(card_amount, "A",  "Target",  "Spare");
//     }

// }

function playGame(n, from_rod,  to_rod,  aux_rod){
    let A_pole = "A";
    let target_pole = "TARGET";
    let spare_pole = "SPARE";

    if(n === 1)
    {
        console.log( `Move disc ${n} from ${from_rod} to ${to_rod}`);
    }
    else
    {
        playGame(n-1, from_rod, aux_rod, to_rod);
        console.log( `Move disc ${n} from ${from_rod} to ${to_rod}`);
        playGame(n-1, aux_rod, to_rod, from_rod);
    }

    

}




//codes to enabe game to be functional starts here
let first_tower_field = document.getElementById("tower1");
let second_tower_field = document.getElementById("tower2");
let third_tower_field = document.getElementById("tower3");

//collective tower
let all_tower_field = [first_tower_field,second_tower_field,third_tower_field];
//store paddle that has been selected
let selected_paddle;
//store field that has selected field
let field_with_selected_paddle;
//tells if a paddle is selected
let selection_tracker = false;
//save score
let score = document.getElementById("score");
//players moves
let player_move = document.getElementById("player_moves");
//increment when a paddle is moved
let player_moves_counter = 0;


//generate paddles base on user input
if(card_amount > 8){
    alert("Maximum Plates to be created is 8");
}
else
{
    for(let i = 1; i <= card_amount; i++){

        let paddles = `
        <div class="blocks" id="block${i}">
            ${i}
        </div>
        `
    
        first_tower_field.insertAdjacentHTML("beforeend", paddles);
    }
}


//all paddles
let all_paddles = document.getElementsByClassName("blocks");
console.log(all_paddles);

// select a paddle by clicking once
function selectPaddle(){
    for(let i = 0; i < card_amount; i++){

        let current_paddle = all_paddles[i];

        current_paddle.addEventListener("click", (e)=>{

            selected_paddle = e.target;
            selected_paddle.style.backgroundColor = "red";
            
            //tell tracker that a paddle has been selected
            selection_tracker = true

            //the field in which the paddle was slected
            field_with_selected_paddle = e.target.parentNode;
        })

    }
    
}


//change selected element location
function changeSelectedElementLocation(){

    
    all_tower_field.forEach(ele=>{
        ele.addEventListener("click", (e)=>{

            if(ele.id === field_with_selected_paddle.id){
                console.log("Same");
            }
            else if( ele.id !== field_with_selected_paddle)
            {
                let prevention_status = preventBigPaddlesFromSittingOnSmall(ele);
                console.log(prevention_status);

                if(selection_tracker === true && prevention_status === true){

                    let new_paddle = `
                    <div class="blocks" id="${selected_paddle.id}">
                        ${selected_paddle.innerText}
                    </div>
                    `
                    ele.insertAdjacentHTML("afterbegin", new_paddle);

                    //delete element from previous field
                    field_with_selected_paddle.removeChild(selected_paddle);
                    console.log(all_paddles);

                    //track player moves
                    trackPlayersMoves();
               }      
                   
               checkWin();

               //update tracker
               selection_tracker = false;
               //add event listner to element with changed locations
               selectPaddle();
            }

        })
       
       
    })
}

//prevent bigger paddles from going on top smaller paddle
function preventBigPaddlesFromSittingOnSmall(destination_field){
    if(destination_field.firstElementChild === null || destination_field.firstElementChild.innerText > selected_paddle.innerText){
        console.log("Element Can be changed");
        return true;
    }
    else
    {
        console.log("Ele can not be change");
        alert("Alert Big Paddles can't go on top Small Paddles");
        selected_paddle.style.backgroundColor = "black";
        return false;
    }
}

//check if user win
function checkWin(){

    let win_status = false;

    let target_field_paddles = second_tower_field.children;
    console.log(target_field_paddles);

    let win_position = [];
    let index_counter = 0;

     //add numbers to win array
    for(let i = 1; i <= card_amount; i++){

        win_position.push(i);
        console.log(win_position);
    }

    // verify wind positions 
    for(let i = 0; i < win_position.length; i++){

        
        if(win_position.length === target_field_paddles.length){

            if(parseInt(target_field_paddles[i].innerText) === win_position[i]){
                console.log("win");

                win_status = true
            }
            
        }
    }

    //increment score
    let score_counter = 0;
    score_counter++
    console.log(win_status);
    console.log(score_counter);

    if(win_status === true){
        score.innerText = "Score:" + score_counter;
    }

}

function trackPlayersMoves(){
    
    player_moves_counter++;
    player_move.innerText = "Player Moves: " + player_moves_counter;
}







//call runTime fnx
playGame(card_amount, "A",  "Target",  "Spare");
selectPaddle();
changeSelectedElementLocation();
// changeSelectedElementLocation();


