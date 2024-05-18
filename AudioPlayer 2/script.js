let data = {
    title: ["Каспийский груз - Город невест",
        "Каспийский Груз – Буду честен",
        "Каспийский Груз – Доедешь - пиши",
        "Каспийский Груз, Гио Пика – На белом"],

    song: ["Music/Каспийский груз - Город невест.mp3",
        "Music/Каспийский Груз – Буду честен.mp3",
        "Music/Каспийский Груз – Доедешь - пиши.mp3",
        "Music/Каспийский Груз, Гио Пика – На белом.mp3"],

    poster: ["https://images.genius.com/5c3deb7d94fe5aaa233b19937683bae0.1000x1000x1.png",
        "https://cdns-images.dzcdn.net/images/cover/5b49512edb0ad85dada6a949deb7fd83/500x500.jpg",
        "https://sun9-76.userapi.com/impf/c628718/v628718206/49096/BGaEcXS9iNk.jpg?size=807x605&quality=96&sign=cae4fed95e0620ef6cb8903727e22e6e&c_uniq_tag=EX6Kj7DUAZWpHgjaNOE1ZrPBnM-7uvlUsJhMfNQvb5U&type=album",
        "https://cdn.promodj.com/afs/47e589e3ace9d9f1b0cb765c6a0ad6a712%3Aresize%3A640x480%3Afill%3Affffff%3A6bbe22"]
}

let song = new Audio;

window.onload = function () {
    playSong();
}

let currentSong = 0;

function playSong() {
    song.src = data.song[currentSong];
    let songTitle = document.getElementById("songTitle");
    songTitle.textContent = data.title[currentSong];
    let img = document.getElementsByClassName("row1")[0];
    img.style.backgroundImage = "url(" + data.poster[currentSong] + ")";
    let main = document.getElementsByTagName("body")[0];
    main.style.backgroundImage = "url(" + data.poster[currentSong] + ")";
    main.style.backgroundSize = "cover"
    main.style.backgroundPosition = "center center"

}

function playOrPause() {
    let play = document.getElementById("play");
    if (song.paused) {
        play.src = "images/pause.png";
        song.play();
    } else {
        song.pause();
        play.src = "images/play-button-arrowhead.png";
    }
}

song.addEventListener("timeupdate", function () {
    let fill = document.querySelector(".fill");
    let handle = document.querySelector(".handle");
    let position = song.currentTime / song.duration;

    fill.style.width = position * 100 + "%";
    handle.style.left = position * 100 + "%";

    convertTime(song.currentTime);

    if (song.ended) {
        next();
    }
});

function convertTime(seconds) {
    let currentTime = document.querySelector(".currentTime");
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);

    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;

    currentTime.textContent = min + ":" + sec;
    totalTime(Math.round(song.duration));
}

function totalTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);

    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;

    let currentTime = document.querySelector(".currentTime");
    currentTime.textContent += "/" + min + ":" + sec;
}

function next() {
    currentSong++;
    if (currentSong >= data.song.length) {
        currentSong = 0;
    }
    playSong();
    song.play();
    let play = document.getElementById("play");
    play.src = "images/pause.png";
}

function prev() {
    currentSong--;
    if (currentSong < 0) {
        currentSong = data.song.length - 1;
    }
    playSong();
    song.play();
    let play = document.getElementById("play");
    play.src = "images/pause.png";
}

function muted() {
    var mute = document.getElementById("mute")
    if (song.muted) {
        song.muted = false
        mute.src = "images/volume.png" //mute
    } else {
        song.muted = true
        mute.src = "images/volume-mute.png"
        //unmute
    }
}

function increase() {
    song.volume += 0.2;
}

function decrease() {
    song.volume -= 0.2;
}

// Seek-bar click functionality
document.querySelector('.seek-bar').addEventListener('click', function (event) {
    let seekBar = this;
    let rect = seekBar.getBoundingClientRect();
    let offsetX = event.clientX - rect.left; // Get the horizontal coordinate
    let seekPosition = offsetX / seekBar.offsetWidth; // Calculate the seek position as a percentage

    song.currentTime = seekPosition * song.duration; // Update the current time of the song
});

// Handle drag functionality
let handle = document.querySelector('.handle');
let seekBar = document.querySelector('.seek-bar');

handle.addEventListener('mousedown', function (event) {
    event.preventDefault();

    function onMouseMove(event) {
        let rect = seekBar.getBoundingClientRect();
        let offsetX = event.clientX - rect.left;
        let seekPosition = Math.max(0, Math.min(1, offsetX / seekBar.offsetWidth));

        let fill = document.querySelector(".fill");
        fill.style.width = seekPosition * 100 + "%";
        handle.style.left = seekPosition * 100 + "%";

        song.currentTime = seekPosition * song.duration; // Update the current time of the song
    }

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', function () {
        document.removeEventListener('mousemove', onMouseMove);
    }, { once: true });
});
