document.addEventListener('DOMContentLoaded', () => {

    // Daftar Lagu (DIPERBARUI DENGAN LIRIK)
    // 
    // PENTING: GANTI "..." DENGAN LIRIK LAGU ANDA
    // Gunakan `\n` untuk membuat baris baru
    //
    const songs = [
        { 
            name: 'Api Sang Naga', 
            path: 'audio/apisangnaga.mp3', 
            lyrics: "Ini adalah lirik untuk Api Sang Naga...\nBaris kedua lirik...\nBaris ketiga..." 
        },
        { 
            name: 'Tim DV NP', 
            path: 'audio/Tim DV NP.mp3', 
            lyrics: "Masukkan lirik untuk Tim DV NP di sini." 
        },
        { 
            name: 'Leader Tim', 
            path: 'audio/Leader Tim.mp3', 
            lyrics: "Masukkan lirik untuk Leader Tim di sini." 
        },
        { 
            name: 'Ketua Tim', 
            path: 'audio/Ketua Tim.mp3', 
            lyrics: "Masukkan lirik untuk Ketua Tim di sini." 
        },
        { 
            name: 'Anggota DV NP', 
            path: 'audio/Anggota DV NP.mp3', 
            lyrics: "Masukkan lirik untuk Anggota DV NP di sini." 
        },
        { 
            name: 'Support System', 
            path: 'audio/Support system .mp3', 
            lyrics: "Masukkan lirik untuk Support System di sini." 
        },
        { 
            name: 'Alat-alat Tim DVNP', 
            path: 'audio/Alat-alat Tim DVNP.mp3', 
            lyrics: "Masukkan lirik untuk Alat-alat Tim DVNP di sini." 
        },
        { 
            name: 'Metode Kerja', 
            path: 'audio/Metode Kerja.mp3', 
            lyrics: "Masukkan lirik untuk Metode Kerja di sini." 
        },
        { 
            name: 'Penjaga Api Suci', 
            path: 'audio/Penjaga Api Suci.mp3', 
            lyrics: "Masukkan lirik untuk Penjaga Api Suci di sini." 
        },
        { 
            name: 'Edifikasi & Duplikasi', 
            path: 'audio/Edifikasi & Duplikasi.mp3', 
            lyrics: "Masukkan lirik untuk Edifikasi & Duplikasi di sini." 
        }
    ];

    // Ambil Elemen DOM
    const slide1 = document.getElementById('slide1');
    const slide2 = document.getElementById('slide2');
    const enterBtn = document.getElementById('enterBtn');
    const backBtn = document.getElementById('backBtn');
    
    const audioPlayer = document.getElementById('audioPlayer');
    const playlistElement = document.getElementById('playlist');
    const nowPlayingElement = document.getElementById('nowPlaying');

    // ELEMEN BARU UNTUK LIRIK
    const showLyricsBtn = document.getElementById('showLyricsBtn');
    const lyricsOverlay = document.getElementById('lyricsOverlay');
    const closeLyricsBtn = document.getElementById('closeLyricsBtn');
    const lyricsContent = document.getElementById('lyricsContent');

    let currentSongIndex = -1;

    // 1. Buat Daftar Playlist di HTML
    function populatePlaylist() {
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.textContent = song.name;
            li.dataset.index = index;
            
            li.addEventListener('click', () => {
                playSong(index);
            });
            
            playlistElement.appendChild(li);
        });
    }

    // 2. Fungsi untuk Memutar Lagu
    function playSong(index) {
        if (index < 0 || index >= songs.length) return;

        currentSongIndex = index;
        const song = songs[index];
        
        audioPlayer.src = song.path;
        audioPlayer.play();
        
        nowPlayingElement.textContent = `Now Playing: ${song.name}`;
        
        // PERBARUI KONTEN LIRIK (meskipun tersembunyi)
        lyricsContent.innerText = song.lyrics;

        // Tandai lagu yang aktif
        document.querySelectorAll('#playlist li').forEach((li, i) => {
            if (i === index) {
                li.classList.add('active');
            } else {
                li.classList.remove('active');
            }
        });
    }

    // 3. Pindah ke lagu berikutnya saat selesai
    audioPlayer.addEventListener('ended', () => {
        let nextIndex = currentSongIndex + 1;
        if (nextIndex >= songs.length) {
            nextIndex = 0; // Kembali ke lagu pertama
        }
        playSong(nextIndex);
    });

    // 4. Navigasi Slide (Perbaikan untuk iPhone)
    enterBtn.addEventListener('click', () => {
        slide1.classList.remove('active');
        slide2.classList.add('active');
        
        if(currentSongIndex === -1) {
             playSong(0); // Diizinkan oleh iPhone
        }
    });

    backBtn.addEventListener('click', () => {
        slide2.classList.remove('active');
        slide1.classList.add('active');
    });

    // 5. FUNGSI BARU UNTUK LIRIK
    showLyricsBtn.addEventListener('click', () => {
        if (currentSongIndex === -1) {
            // Jika belum ada lagu diputar, ambil lirik lagu pertama
            lyricsContent.innerText = songs[0].lyrics;
        }
        lyricsOverlay.classList.remove('hidden');
    });

    closeLyricsBtn.addEventListener('click', () => {
        lyricsOverlay.classList.add('hidden');
    });


    // Inisialisasi
    populatePlaylist();
});
