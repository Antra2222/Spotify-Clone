let play = Array.from(document.getElementsByClassName("play"));
let pause = Array.from(document.getElementsByClassName("pause"));
let audio = Array.from(document.getElementsByClassName("song"));
let musicplaypause = Array.from(document.getElementsByTagName("li"));
let length = document.getElementById("songLength");
let seekbar = document.getElementById("seekbar");
let currentSongTime = document.getElementById("currentSongTime");
let masterPlay = Array.from(document.getElementsByClassName("masterPlay"));

let mplay = masterPlay[0].children[1];
let mpause = masterPlay[0].children[2];
let prev = document.getElementById("prev")
let next = document.getElementById("next")

let currentSongIndex = 0;
let previousSong = null;
let prevIndex = -1;

sLength = () => {
let songLength = "0" + Math.floor(audio[currentSongIndex].duration/60) + ":" + Math.floor(audio[currentSongIndex].duration%60);
    length.textContent = `${songLength}`;
}

songTimeUpdate = () => {
    audio[currentSongIndex].addEventListener("timeupdate", () => {
        let currentMinutes = Math.floor(audio[currentSongIndex].currentTime / 60);
        currentSeconds = Math.floor(audio[currentSongIndex].currentTime % 60);

        currentSongTime.textContent = `${currentMinutes} : ${currentSeconds}`
        let progress = (audio[currentSongIndex].currentTime / audio[currentSongIndex].duration) * 100;
        seekbar.value = progress;
    });
}

musicplaypause.forEach((e, i)=> {
play[i].addEventListener("click", () => {

    if(previousSong && previousSong!== audio[i]){
       previousSong.pause();  
       prevIndex = audio.indexOf(previousSong);

       if (prevIndex !== -1) {
        play[prevIndex].style.visibility = "visible";
        pause[prevIndex].style.visibility = "hidden";
    }
    }

    play[i].style.visibility = "hidden";
    pause[i].style.visibility = "visible";
    mpause.style.visibility = "visible"
    mplay.style.visibility = "hidden"

   if(currentSongIndex != 0){
    audio[currentSongIndex].pause();
    play[currentSongIndex].style.visibility = "visible";
    pause[currentSongIndex].style.visibility = "hidden";}
    audio[i].play()
    previousSong = audio[i];
    currentSongIndex = i;

    sLength();
    songTimeUpdate();

    seekbar.addEventListener("input", () => {
        audio[i].currentTime = (seekbar.value * audio[i].duration) / 100;
    });
    // console.log(Math.floor(audio[i].duration/60) + "minutes" + Math.floor(audio[i].duration%60) + "seconds");
});

pause[i].addEventListener("click", () => { 
    pause[i].style.visibility = "hidden";
    play[i].style.visibility = "visible";
    mplay.style.visibility = "visible"
    mpause.style.visibility = "hidden"
    audio[i].pause();
});

audio[i].addEventListener("timeupdate", ()=>{
console.log('timeupdate');
})

})

// MasterPlay
// play song
    mplay.addEventListener("click", () => {
    mpause.style.visibility = "visible"
    mplay.style.visibility = "hidden"
    audio[currentSongIndex].currentTime = 0;
    audio[currentSongIndex].play();
    play[currentSongIndex].style.visibility = "hidden";
    pause[currentSongIndex].style.visibility = "visible";

    sLength();
    songTimeUpdate();

    }) 
    
    // pause song
        mpause.addEventListener("click", () => {
        mplay.style.visibility = "visible"
        mpause.style.visibility = "hidden"
        audio[currentSongIndex].pause();
        play[currentSongIndex].style.visibility = "visible";
        pause[currentSongIndex].style.visibility = "hidden";
        })
    
        // next song
        next.addEventListener("click", ()=> {
        audio[currentSongIndex].pause();
        currentSongIndex = (currentSongIndex + 1) % audio.length;
        audio[currentSongIndex].currentTime = 0;
        audio[currentSongIndex].play();

        mpause.style.visibility = "visible"
        mplay.style.visibility = "hidden"


        play.forEach((btn, index) => {
            btn.style.visibility = index === currentSongIndex ? "hidden" : "visible";
        })
        
        pause.forEach((btn, index) => {
            btn.style.visibility = index === currentSongIndex ? "visible" : "hidden";
            
        });

        sLength();
        songTimeUpdate();
    })

    // prev song
        prev.addEventListener("click", () => {
        audio[currentSongIndex].pause();

        currentSongIndex = (currentSongIndex - 1 + audio.length) % audio.length;
        audio[currentSongIndex].currentTime = 0;
        audio[currentSongIndex].play();

        mplay.style.visibility = "hidden"
        mpause.style.visibility = "visible"

        play.forEach((btn, index) => {btn.style.visibility = index === currentSongIndex ? "hidden" : "visible"});
        pause.forEach((btn, index) => {btn.style.visibility = index === currentSongIndex ? "visible" : "hidden"});

        sLength();
        songTimeUpdate();
    
    });

