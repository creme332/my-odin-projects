const PlayerCharacter = document.querySelector("#player");
const ComputerCharacter = document.querySelector("#computer");

const PlayerWeapon = document.querySelector("#player-weapon");
const ComputerWeapon = document.querySelector("#computer-weapon");
const audio = document.getElementById("sound");

// Define animation functions 
function playanimation(){
    audio.currentTime = 0;
    audio.play();
    PlayerCharacter.classList.add("animatePlayerCharacter");
    computerPlay();
}
function computerPlay(){
    ComputerCharacter.classList.add("animateComputerCharacter");
  
    //  Start weapon animation when player animation ends 
    ComputerCharacter.addEventListener( "animationend",  function() {
        ComputerCharacter.classList.remove("animateComputerCharacter");  
        ComputerWeapon.classList.add("animateComputerWeapon");  
} );
}
// Add event listeners 
const buttons = Array.from(document.querySelectorAll(".button"));
buttons.forEach(btn=>btn.addEventListener("click", playanimation));

//  Start weapon animation when player animation ends 
PlayerCharacter.addEventListener( "animationend",  function() {
    PlayerCharacter.classList.remove("animatePlayerCharacter");  
    PlayerWeapon.classList.add("animatePlayerWeapon");  
} );
PlayerWeapon.addEventListener( "animationend",  function() {
    PlayerWeapon.classList.remove("animatePlayerWeapon");    
} );
ComputerWeapon.addEventListener( "animationend",  function() {
    ComputerWeapon.classList.remove("animateComputerWeapon");    
} );
playerPlay();
computerPlay();