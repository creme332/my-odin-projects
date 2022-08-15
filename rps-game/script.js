const buttonAudio = document.getElementById("buttonsound");
const gameoverAudio = document.getElementById("gameoversound");
const bgsound = document.getElementById("bgsound");
const fightsound = document.getElementById("fightsound");
bgsound.volume = 0.2;
buttonAudio.volume = 0.1;
gameoverAudio.volume = 0.1;

// player life bar 
let playerfills = document.querySelectorAll(".player-healthbar_fill");
let PlayerHealth = 100;
const maxPlayerHP = 100;
const healthLoss = -20; //health points lost when a character loses.

function renderPlayerHealth() {
   var percent = PlayerHealth / maxPlayerHP * 100;
   //Update color
   document.documentElement.style.setProperty('--player-bar-fill', '#57e705');
   document.documentElement.style.setProperty('--player-bar-top', '#6aff03');

   if (percent <= 50) { //yellows
      document.documentElement.style.setProperty('--player-bar-fill', '#d6ed20');
      document.documentElement.style.setProperty('--player-bar-top', '#d8ff48');
   }
   if (percent <= 25) { //reds
      document.documentElement.style.setProperty('--player-bar-fill', '#ec290a');
      document.documentElement.style.setProperty('--player-bar-top', '#ff3818');
   }

   playerfills.forEach(fill => {
      fill.style.width = percent + "%";
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
   document.documentElement.style.setProperty('--computer-bar-top', '#6aff03');

   if (percent <= 50) { //yellows
      document.documentElement.style.setProperty('--computer-bar-fill', '#d6ed20');
      document.documentElement.style.setProperty('--computer-bar-top', '#d8ff48');
   }
   if (percent <= 25) { //reds
      document.documentElement.style.setProperty('--computer-bar-fill', '#ec290a');
      document.documentElement.style.setProperty('--computer-bar-top', '#ff3818');
   }

   computerfills.forEach(fill => {
      fill.style.width = percent + "%";
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

function computerChoice() {
   const choices = ["rock", "paper", "scissors"];
   let index = Math.floor(Math.random() * 3) //generate random index 0-2
   return choices[index];
}
function winner(playermove, computermove) {
   if (playermove == computermove) return "draw";
   const LoseTo = { "rock": "paper", "paper": "scissors", "scissors": "rock" };
   if (playermove == LoseTo[computermove]) return "player";
   return "computer";
}



const buttons = Array.from(document.querySelectorAll(".button"));
let gameOver = false;
let alreadyPlayedFight = false;
//play standing animations
ComputerCharacter.classList.add("animateComputerStanding");
PlayerCharacter.classList.add("animatePlayerStanding");

function Battle(e) {
   //play sounds
   bgsound.play(); //play background music
   buttonAudio.play(); //play button sound
   if (!alreadyPlayedFight) {
      fightsound.play();
      alreadyPlayedFight = true;
   }

   let PlayerPressed = e.target.id;
   let computerPressed = computerChoice();
   //  let computerPressed = "rock";
   let playerWeaponImgClass = PlayerPressed + "-background";
   let computerWeaponImgClass = computerPressed + "-background";

   let roundwinner = winner(PlayerPressed, computerPressed);
   console.log(PlayerPressed, computerPressed, roundwinner);

   // while current round is ongoing, ignore all other button clicks
   buttons.forEach(btn => btn.removeEventListener("click", Battle));

   //decide how far each weapon should go
   if (roundwinner == "player") {
      //computer weapon must not hit player
      document.documentElement.style.setProperty('--final-computerweapon-position', '210px');
      //player weapon must hit computer
      document.documentElement.style.setProperty('--final-playerweapon-position', '250px');
   }
   if (roundwinner == "computer") {
      document.documentElement.style.setProperty('--final-computerweapon-position', '40px');
      document.documentElement.style.setProperty('--final-playerweapon-position', '88px');
   }
   if (roundwinner == "draw") {
      document.documentElement.style.setProperty('--final-computerweapon-position', '140px');
      document.documentElement.style.setProperty('--final-playerweapon-position', '140px');
   }

   //display weapons
   PlayerWeapon.classList.add(playerWeaponImgClass);
   ComputerWeapon.classList.add(computerWeaponImgClass);

   //animate attacks 
   PlayerCharacter.classList.add("animatePlayerAttack");
   ComputerCharacter.classList.add("animateComputerAttack");

   //  When character attack animation ends, 
   // animate weapons and resume standing animation
   PlayerCharacter.addEventListener("animationend", function () {
      PlayerCharacter.classList.remove("animatePlayerAttack");
      PlayerWeapon.classList.add("animatePlayerWeapon");
   }, { once: true });
   ComputerCharacter.addEventListener("animationend", function () {
      ComputerCharacter.classList.remove("animateComputerAttack");
      ComputerWeapon.classList.add("animateComputerWeapon");
   }, { once: true });

   // when weapon animation ends, hide weapon class and remove animation class.
   let f1 = function () {
      PlayerWeapon.classList.remove("animatePlayerWeapon");
      PlayerWeapon.classList.remove(playerWeaponImgClass);
      if (roundwinner == "player") {
         updateComputerHealth();
         //take damage and stand again.
         ComputerCharacter.classList.remove("animateComputerStanding");
         ComputerCharacter.classList.add("animateComputerHit");
         ComputerCharacter.addEventListener("animationend", function () {
            ComputerCharacter.classList.remove("animateComputerHit");
            ComputerCharacter.classList.add("animateComputerStanding");
         }, { once: true });
      }
      if (ComputerHealth == 0) { //game over
         //stop animations
         ComputerCharacter.classList.remove("animateComputerHit");
         ComputerCharacter.classList.remove("animateComputerStanding");
         gameOver = true;
         bgsound.currentTime = 0;
         gameoverAudio.play();
         //make computer crouch.
         document.getElementById('computer').style.backgroundPosition = '-88px ' + '-740px';
      }
   }
   PlayerWeapon.addEventListener("animationend", f1, { once: true });

   let f2 = function () {
      //hide weapon
      ComputerWeapon.classList.remove("animateComputerWeapon");
      ComputerWeapon.classList.remove(computerWeaponImgClass);

      if (roundwinner == "computer") {
         updatePlayerHealth();
         //take damage and stand again.
         PlayerCharacter.classList.remove("animatePlayerStanding");
         PlayerCharacter.classList.add("animatePlayerHit");
         PlayerCharacter.addEventListener("animationend", function () {
            PlayerCharacter.classList.remove("animatePlayerHit");
            PlayerCharacter.classList.add("animatePlayerStanding");
         }, { once: true });
      }
      if (PlayerHealth == 0) {
         PlayerCharacter.classList.remove("animatePlayerHit");
         PlayerCharacter.classList.remove("animatePlayerStanding");
         gameOver = true;
         bgsound.currentTime = 0;
         gameoverAudio.play();
         //if player is dead, make player crouch.
         document.getElementById('player').style.backgroundPosition = '0px -720px';
      }
      // when current round is over, listen again for button clicks
      if (gameOver == false) {
         buttons.forEach(btn => btn.addEventListener("click", Battle));
      }
   }
   ComputerWeapon.addEventListener("animationend", f2, { once: true });
}
buttons.forEach(btn => btn.addEventListener("click", Battle));
renderPlayerHealth(0);
renderComputerHealth(0);
