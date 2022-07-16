let playerfills = document.querySelectorAll(".player-healthbar_fill");
let PlayerHealth = 100;
const maxPlayerHP = 100;
const healthLoss = -10; //health points lost when a character loses.

function renderPlayerHealth() {
   var percent = PlayerHealth / maxPlayerHP * 100;
   //Update color
   document.documentElement.style.setProperty('--player-bar-fill', '#57e705');
   document.documentElement.style.setProperty('--player-bar-top',  '#6aff03');
   
   if (percent <= 50) { //yellows
      document.documentElement.style.setProperty('--player-bar-fill', '#d6ed20');
      document.documentElement.style.setProperty('--player-bar-top',  '#d8ff48');   
   }
   if (percent <= 25) { //reds
      document.documentElement.style.setProperty('--player-bar-fill', '#ec290a');
      document.documentElement.style.setProperty('--player-bar-top',  '#ff3818');
   }

   playerfills.forEach(fill => {
      fill.style.width = percent+"%";
   })   
}

function updatePlayerHealth() {
   PlayerHealth += healthLoss;
   PlayerHealth = PlayerHealth > maxPlayerHP ? maxPlayerHP : PlayerHealth;
   PlayerHealth = PlayerHealth < 0 ? 0 : PlayerHealth;
   renderPlayerHealth();
}


let ComputerHealth = 100;
const maxComputerHP = 100;
let computerfills = document.querySelectorAll(".computer-healthbar_fill");
function renderComputerHealth() {
   var percent = ComputerHealth / maxComputerHP * 100;
   //Update color
   document.documentElement.style.setProperty('--computer-bar-fill', '#57e705');
   document.documentElement.style.setProperty('--computer-bar-top',  '#6aff03');
   
   if (percent <= 50) { //yellows
      document.documentElement.style.setProperty('--computer-bar-fill', '#d6ed20');
      document.documentElement.style.setProperty('--computer-bar-top',  '#d8ff48');   
   }
   if (percent <= 25) { //reds
      document.documentElement.style.setProperty('--computer-bar-fill', '#ec290a');
      document.documentElement.style.setProperty('--computer-bar-top',  '#ff3818');
   }

   computerfills.forEach(fill => {
      fill.style.width = percent+"%";
   })   
}

function updateComputerHealth() {
    ComputerHealth += healthLoss;
    ComputerHealth = ComputerHealth > maxComputerHP ? maxComputerHP : ComputerHealth;
    ComputerHealth = ComputerHealth < 0 ? 0 : ComputerHealth;
   renderComputerHealth();
}

const PlayerCharacter = document.querySelector("#player");
const ComputerCharacter = document.querySelector("#computer");

const PlayerWeapon = document.querySelector("#player-weapon");
const ComputerWeapon = document.querySelector("#computer-weapon");
const audio = document.getElementById("sound");

function computerChoice(){
    const choices  = ["rock", "paper", "scissors"];
    let index = Math.floor(Math.random() * 3) //generate indice 0-2
    return choices[index];
}
function winner(playermove, computermove){
    if(playermove==computermove)return "draw";
    const LoseTo = {"rock":"paper","paper":"scissors","scissors":"rockk"};
    if(playermove == LoseTo[computermove])return "player";
    return "computer";
}

function Battle(e){
    let PlayerPressed = e.target.id;
    // let computerPressed = computerChoice();
    let computerPressed = "rock";
    let playerWeaponImgClass = PlayerPressed + "-background";
    let computerWeaponImgClass = computerPressed + "-background";

    let roundwinner = winner(PlayerPressed, computerPressed);
    console.log(roundwinner);

    console.log(playerWeaponImgClass, computerWeaponImgClass);
    audio.currentTime = 0;
    audio.play(); //play button sound

    //display character animations
    PlayerCharacter.classList.add("animatePlayerCharacter");
    PlayerWeapon.classList.add(playerWeaponImgClass);
    ComputerCharacter.classList.add("animateComputerCharacter");
    ComputerWeapon.classList.add(computerWeaponImgClass);

    //  Start weapon animations when character animations ends 
    PlayerCharacter.addEventListener( "animationend",  function() {
        PlayerCharacter.classList.remove("animatePlayerCharacter");  
        PlayerWeapon.classList.add("animatePlayerWeapon");
    } );

    ComputerCharacter.addEventListener( "animationend",  function() {
        ComputerCharacter.classList.remove("animateComputerCharacter");
        ComputerWeapon.classList.add("animateComputerWeapon"); 
    } );

    // remove weapon animation class for all weapons after weapon animation ends.
    PlayerWeapon.addEventListener( "animationend",  function() {
        PlayerWeapon.classList.remove("animatePlayerWeapon"); 
        PlayerWeapon.classList.remove(playerWeaponImgClass); 
        if(roundwinner == "player")updateComputerHealth();
    } );
    ComputerWeapon.addEventListener( "animationend",  function() {
        ComputerWeapon.classList.remove("animateComputerWeapon"); 
        ComputerWeapon.classList.remove(computerWeaponImgClass);  
        if(roundwinner == "computer")updatePlayerHealth();
    } );


}

const buttons = Array.from(document.querySelectorAll(".button"));
buttons.forEach(btn=>btn.addEventListener("click", Battle));


renderPlayerHealth(0);
renderComputerHealth(0);

