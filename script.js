const image= document.querySelector('img');
const title= document.getElementById('title');
const artist = document.getElementById('artist')
const music = document.querySelector('audio');
const prevBtn= document.getElementById('prev');
const playBtn= document.getElementById('play');
const nextBtn= document.getElementById('next');
const progressContainer= document.getElementById('progress-container')
const progress= document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration')
// const music
const songs=[
    {
        name:'jacinto-1',
        displayName: 'Song1',
        artist:'WebDev'
    },
    {
        name:'jacinto-2',
        displayName: 'Song2',
        artist:'WebDev'
    },
    {
        name:'jacinto-3',
        displayName: 'Song3',
        artist:'WebDev'
    },

    {
        name:'jacinto-4',
        displayName: 'Song4',
        artist:'WebDev'
    }
    
]
// create a bollean for chzcking if the music is playing
isPlaying = false
// play music function
function playMusic(){
    music.play()
    playBtn.classList.replace('fa-play-circle','fa-pause-circle')
    playBtn.setAttribute('title','Pause')
    isPlaying= true
}
// pause music func
function pauseMusic(){
    music.pause()
    playBtn.classList.replace('fa-pause-circle','fa-play-circle')
    playBtn.setAttribute('title','Play')
    isPlaying= false
}
// add event listener 
playBtn.addEventListener('click',()=>{isPlaying ? pauseMusic(): playMusic()})
// update the DOM
function changeSong(song){
    title.innerText= song.displayName;
    artist.innerText = song.artist;
    music.src=`music/${song.name}.mp3`
    image.src=`img/${song.name}.jpg`

}
let song_index=0;
// prev song func
function prevSong(){
    song_index--;
    if(song_index<0){
        song_index= songs.length -1;
    }

    changeSong(songs[song_index])
    playMusic()
}
// next Song function
function nextSong(){
    
    song_index++;
    if(song_index>songs.length -1){
        song_index =0;
    }
    changeSong(songs[song_index])
    playMusic()
}
// on load select first song

changeSong(songs[song_index])
function  updateProgress(event){
    if(isPlaying){
        const {duration,currentTime}= event.srcElement;
        
        const progressPercent = (currentTime/duration)*100;
        progress.style.width= `${progressPercent}%`;
        // Calculate display for duration
        const durationMin= Math.floor(duration/60);
        let durationSec= Math.floor(duration %60);
        if(durationSec <10){
            durationSec =  `0${durationSec}`
        }

        // delay switching el to avoiud NAN
        if(durationSec){
            durationEl.innerText= `${durationMin}:${durationSec}`;

        }
        // calculatr the display
        const currentMin= Math.floor(currentTime/60);
        let currentSec= Math.floor(currentTime %60);
        if(currentSec <10){
            currentSec =  `0${currentSec}`
        }
        currentTimeEl.innerText = `${currentMin}:${currentSec}`
    }

}
function setProgressBar(e){
    const width = this.clientWidth
    console.log(width)
    const clickX = e.offsetX
    console.log(clickX)
    const {duration}= music;
    // console.log(clickX/width)
    console.log((clickX/width)*duration)
    music.currentTime = (clickX / width)*duration;

}
// add event listener for prev song
prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)
music.addEventListener('ended',nextSong)
music.addEventListener('timeupdate',updateProgress)
progressContainer.addEventListener('click',setProgressBar)