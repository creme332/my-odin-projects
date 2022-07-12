
let choices = ["rock", "paper", "scissors"];

function computerplay(){
    let randomIndex = parseInt(Math.random()*choices.length); 
    return choices[randomIndex];
}
function ValidUserInput(playerselection){
    if (choices.indexOf(playerselection.toLowerCase()) != -1){
        return 1;
    }
    return 0;
}
function Round(computerselection, playerselection){
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
console.log(Round("rock","rocky"));