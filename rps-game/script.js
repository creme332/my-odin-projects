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
// Define animation functions 
function Battle(e){
    let PlayerPressed = e.target.id;
    let computerPressed = computerChoice();
    let playerWeaponImgClass = PlayerPressed + "-background";
    let computerWeaponImgClass = computerPressed + "-background";

    console.log(playerWeaponImgClass, computerWeaponImgClass);
    audio.currentTime = 0;
    audio.play();

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
    
        } );
        ComputerWeapon.addEventListener( "animationend",  function() {
            ComputerWeapon.classList.remove("animateComputerWeapon"); 
            ComputerWeapon.classList.remove(computerWeaponImgClass);  
        } );
}

// Add event listeners 
const buttons = Array.from(document.querySelectorAll(".button"));
buttons.forEach(btn=>btn.addEventListener("click", Battle));