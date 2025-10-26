;(function () {
    'use strict';

    const setFullHeight = () => {
        const updateHeight = () => $('.js-fullheight').css('height', $(window).height());
        updateHeight();
        $(window).resize(updateHeight);
    };

    const animateOnScroll = () => {
        let i = 0;
        $('.animate-box').waypoint(function (direction) {
            if (direction === 'down' && !$(this.element).hasClass('animated')) {
                i++;
                $(this.element).addClass('item-animate');
                setTimeout(() => {
                    $('body .animate-box.item-animate').each(function (k) {
                        const el = $(this);
                        setTimeout(() => {
                            const effect = el.data('animate-effect');
                            el.addClass(`${effect === 'fadeIn' ? 'fadeIn' : 'fadeInUp'} animated`);
                            el.removeClass('item-animate');
                        }, k * 200, 'easeInOutExpo');
                    });
                }, 100);
            }
        }, { offset: '85%' });
    };

    const initOwlCarousel = () => {
        $('.owl-carousel3').owlCarousel({
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            autoplay: true,
            loop: true,
            margin: 0,
            nav: false,
            dots: false,
            autoHeight: true,
            items: 1,
            navText: [
                "<i class='icon-arrow-left3 owl-direction'></i>",
                "<i class='icon-arrow-right3 owl-direction'></i>"
            ]
        });
    };

    $(function () {
        setFullHeight();
        animateOnScroll();
        initOwlCarousel();
    });
})();

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const image = document.querySelector('.scroll-image');
    if (image) image.style.backgroundPosition = `center ${-scrollY / 2}px`;
});

document.addEventListener('DOMContentLoaded', () => {
    const playlist = [
        { title: 'Bite Your Nails', artist: 'Marcin', src: './audio/Bite Your Nails.mp3', art: './audio/Bite Your Nails.png' },
        { title: 'G.O.A.T.', artist: 'Polyphia', src: './audio/GOAT.mp3', art: './audio/GOAT.png' },
        { title: 'Art Of Guitar', artist: 'Marcin, RJ Pasin', src: './audio/ART OF GUITAR.mp3', art: './audio/ART OF GUITAR.png' },
        // { title: 'Succession (HBO Original Series Soundtrack)', artist: 'Nicholas Britell', src: '../audio/Succession.mp3', art: '../audio/Succession.jpg' },
        { title: 'Secrets (Radio Edit)', artist: 'Tiësto, KSHMR, and VASSY', src: './audio/Secrets.mp3', art: './audio/Secrets.jpg' }
        // { title: '239', artist: 'Prznt, Lilo Key, Adrian Chafer', src: '../audio/Prznt - 239.mp3', art: '../audio/Prznt - 239.png' },
        // { title: 'Vaa Vaa Pakkam Vaa', artist: 'Ilaiyaraaja, S. P. Balasubrahmanyam, Vani Jairam, Muthulingam, DJ Gowtham', src: '../audio/Vaa Vaa Pakkam Vaa.mp3', art: '../audio/Vaa Vaa Pakkam Vaa.png' }
    ];

    let currentTrackIndex = 0;
    const audio = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseIcon = playPauseBtn.querySelector('i');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const albumArt = document.querySelector('.album-art-rotating');
    const staticAlbumArt = document.getElementById('staticAlbumArt');
    const trackTitle = document.getElementById('trackTitle');

    audio.volume = 0.2;

    const loadTrack = index => {
        const track = playlist[index];
        trackTitle.textContent = track.title;
        staticAlbumArt.src = track.art;
        audio.src = track.src;
    };

    const playTrack = () => {
        audio.play();
        playPauseIcon.classList.replace('fa-play', 'fa-pause');
        albumArt.style.animationPlayState = 'running';
        albumArt.style.boxShadow = '0 0 20px var(--player-highlight)';
    };

    const pauseTrack = () => {
        audio.pause();
        playPauseIcon.classList.replace('fa-pause', 'fa-play');
        albumArt.style.animationPlayState = 'paused';
        albumArt.style.boxShadow = '0 0 8px rgba(0,0,0,0.3)';
    };

    const togglePlayPause = () => audio.paused ? playTrack() : pauseTrack();

    const nextTrack = () => {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
        playTrack();
    };

    const prevTrack = () => {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrackIndex);
        playTrack();
    };

    playPauseBtn.addEventListener('click', togglePlayPause);
    nextBtn.addEventListener('click', nextTrack);
    prevBtn.addEventListener('click', prevTrack);
    audio.addEventListener('ended', nextTrack);

    loadTrack(currentTrackIndex);
    albumArt.style.animationPlayState = 'paused';
});
