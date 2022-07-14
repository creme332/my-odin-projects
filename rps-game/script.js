const PlayerWeapon = document.querySelector("#player-weapon");
const audio = document.getElementById("sound");

function playanimation(){
    audio.play();
    PlayerWeapon.classList.add("animate");
}
const buttons = Array.from(document.querySelectorAll(".button"));
buttons.forEach(btn=>btn.addEventListener("click", playanimation));
PlayerWeapon.addEventListener( "animationend",  function() {
    PlayerWeapon.classList.remove("animate");    
} );