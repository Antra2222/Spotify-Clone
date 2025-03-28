let play = Array.from(document.getElementsByClassName("play"));
let pause = Array.from(document.getElementsByClassName("pause"));
let audio = Array.from(document.getElementsByClassName("song"));
let musicplaypause = Array.from(document.getElementsByTagName("li"));
let length = document.getElementById("songLength");
let seekbar = document.getElementById("seekbar");
let currentSongTime = document.getElementById("currentSongTime");

let previousSong = null;
musicplaypause.forEach((element, i)=> {
play[i].addEventListener("click", () => {

    if(previousSong && previousSong !== audio[i]){
       previousSong.pause();
       let prevIndex = audio.indexOf(previousSong);
       play[prevIndex].style.visibility = "visible";
       pause[prevIndex].style.visibility = "hidden";
    }

    play[i].style.visibility = "hidden";
    pause[i].style.visibility = "visible";
    audio[i].play()
    previousSong = audio[i];

    let songLength = "0" + Math.floor(audio[i].duration/60) + ":" + Math.floor(audio[i].duration%60);
    length.textContent = `${songLength}`;

    audio[i].addEventListener("timeupdate", () => {
        let currentMinutes = Math.floor(audio[i].currentTime / 60);
        currentSeconds = Math.floor(audio[i].currentTime % 60);
        currentSongTime.textContent = `${currentMinutes} : ${currentSeconds}`
        let progress = (audio[i].currentTime / audio[i].duration) * 100;
        seekbar.value = progress;
    });

    seekbar.addEventListener("input", () => {
        audio[i].currentTime = (seekbar.value * audio[i].duration) / 100;
    });
    // console.log(Math.floor(audio[i].duration/60) + "minutes" + Math.floor(audio[i].duration%60) + "seconds");
});
pause[i].addEventListener("click", () => { 
    pause[i].style.visibility = "hidden";
    play[i].style.visibility = "visible";
    audio[i].pause()
});
audio[i].addEventListener("timeupdate", ()=>{
console.log('timeupdate')
})
})

// MasterPlay

let masterPlay = Array.from(document.getElementsByClassName("masterPlay"));
console.log(masterPlay[0].firstElementChild)
let mplay = masterPlay[0].children[1];
let mpause = masterPlay[0].children[2];

// play song
mplay.addEventListener("click", () => {
mpause.style.visibility = "visible"
mplay.style.visibility = "hidden"


audio[0].play()

}) 

// pause song
mpause.addEventListener("click", () => {
    mplay.style.visibility = "visible"
    mpause.style.visibility = "hidden"
    audio[0].pause()
    })
