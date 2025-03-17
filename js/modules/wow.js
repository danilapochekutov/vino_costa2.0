import hero from "../modules/hero.js";

function animation() {
	let wow = new WOW({
		boxClass: "wow",
		animateClass: "animate__animated",
		offset: 0,
		mobile: true,
		live: true,
		callback: function (box) {
			if (box.classList.contains("layout")) {
				setTimeout(() => {
					hero(".hero__button-wrapper", ".layout");
				}, 2000);
			}
			if (box.classList.contains("showreel")) {
				const swiper = new Swiper(".showreel__container", {
					slidesPerView: 1.625,
					centeredSlides: true,
					spaceBetween: 24,
					simulateTouch: true,
					touchEventsTarget: "wrapper",
					breakpoints: {
						// when window width is >= 320px
						320: {
							slidesPerView: 1.2,
							spaceBetween: 8,
						},
						480: {
							slidesPerView: 1.625,
							spaceBetween: 24,
						},
					},
					on: {
						init: function () {
							playActiveSlideVideo(this);
						},
						slideChange: function () {
							playActiveSlideVideo(this);
						},
					},
				});

				const observer = new IntersectionObserver(
					(entries) => {
						entries.forEach((entry) => {
							if (entry.isIntersecting) {
								playActiveSlideVideo(swiper);
							} else {
								stopActiveSlideVideo(swiper);
							}
						});
					},
					{
						threshold: 0.5,
					},
				);

				observer.observe(box);
			}
			if (box.classList.contains("designer__award__slider-photo")) {
				const swiper = new Swiper(".slider-photo__container", {
					spaceBetween: 0,
					slidesPerView: 6.5,
					simulateTouch: true,
					loop: true,
					breakpoints: {
						// when window width is >= 320px
						1000: {
							slidesPerView: 6.5,
						},
						480: {
							slidesPerView: "auto",
						},
					},
				});
			}
			if (box.classList.contains("designer")) {
				const projectCards = document.querySelectorAll(".designer__award");

				projectCards.forEach((card) => {
					const swiperContainer = card.querySelector(".designer__award__container");

					if (swiperContainer) {
						const swiper = new Swiper(swiperContainer, {
							slidesPerView: 1,
							spaceBetween: 10,
							centeredSlides: true,
							loop: false,
							pagination: {
								el: ".designer__award__pagination",
								clickable: true,
							},
							on: {
								slideChange: function (swiper) {
									const allVideos = card.querySelectorAll("video");
									allVideos.forEach((video) => {
										video.pause();
										video.currentTime = 0;
									});

									const activeSlide = swiper.slides[swiper.activeIndex];
									const activeVideo = activeSlide.querySelector("video");

									if (activeVideo && !activeVideo.src) {
										activeVideo.src = activeVideo.dataset.src;
										activeVideo
											.play()
											.catch((error) =>
												console.error("Ошибка воспроизведения:", error),
											);
									}
								},
							},
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
							allVideos.forEach((video) => {
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
			if (box.classList.contains("creative-space")) {
				const swiper = new Swiper(".creative-space__container", {
					slidesPerView: getSlidesPerView(),
					spaceBetween: 8,
					initialSlide: 3,
					centeredSlides: true,
					loop: true,
					autoplay: {
						delay: 10000,
						disableOnInteraction: false,
					},
					on: {
						slideChange: function () {
							const currentSlide = this.slides[this.activeIndex];
							const video = currentSlide.querySelector("video[data-src]");
							const sound = currentSlide.querySelector(".sound-toggle");
							if (video) {
								video.setAttribute("src", video.getAttribute("data-src"));
								sound.style.display = "block";
								video.removeAttribute("data-src");
							}
						},
						resize: function () {
							this.params.slidesPerView = getSlidesPerView();
							this.update();
						},
					},
				});
			}

			if (box.classList.contains("move-it")) {
				const resize = document.querySelector(".slider__resize");
				const divider = document.querySelector(".slider__divider");
				if (resize) {
					resize.style.animation = "sliderAnimation 5s linear";
					setTimeout(() => {
						divider.style.opacity = "1";
					}, 5000);
				}
			}

			if (box.classList.contains("feedback")) {
				const swiper = new Swiper(".feedback__slider-container", {
					slidesPerView: 1,
					centeredSlides: true,
					spaceBetween: 30,
					pagination: {
						el: ".feedback__pagination",
						clickable: true,
					},
					navigation: {
						nextEl: ".feedback-button-next",
						prevEl: ".feedback-button-prev",
					},
					on: {
						init: function () {
							const currentSlide = this.slides[this.activeIndex];
							const iframe = currentSlide.querySelector("iframe[data-src]");
							if (iframe) {
								iframe.setAttribute("src", iframe.getAttribute("data-src"));
								iframe.removeAttribute("data-src");
							}
						},
						slideChange: function () {
							const currentSlide = this.slides[this.activeIndex];
							const iframe = currentSlide.querySelector("iframe[data-src]");
							if (iframe) {
								iframe.setAttribute("src", iframe.getAttribute("data-src"));
								iframe.removeAttribute("data-src");
							}
						},
					},
				});
			}
			if (box.classList.contains("backstages")) {
				const swiper = new Swiper(".backstages__container", {
					slidesPerView: 1,
					centeredSlides: true,
					spaceBetween: 30,
					pagination: {
						el: ".backstages__pagination",
						clickable: true,
					},
					simulateTouch: true,
					touchEventsTarget: "wrapper",
					on: {
						init: function () {
							handleSlideChange(this);
						},
						slideChange: function () {
							handleSlideChange(this);
						},
					},
				});

				const observer = new IntersectionObserver(
					(entries) => {
						entries.forEach((entry) => {
							if (entry.isIntersecting) {
								handleSlideChange(swiper);
							} else {
								stopActiveSlideVideo(swiper);
							}
						});
					},
					{
						threshold: 0.5,
					},
				);

				observer.observe(box);
			}
			if (box.classList.contains("offer__slider")) {
				animateSlider();
			}
			if (box.classList.contains("reviews__container")) {
				const viewMoreContent = document.querySelectorAll(".view");
				viewMoreContent.forEach((content) => {
					content.classList.add("animate__animated", "animate__fadeInLeft");
				});
			}
			if (box.classList.contains("nfts")) {
				const resize = document.querySelector(".nfts__resize");
				const divider = document.querySelector(".nfts__divider");
				const title = document.querySelector(".nfts__title--white");
				if (resize) {
					resize.style.animation = "sliderAnimation 5s linear";
					title.style.animation = "titleAnimation 5s linear";
					setTimeout(() => {
						divider.style.opacity = "1";
					}, 5000);
				}
			}
			if (box.classList.contains("animation-go")) {
				const text = document.querySelector(".guarantee__text span");
				if (text) {
					text.classList.add("type");
				}

				const textMin = document.querySelector(".guarantee__text-min span");
				if (textMin) {
					textMin.classList.add("type");
				}
			}
		},
	});

	wow.init();
}

function playActiveSlideVideo(swiper) {
	swiper.slides.forEach((slide, index) => {
		const video = slide.querySelector("video");
		const iframe = slide.querySelector("iframe");

		if (index === swiper.activeIndex) {
			if (video) {
				if (video) {
					video.src = video.getAttribute("data-src");
				}
				video.play().catch((err) => console.warn("Ошибка воспроизведения видео:", err));
			}
			if (iframe) {
				const dataSrc = iframe.getAttribute("data-src");
				// iframe.src = dataSrc + "&autoplay=1";
				if (!iframe.src.includes("autoplay=1")) {
					iframe.src = dataSrc.includes("?")
						? dataSrc + "&autoplay=1"
						: dataSrc + "?autoplay=1";
				}
			}
		} else {
			if (video) {
				video.pause();
				video.currentTime = 0;
			}
			if (iframe) {
				iframe.src = iframe.src.replace("autoplay=1", "autoplay=0");
			}
		}
	});
}

// Вспомогательная функция для определения количества слайдов на экране
function getSlidesPerView() {
	const screenWidth = window.innerWidth;
	if (screenWidth <= 768) {
		return 1.5;
	} else if (screenWidth > 768 && screenWidth < 1200) {
		return 3;
	} else {
		return 3.8;
	}
}

// Обработка смены слайдов
function handleSlideChange(swiper) {
	const allSlides = swiper.slides;
	allSlides.forEach((slide, index) => {
		const iframe = slide.querySelector(".video-iframe");
		if (iframe) {
			const dataSrc = iframe.getAttribute("data-src");
			if (index === swiper.activeIndex) {
				iframe.src = dataSrc + "&autoplay=1";
			} else {
				iframe.src = "";
				setTimeout(() => {
					iframe.src = dataSrc;
				}, 200);
			}
		}
	});
}

// Остановка видео на активном слайде при скрытии блока с экрана
function stopActiveSlideVideo(swiper) {
	if (!swiper || !swiper.slides || swiper.slides.length === 0) return;
	const activeSlide = swiper.slides[swiper.activeIndex];
	if (!activeSlide) return;

	const iframe = activeSlide.querySelector(".video-iframe");
	const video = activeSlide.querySelector(".showreel-video");
	// const dataSrc = iframe ? iframe.getAttribute("data-src") : null;

	if (iframe) {
		iframe.src = ""; // Очищаем src для отключения YouTube видео
	}
	if (video) {
		video.pause();
		video.src = ""; // Останавливаем и очищаем видео
	}
}

// Анимация ползунка
function animateSlider() {
	const sliderInput = document.getElementById("sliderInput");
	const rightValue = document.getElementById("rightValue");
	const emojiImage = document.getElementById("emojiImage");

	let startValue = parseInt(sliderInput.value);
	const endValue = parseInt(sliderInput.max);

	// Анимация ползунка
	function animate() {
		if (startValue < endValue) {
			startValue += 50; // скорость увеличения
			sliderInput.value = startValue;
			rightValue.textContent = startValue.toLocaleString("en-US");

			// Изменение изображения эмодзи
			if (startValue >= 1000 && startValue < 2000) {
				emojiImage.src = "./icons/offer/1-2.svg";
			} else if (startValue >= 2000 && startValue < 5000) {
				emojiImage.src = "./icons/offer/2-5.svg";
			} else if (startValue >= 5000 && startValue < 7000) {
				emojiImage.src = "./icons/offer/5-7.svg";
			} else if (startValue >= 7000 && startValue <= 10000) {
				emojiImage.src = "./icons/offer/7-10.svg";
			}

			requestAnimationFrame(animate);
		}
	}

	requestAnimationFrame(animate);
}

export default animation;
