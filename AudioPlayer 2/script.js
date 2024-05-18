 document.addEventListener('DOMContentLoaded', function () {
            const audio = document.getElementById('audio');
            const seekBar = document.getElementById('seek-bar');
            const seekFill = document.getElementById('seek-fill');
            const seekHandle = document.getElementById('seek-handle');
            const currentTimeDisplay = document.getElementById('currentTime');
            const playButton = document.getElementById('play');

            function updateSeekBar() {
                const progress = (audio.currentTime / audio.duration) * 100;
                seekFill.style.width = progress + '%';
                seekHandle.style.left = progress + '%';
                updateCurrentTime();
            }

            function updateCurrentTime() {
                const currentMinutes = Math.floor(audio.currentTime / 60);
                const currentSeconds = Math.floor(audio.currentTime % 60);
                const durationMinutes = Math.floor(audio.duration / 60);
                const durationSeconds = Math.floor(audio.duration % 60);

                currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
            }

            seekBar.addEventListener('click', function (event) {
                const rect = seekBar.getBoundingClientRect();
                const offsetX = event.clientX - rect.left;
                const progress = offsetX / rect.width;
                audio.currentTime = progress * audio.duration;
            });

            function handleMouseMove(event) {
                const rect = seekBar.getBoundingClientRect();
                let offsetX = event.clientX - rect.left;
                offsetX = Math.max(0, Math.min(offsetX, rect.width));
                const progress = offsetX / rect.width;
                seekFill.style.width = progress * 100 + '%';
                seekHandle.style.left = progress * 100 + '%';
                audio.currentTime = progress * audio.duration;
            }

            function handleMouseDown() {
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', function handleMouseUp() {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                });
            }

            seekHandle.addEventListener('mousedown', handleMouseDown);

            audio.addEventListener('timeupdate', updateSeekBar);
            audio.addEventListener('loadedmetadata', updateSeekBar);

            window.playOrPause = function() {
                if (audio.paused) {
                    audio.play();
                    playButton.src = "images/pause.png";
                } else {
                    audio.pause();
                    playButton.src = "images/play-button-arrowhead.png";
                }
            };

            window.prev = function() { console.log('Previous'); };
            window.next = function() { console.log('Next'); };
            window.decrease = function() { audio.volume = Math.max(0, audio.volume - 0.2); };
            window.increase = function() { audio.volume = Math.min(1, audio.volume + 0.2); };
            window.muted = function() {
                audio.muted = !audio.muted;
                document.getElementById('mute').src = audio.muted ? 'images/volume-mute.png' : 'images/volume.png';
            };

            // Code to handle loading and playing songs from the data array
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
            };

            let currentSong = 0;

            function playSong() {
                audio.src = data.song[currentSong];
                document.getElementById("songTitle").textContent = data.title[currentSong];
                document.querySelector(".row1").style.backgroundImage = `url(${data.poster[currentSong]})`;
                document.querySelector(".main").style.backgroundImage = `url(${data.poster[currentSong]})`;
                audio.play();
                playButton.src = "images/pause.png";
            }

            window.next = function() {
                currentSong = (currentSong + 1) % data.song.length;
                playSong();
            };

            window.prev = function() {
                currentSong = (currentSong - 1 + data.song.length) % data.song.length;
                playSong();
            };

            playSong();
        });