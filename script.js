 const songName = document.getElementById('song-name');
 const song = document.getElementById('audio');
 const play = document.getElementById('play');
 const bandName = document.getElementById('band-name');
 const cover = document.getElementById('cover')
 const next = document.getElementById('next');
 const previous = document.getElementById('previous');
 const likeButton = document.getElementById('like');
 const currentProgress= document.getElementById('current-progress');
 const progressContainer= document.getElementById('progress-container');
 const shuffleButton = document.getElementById('shuffle');
 const repeatButton = document.getElementById('repeat');
 const songTime = document.getElementById('song-time');
 const totalTime = document.getElementById('total-time');


const AteQueDurou = {
  songName: 'Até que Durou',
  artist:'Pericles',
  imagem: 'pericles',
  music:'pericles-ate-que-durou',
  liked: false,
}
const MelhorEuIr = {
  songName: 'Melhor eu Ir',
  artist:'Pericles',
  imagem: 'pericles',
  music:'pericles-melhor-eu-ir',
  liked: false,
}
const SeEuLargarFreio = {
  songName: 'Se eu Largar o Freio',
  artist:'Pericles',
  imagem: 'pericles',
  music:'pericles-se-eu-largar-o-freio',
  liked: false,
}
const FaltaVoce = {
  songName: 'Falta você',
  artist:'Thiaguinho',
  imagem: 'thiaguinho01',
  music:'FALTA VOCÊ',
  liked: false,
}
const PontoFraco = {
  songName: 'Ponto Fraco',
  artist:'Thiaguinho',
  imagem: 'Thiaguinho',
  music:'Ponto Fraco',
  liked: false,
}
const DeixaAcontecer = {
  songName: 'Deixa Acontecer',
  artist:'Grupo Revelacão',
  imagem: 'grupoRevelação',
  music:'deixa acontecer',
  liked: false,
}
const TaEscrito = {
  songName: 'Tá Escrito',
  artist:'Grupo Revelacão',
  imagem: 'grupoRevelação',
  music:'tá escrito',
  liked: false,
}
const Clareou = {
  songName: 'Clareou',
  artist:'Diego Nogueira',
  imagem: 'Diego Nogueira',
  music:'Clareou',
  liked: false,
}
const PeNaAreia = {
  songName: 'Pé na Areia',
  artist:'Diego Nogueira',
  imagem: 'Diego Nogueira',
  music:'Pé na Areia',
  liked: false,
}
let isPlaying = false;
let isShuffled = false;
let repeatOn = false;


const originalplaylist =JSON.parse(localStorage.getItem('playlist')) ??[AteQueDurou,MelhorEuIr,SeEuLargarFreio,FaltaVoce,PontoFraco,DeixaAcontecer,TaEscrito,Clareou,PeNaAreia];
let sortedPlaylist = [...originalplaylist];

let index = 0;


 function playSong(){
  play.querySelector('.bi').classList.remove('bi-play-circle-fill');
  play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
 }
 function pauseSong(){
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
  play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
 }
 function playPause(){
  if (isPlaying ===true) {
    pauseSong();
  }else {
    playSong();
  } 
 }
   function likeButtonRender() {
    if(sortedPlaylist[index].liked === true){
      likeButton.querySelector('.bi').classList.remove('bi-heart');
      likeButton.querySelector('.bi').classList.add('bi-heart-fill');
      likeButton.classList.add('button-active');
    }else {
      likeButton.querySelector('.bi').classList.add('bi-heart');
      likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
      likeButton.classList.remove('button-active');
    }
   }

 function initialzeSong(){
 cover.src = `/img/${sortedPlaylist[index].imagem}.jpg`;
 song.src =  `/music/${sortedPlaylist[index].music}.mp3`;
 songName.innerText = sortedPlaylist[index].songName;
 bandName.innerText = sortedPlaylist[index].artist;
 likeButtonRender();
 }
 function previousSong(){
  if(index ===0) {
    index = sortedPlaylist.length -1;
  }else {
    index -= 1;
  }
  initialzeSong();
  playSong();
 }
 function nextSong(){
  if(index === sortedPlaylist.length - 1){
      index = 0;
} else {
  index +=1;
  }
  initialzeSong();
  playSong();
 }
function updateProgress(){
 const barWidth = (song.currentTime/song.duration)*100;
 currentProgress.style.setProperty('--progress',`${barWidth}%`);
 songTime.innerText=  toHHMMSS(song.currentTime);
}

  function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)* song.duration;
    song.currentTime = jumpToTime;
   } 
   
   function shuffleArray(preShurffleArray){
    let size = sortedPlaylist.length;
    let currentIndex = size -1;
    while(currentIndex >0) {
     let randomIndex = Math.floor(Math.random()*size);
     let aux = preShurffleArray[currentIndex];
     preShurffleArray[currentIndex] = preShurffleArray[randomIndex];
     preShurffleArray[randomIndex] = aux;
     currentIndex -=1;
    }
   }

 function shuffleButtonClick(){
  if(isShuffled ===false){
    isShuffled = true;
    shuffleArray(sortedPlaylist);
    shuffleButton.classList.add('button-active');
  }else {
    isShuffled = false;
     sortedPlaylist = [...originalplaylist];
    shuffleButton.classList.remove('button-active');
  }
 }

 function repeatButtonClicked(){
  if (repeatOn === false) {
    repeatOn = true;
    repeatButton.classList.add('button-active');
  } else {
    repeatOn = false;
    repeatButton.classList.remove('button-active');
  }
}
   function nextOrRepeat(){
    if(repeatOn === false){
      nextSong();
    }else{
      playSong();
    }
   }

   function toHHMMSS(originalNumber){
    let hours = Math.floor(originalNumber/ 3600);
    let min = Math.floor((originalNumber - hours * 3600) /60);
    let secs = Math.floor(originalNumber - hours * 3600 - min* 60);

 return `${hours.toString().padStart(2, '0')}:${min.toString()
  .padStart(2, '0')}:${secs.toString().padStart(2, "0")}`;
  }

 function updateTotalTime(){
  totalTime.innerText = toHHMMSS(song.duration);
 }

 function likeButtonClicked(){
  if(sortedPlaylist[index].liked === false){
    sortedPlaylist[index].liked = true;
  }else {
    sortedPlaylist[index].liked = false;
  }
  likeButtonRender();
  localStorage.setItem('playlist', JSON.stringify(originalplaylist)); 
 }
initialzeSong();

 play.addEventListener('click',playPause);
 previous.addEventListener('click',previousSong);
 next.addEventListener('click',nextSong);
 song.addEventListener('timeupdate',updateProgress);
 song.addEventListener('ended',nextOrRepeat);
 song.addEventListener("loadedmetadata", updateTotalTime);
 progressContainer.addEventListener('click', jumpTo);
 shuffleButton.addEventListener('click',shuffleButtonClick);
 repeatButton.addEventListener('click', repeatButtonClicked);
 likeButton.addEventListener('click',likeButtonClicked);
 
 
