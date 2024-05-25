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
        "https://cdn.promodj.com/afs/47e589e3ace9d9f1b0cb765c6a0ad6a712%3Aresize%3A640x480%3Afill%3Affffff%3A6bbe22"],
};

let currentSong = 0;

    const seekbar = document.getElementById('seek-bar');

seekbar.addEventListener("click", function (event) {
    const rect = seekbar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const width = rect.width;
    const clickPositionRatio = offsetX / width;
    audio.currentTime = clickPositionRatio * audio.duration;
    updateSeekBar(); 
});

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        event.preventDefault();
        playOrPause();
    }
});
    function playSong() {
        audio.src = data.song[currentSong];
        let songTitle = document.getElementById("songTitle");
        songTitle.textContent = data.title[currentSong];
        let img = document.getElementsByClassName("row1")[0];
        img.style.backgroundImage = "url(" + data.poster[currentSong] + ")";
        let main = document.getElementsByTagName("body")[0];
        main.style.backgroundImage = "url(" + data.poster[currentSong] + ")";
        main.style.backgroundSize = "cover";
        main.style.backgroundPosition = "center center";
    }



    function playOrPause() {
        let play = document.getElementById("play");
        if (audio.paused) {
            play.src = "images/pause.png";
            audio.play();
        } else {
            audio.pause();
            play.src = "images/play-button-arrowhead.png";
        }
    }

    audio.addEventListener("timeupdate", function () {
        let fill = document.querySelector(".fill");
        let handle = document.querySelector(".handle");
        let position = audio.currentTime / audio.duration;

        fill.style.width = position * 100 + "%";
        handle.style.left = position * 100 + "%";

        convertTime(audio.currentTime);

        if (audio.ended) {
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
        totalTime(Math.round(audio.duration));
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
        audio.play();
        let play = document.getElementById("play");
        play.src = "images/pause.png";
    }

    function prev() {
        currentSong--;
        if (currentSong < 0) {
            currentSong = data.song.length - 1;
        }
        playSong();
        audio.play();
        let play = document.getElementById("play");
        play.src = "images/pause.png";
    }

    function muted() {
        var mute = document.getElementById("mute");
        if (audio.muted) {
            audio.muted = false;
            mute.src = "images/volume.png"; 
        } else {
            audio.muted = true;
            mute.src = "images/volume-mute.png"; 
        }
    }

    

    function increase() {
        audio.volume += 0.2;
    }

    function decrease() {
        audio.volume -= 0.2;
    }

function updateVolume(event) {
    audio.volume = event.target.value;
}

document.getElementById('volume-slider').addEventListener('input', updateVolume);

    window.onload = function () {
        playSong();
    };

function playSongAt(index) {
    currentSong = index;
    playSong();
}
const playlistElement = document.getElementById('playlist');
const menu = document.getElementById('menu');
const menuToggle = document.getElementById('menu-toggle');


function generatePlaylist() {
    data.title.forEach((title, index) => {
        const li = document.createElement('li');

        const img = document.createElement('img');
        img.src = data.poster[index];
        img.alt = title;
        img.classList.add('playlist-img');

        
        const span = document.createElement('span');
        span.textContent = title;
        span.classList.add('playlist-title');

        li.appendChild(img);
        li.appendChild(span);

        li.addEventListener('click', () => {
            currentSong = index;
            playSong();
            audio.play();
            play.src = "images/pause.png";
            toggleMenu(); 
        });

        playlistElement.appendChild(li);
    });
}
window.toggleMenu = function() {
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menu.classList.add('show');
    } else {
        menu.classList.remove('show');
        menu.classList.add('hidden');
    }
};






generatePlaylist();
playSong();     

