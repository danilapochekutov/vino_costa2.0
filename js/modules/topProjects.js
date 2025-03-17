function topProjects(cardSelector) {
    const projectCards = document.querySelectorAll(cardSelector);
    const isRetina = window.devicePixelRatio > 1;

    projectCards.forEach(card => {
        const videos = card.querySelectorAll("video");
        if (!videos.length) return;

        videos.forEach(video => {
            let poster = video.getAttribute("poster");
            if (!poster) return;

            if (poster.endsWith(".jpg")) {
                video.poster = isRetina 
                    ? poster.replace(".jpg", "@2x.jpg") 
                    : poster.replace(".jpg", "@1x.jpg");
            } else if (poster.endsWith(".png")) {
                video.poster = isRetina 
                    ? poster.replace(".png", "@2x.png") 
                    : poster.replace(".png", "@1x.png");
            }
        });

        const swiperContainer = card.querySelector(".swiper");
        const paginationContainer = card.querySelector(".project-card__pagination");

        if (swiperContainer && paginationContainer) {
            const swiper = new Swiper(swiperContainer, {
                slidesPerView: 1,
                spaceBetween: 10,
                centeredSlides: true,
                loop: false,
                pagination: {
                    el: paginationContainer,
                    clickable: true,
                },
                on: {
                    slideChange: function (swiper) {
                        const allVideos = card.querySelectorAll("video");
                        allVideos.forEach(video => {
                            video.pause();
                            video.currentTime = 0;
                        });

                        const activeSlide = swiper.slides[swiper.activeIndex];
                        const activeVideo = activeSlide.querySelector("video");

                        if (activeVideo && !activeVideo.src) {
                            activeVideo.src = activeVideo.dataset.src;
                            activeVideo.play().catch(error => console.error("Ошибка воспроизведения:", error));
                        }
                    }
                }
            });

            card.addEventListener("mouseenter", () => {
                const activeVideo = card.querySelector(".swiper-slide-active video");
                if (activeVideo && !activeVideo.src) {
                    activeVideo.src = activeVideo.dataset.src;
                }
                activeVideo?.play();
            });

            card.addEventListener("mouseleave", () => {
                const allVideos = card.querySelectorAll("video");
                allVideos.forEach(video => {
                    video.pause();
                    video.currentTime = 0;
                });
            });
        } else {
            card.addEventListener("mouseenter", () => {
                const video = card.querySelector("video");
                if (!video) return;
                if (!video.src) {
                    video.src = video.dataset.src;
                }
                video.play();
            });

            card.addEventListener("mouseleave", () => {
                const video = card.querySelector("video");
                if (!video) return;
                video.pause();
                video.currentTime = 0;
            });
        }
    });
}

export default topProjects;
