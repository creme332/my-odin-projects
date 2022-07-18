const buttonAudio = document.getElementById("buttonsound");
const gameoverAudio = document.getElementById("gameoversound");
const bgsound = document.getElementById("bgsound");

// player life bar 
let playerfills = document.querySelectorAll(".player-healthbar_fill");
let PlayerHealth = 100;
const maxPlayerHP = 100;
const healthLoss = -20; //health points lost when a character loses.

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

// computer life bar 
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

function computerChoice(){
    const choices  = ["rock", "paper", "scissors"];
    let index = Math.floor(Math.random() * 3) //generate random index 0-2
    return choices[index];
}
function winner(playermove, computermove){
    if(playermove==computermove)return "draw";
    const LoseTo = {"rock":"paper","paper":"scissors","scissors":"rock"};
    if(playermove == LoseTo[computermove])return "player";
    return "computer";
}



const buttons = Array.from(document.querySelectorAll(".button"));
let gameOver = false;
// fightAudio.play();

function Battle(e){
   bgsound.play();
   buttonAudio.play(); //play button sound
    let PlayerPressed = e.target.id;
    let computerPressed = computerChoice();
   //  let computerPressed = "rock";
    let playerWeaponImgClass = PlayerPressed + "-background";
    let computerWeaponImgClass = computerPressed + "-background";

    let roundwinner = winner(PlayerPressed, computerPressed);
   //  console.log(PlayerPressed, computerPressed, roundwinner);

   // while current round is ongoing, ignore all other button clicks
    buttons.forEach(btn=>btn.removeEventListener("click", Battle));

    if(roundwinner=="player"){
      //computer weapon must not hit player
      document.documentElement.style.setProperty('--final-computerweapon-position', '210px');
      //player weapon must hit computer
      document.documentElement.style.setProperty('--final-playerweapon-position', '250px');
   }
   if(roundwinner=="computer"){
      document.documentElement.style.setProperty('--final-computerweapon-position', '40px');
      document.documentElement.style.setProperty('--final-playerweapon-position', '60px');
   }
   if(roundwinner=="draw"){
      document.documentElement.style.setProperty('--final-computerweapon-position', '140px');
      document.documentElement.style.setProperty('--final-playerweapon-position', '140px');
   }

    //display character attack animations and display weapon only.
    PlayerCharacter.classList.add("animatePlayerCharacter");
    PlayerWeapon.classList.add(playerWeaponImgClass);
    ComputerCharacter.classList.add("animateComputerCharacter");
    ComputerWeapon.classList.add(computerWeaponImgClass);

    //  When character fight animation ends, start weapon animations
    PlayerCharacter.addEventListener( "animationend",  function() {
        PlayerCharacter.classList.remove("animatePlayerCharacter");  
        PlayerWeapon.classList.add("animatePlayerWeapon");
    } );
    ComputerCharacter.addEventListener( "animationend",  function() {
        ComputerCharacter.classList.remove("animateComputerCharacter");
        ComputerWeapon.classList.add("animateComputerWeapon"); 
    } );

    // remove weapon animation class after weapon animation ends.
    let f1 = function() {
      PlayerWeapon.classList.remove("animatePlayerWeapon"); 
      PlayerWeapon.classList.remove(playerWeaponImgClass); 
      if(roundwinner == "player")updateComputerHealth();
      if(ComputerHealth==0) {
         gameOver = true;
         bgsound.currentTime=0;
         gameoverAudio.play();
         //if computer is dead, make computer crouch.
         document.getElementById('computer').style.backgroundPosition = '-88px ' + '-740px';
      }
   }
    PlayerWeapon.addEventListener( "animationend", f1, {once: true});

    let f2 = function() {
      ComputerWeapon.classList.remove("animateComputerWeapon"); 
      ComputerWeapon.classList.remove(computerWeaponImgClass);  
      if(roundwinner == "computer")updatePlayerHealth();
      if(PlayerHealth==0) {
         gameOver = true;
         bgsound.currentTime=0;
         gameoverAudio.play();
         //if player is dead, make player crouch.
         document.getElementById('player').style.backgroundPosition = '-288px ' + '0px';
      }
      if(gameOver==false){
      // when current round is over, listen again for button clicks
      buttons.forEach(btn=>btn.addEventListener("click", Battle));
      }
   }
    ComputerWeapon.addEventListener( "animationend", f2, {once: true});

}
buttons.forEach(btn=>btn.addEventListener("click", Battle));
renderPlayerHealth(0);
renderComputerHealth(0);
