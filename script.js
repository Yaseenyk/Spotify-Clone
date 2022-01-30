

console.log("welcome  to spotify");
//Variables
let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let audioElement = new Audio('./songs/1.mp3');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
//audioElement.play();
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName : "Let Me Love You", filePath : "./songs/1.mp3", coverPath : "./covers/1.jpg", duration : "05:03"},
    {songName : "Hey There Girl", filePath : "./songs/2.mp3", coverPath : "./covers/2.jpg", duration : "04:58"},
    {songName : "Brown Munde", filePath : "./songs/3.mp3", coverPath : "./covers/3.jpg", duration : "03:45"},
    {songName : "Hale Dil", filePath : "./songs/4.mp3", coverPath : "./covers/4.jpg", duration : "06:44"},
    {songName : "Ishq", filePath : "./songs/5.mp3", coverPath : "./covers/5.jpg", duration : "01:03"},
    {songName : "Salame Ishq", filePath : "./songs/6.mp3", coverPath : "./covers/6.jpg", duration : "03:45"}
];

songItems.forEach((element, i) =>{
    
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
    element.getElementsByClassName('timeStamp')[0].innerText = songs[i].duration;
    

})

//Handle Play Pause
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //Update seek bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
        element.classList.add('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e) =>{
        console.log(e.target);
        makeAllPlays();
        
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=6){
        console.log('next');
    songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        
    songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})