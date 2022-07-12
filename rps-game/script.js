
let choices = ["rock", "paper", "scissors"];

function ComputerPlay(){
    let randomIndex = parseInt(Math.random()*choices.length); 
    return choices[randomIndex];
}
function ValidUserInput(playerselection){
    if (choices.indexOf(playerselection.toLowerCase()) != -1){
        return 1;
    }
    return 0;
}
function Battle(computerselection, playerselection){
    let LoseTo = {"rock":"paper", "paper":"scissors","scissors":"rock"};
    if(ValidUserInput(playerselection)){
        if(computerselection == playerselection.toLowerCase()){
            return "Draw!";
        }
        if(computerselection == LoseTo[playerselection.toLowerCase()]){
            return `You Lose! ${computerselection} beats ${playerselection}`;
        }else{
            return `You Win! ${playerselection} beats ${computerselection}`;
        }
    }
    return "Invalid input!";
}
function game(){
    const rounds = prompt("Enter number of rounds");
    for(let i = 0; i<rounds; i++){
        let playerselection = prompt("Choose one : rock, paper, scissors");
        let computerselection = ComputerPlay();
        let result =Battle(computerselection, playerselection);
        console.log(result);
    }
}
game();
