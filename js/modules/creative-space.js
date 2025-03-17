function creativeSpace(container) {
	const reels = document.querySelectorAll(container);
	function pauseVideo(video) {
		if (video) {
			video.pause();
			video.currentTime = 0;
		}
	}

	function playVideo(video) {
		if (video) {
			video.play().catch((err) => console.warn("Ошибка воспроизведения видео:", err));
		}
	}

	function toggleSound(event) {
		const video = event.target.closest(".creative-space__slide").querySelector("video");
		const img = event.target.closest(".sound-toggle").querySelector("img");
		if (video.muted) {
			video.muted = false;
			img.src = "./icons/creative-space/on.svg";
			img.alt = "unmuted";
		} else {
			video.muted = true;
			img.src = "./icons/creative-space/off.svg";
			img.alt = "muted";
		}
	}

	reels.forEach((video) => {
		const videos = video.querySelectorAll("video");
		if (!videos.length) return;

		videos.forEach((video) => {
			let poster = video.getAttribute("data-poster");
			if (!poster) return;
			let format = ""; // Получаем расширение файла

			// Определяем плотность пикселей и тип устройства
			const isRetina = window.devicePixelRatio >= 2;
			const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent,
			);
			const isHighDensityMobile = isMobile && window.devicePixelRatio >= 3;

			// Выбираем папку в зависимости от устройства
			const folder = isMobile ? "mobile" : "desktop";

			let suffix = "jpg";
			if (isHighDensityMobile) {
				suffix = "@3x";
				format = "png";
			} else if (isRetina) {
				suffix = "@2x";
				format = "png";
			} else {
				suffix = "";
				format = "jpg";
			}

			// Формируем новый путь к постеру
			const newPosterPath = poster
				.replace("creative-space", `creative-space/${folder}`)
				.replace(".jpg", `${suffix}.${format}`);
			if (!video.hasAttribute("poster")) {
				video.setAttribute("poster", newPosterPath);
			} else {
				video.poster = newPosterPath;
			}
		});
	});

	function manageVideos() {
		const containerElement = document.querySelector(container);
		if (!containerElement) return;

		const allVideos = containerElement.querySelectorAll("video");
		const activeSlide = containerElement.querySelector(".swiper-slide-active video");

		allVideos.forEach(pauseVideo);
		playVideo(activeSlide);
	}

	manageVideos();

	const soundButtons = document.querySelectorAll(".sound-toggle");
	soundButtons.forEach((button) => {
		button.addEventListener("click", toggleSound);
	});

	const observer = new MutationObserver(() => {
		manageVideos();
	});

	observer.observe(document.querySelector(container), {
		attributes: true,
		childList: true,
		subtree: true,
	});
}

export default creativeSpace;
