//Lista de músicas
const songs = [
  "Love Me Do - The Beatles.mp3",
  "NIB - Black Sabbath.mp3",
  "Digo Ou Não Digo - João Gomes.mp3",
  "Sorrisos - L7NNON.mp3",
  "Soco Racional - Dead Fish.mp3",
  "Pandemonium - Matanza.mp3",
];

const player = document.getElementById("player");
const progress_bar = document.getElementById('progress');

const play_button = document.getElementById('play_button');
const pause_button = document.getElementById('pause_button')

//Criando uma lista HTML com as músicas
const createSongList = () => {
  const list = document.createElement("ol");
  for (let i = 0; i < songs.length; i++) {
    const item = document.createElement("li");
    item.appendChild(document.createTextNode(songs[i].slice(0,-4)));
    list.appendChild(item);
  }
  return list;
};



//Evento para tocar a músicas selecionada
function setSong(e) {

  const source = document.getElementById("source");
  source.src = "songs/" + e.target.innerText +".mp3";
  
  document.getElementById("currentSong").innerText = e.target.innerText;

  player.load();
  player.play();

}

//Adicionando a lista de músicas no HTML
const songList = document.getElementById("songList");
songList.appendChild(createSongList());

//Adicionando o evento de toque a todos os elementos "li" da lista de música
const links = document.querySelectorAll("li");

for (const link of links) {
  link.addEventListener("click", setSong);
}



// Pausando a música ao botão de "play" ser pressionado 
play_button.addEventListener('click', ()=>{
  
  if (player.readyState) {
    player.play();
  }
  
})



//Pausando a música ao botão de "pause" ser pressionado 
pause_button.addEventListener('click', ()=>{
  player.pause();
})



//Aumentando ou diminuindo o volume da música ao input ser modificado 
const slider = document.getElementById("volumeSlider");

slider.addEventListener('input', (e)=>{
  const volume = e.target.value;
  player.volume = volume;
})



//Atualizando a barra de progresso da música durante a reprodução
player.addEventListener('timeupdate', ()=>{
  
  if (player.currentTime > 0) {
    progress_bar.value = (player.currentTime / player.duration) * 100;
  } 

  let image_sound = document.getElementById('image_sound');

  image_sound.style.transform += 'rotate(1deg)';
  
}) 


//Avançando ou retrocedendo na música ao clique na barra de progresso
progress_bar.addEventListener('click', (e) => {

  let totalX = progress_bar.clientWidth;
  let mouseX = e.offsetX;
  let song_duration = player.duration;
  let new_time = parseInt((mouseX * song_duration) / totalX)

  player.currentTime =  new_time;
  progress_bar.value = (new_time * 100) / song_duration;  

})