let data  = {
    title : ["Каспийский груз - Город невест",
            "Каспийский Груз – Буду честен",
            "Каспийский Груз – Доедешь - пиши",
            "Каспийский Груз, Гио Пика – На белом"],

    song : ["Music/Каспийский груз - Город невест.mp3",
            "Music/Каспийский Груз – Буду честен.mp3",
            "Music/Каспийский Груз – Доедешь - пиши.mp3",
            "Music/Каспийский Груз, Гио Пика – На белом.mp3"],

    poster : ["https://images.genius.com/5c3deb7d94fe5aaa233b19937683bae0.1000x1000x1.png",
            "https://cdns-images.dzcdn.net/images/cover/5b49512edb0ad85dada6a949deb7fd83/500x500.jpg",
            "https://sun9-76.userapi.com/impf/c628718/v628718206/49096/BGaEcXS9iNk.jpg?size=807x605&quality=96&sign=cae4fed95e0620ef6cb8903727e22e6e&c_uniq_tag=EX6Kj7DUAZWpHgjaNOE1ZrPBnM-7uvlUsJhMfNQvb5U&type=album",
            "https://cdn.promodj.com/afs/47e589e3ace9d9f1b0cb765c6a0ad6a712%3Aresize%3A640x480%3Afill%3Affffff%3A6bbe22"]
}

let song = new Audio;

window.onload = function name(params) {
    playSong()
}

let currentSong = 0

function playSong() {
    song.src =  data.song[currentSong];
    let songTitle = document.getElementById("songTitle")
    songTitle.textContent = data.title[currentSong]
    let img = document.getElementsByClassName("row1")
    img[0].style.backgroundImage = "url(" + data.poster[currentSong] + ")"
    let main = document.getElementsByClassName("main")
    main[0].style.backgroundImage = "url(" + data.poster[currentSong] + ")"
}

function playOrPause(params) {
    let play  = document.getElementById("play")
    if (song.paused) {
        play.src = "images/pause.png"
        song.play()
    }
    else{
        song.pause()
        play.src = "images/play-button-arrowhead.png"
    }
}

