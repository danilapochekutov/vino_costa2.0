/**
 * Инициализация функционала лайтбокса для фотографий в слайдере
 * с округлыми краями и нижними кнопками навигации
 */
export default function initSliderLightbox() {
	// Создаем элемент модального окна для увеличенного изображения
	const modal = document.createElement("div");
	modal.className = "designer-lightbox";
	modal.setAttribute("role", "dialog");
	modal.setAttribute("aria-modal", "true");
	modal.setAttribute("aria-label", "Предпросмотр изображения");
	modal.innerHTML = `
        <div class="designer-lightbox__content">
            <div class="designer-lightbox__img-container">
                <img class="designer-lightbox__img" src="" alt="Увеличенное изображение">
            </div>
            <div class="designer-lightbox__controls">
                <button class="designer-lightbox__prev" aria-label="Предыдущее изображение">Prev</button>
                <button class="designer-lightbox__next" aria-label="Следующее изображение">Next</button>
            </div>
        </div>
    `;
	document.body.appendChild(modal);

	// Получаем все слайды и необходимые элементы
	const slides = document.querySelectorAll(".designer__award__slider-photo__slide");
	const modalImg = modal.querySelector(".designer-lightbox__img");
	const prevBtn = modal.querySelector(".designer-lightbox__prev");
	const nextBtn = modal.querySelector(".designer-lightbox__next");

	let currentIndex = 0;
	let sourceElement = null;

	// Функция для получения изображения высокого разрешения из слайда
	// с приоритетом для версии @3x
	function getHighResImageFromSlide(slide) {
		const img = slide.querySelector("img");
		const sourceTags = slide.querySelectorAll("source");
		let imgSrc = "";

		// Проверяем наличие тегов source
		if (sourceTags.length > 0) {
			// Ищем сначала изображения 3x, затем 2x
			for (let sourceTag of sourceTags) {
				const srcSet = sourceTag.srcset;
				if (srcSet) {
					const srcSetItems = srcSet.split(",");

					// Сначала ищем 3x версию
					for (let item of srcSetItems) {
						const src = item.trim();
						if (src.includes("3x")) {
							// Извлекаем часть URL перед дескриптором
							imgSrc = src.split(" ")[0].trim();
							return imgSrc; // Сразу возвращаем, если нашли 3x
						}
					}

					// Если 3x не нашли, ищем 2x версию
					for (let item of srcSetItems) {
						const src = item.trim();
						if (src.includes("2x")) {
							// Извлекаем часть URL перед дескриптором
							imgSrc = src.split(" ")[0].trim();
							break;
						}
					}
				}

				// Если нашли 2x версию, используем её и прекращаем поиск
				if (imgSrc) break;
			}
		}

		// Используем обычный src изображения, если 3x или 2x не найдены
		if (!imgSrc && img && img.src) {
			imgSrc = img.src;
		}

		return imgSrc;
	}

	// Функция для расчета параметров анимации
	function calculateAnimationParams(sourceImg) {
		// Получаем размеры и координаты исходного изображения
		const sourceRect = sourceImg.getBoundingClientRect();

		// Получаем центр экрана
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		// Расчет смещения от центра экрана к позиции исходного изображения
		const translateX = sourceRect.left + sourceRect.width / 2 - viewportWidth / 2;
		const translateY = sourceRect.top + sourceRect.height / 2 - viewportHeight / 2;

		// Расчет масштаба для анимации
		// Соотношение размеров исходного изображения к целевому размеру
		const scaleX = sourceRect.width / (viewportWidth * 0.8);
		const scaleY = sourceRect.height / (viewportHeight * 0.8);
		const scale = Math.max(scaleX, scaleY, 0.2); // Минимальный масштаб 0.2

		return {
			x: translateX,
			y: translateY,
			scale: scale,
		};
	}

	// Функция для открытия модального окна с конкретным изображением
	function openModal(index, useAnimation = true) {
		if (index < 0 || index >= slides.length) return;

		currentIndex = index;
		const slide = slides[index];
		const imgSrc = getHighResImageFromSlide(slide);
		const img = slide.querySelector("img");

		if (!imgSrc) return;

		// Сохраняем исходный элемент для анимации
		sourceElement = img;

		// Устанавливаем источник изображения в модальном окне
		modalImg.src = imgSrc;
		modalImg.alt = img?.alt || "Изображение " + (index + 1);

		// Отображаем модальное окно
		modal.style.display = "block";

		if (useAnimation) {
			// Рассчитываем параметры анимации
			const animation = calculateAnimationParams(sourceElement);

			// Устанавливаем CSS-переменные для анимации
			modalImg.style.setProperty("--start-x", `${animation.x}px`);
			modalImg.style.setProperty("--start-y", `${animation.y}px`);
			modalImg.style.setProperty("--start-scale", animation.scale);

			// Добавляем класс для начальной позиции
			modalImg.classList.add("animate-in");

			// Применяем opacity к модальному окну
			requestAnimationFrame(() => {
				modal.classList.add("active");

				// Через небольшую задержку убираем класс для анимации в конечное положение
				setTimeout(() => {
					modalImg.classList.remove("animate-in");
				}, 50);
			});
		} else {
			// Без анимации просто показываем изображение
			modal.classList.add("active");
		}
	}

	// Функция для закрытия модального окна
	function closeModal() {
		if (!sourceElement) return;

		// Рассчитываем параметры анимации
		const animation = calculateAnimationParams(sourceElement);

		// Устанавливаем CSS-переменные для анимации закрытия
		modalImg.style.setProperty("--start-x", `${animation.x}px`);
		modalImg.style.setProperty("--start-y", `${animation.y}px`);
		modalImg.style.setProperty("--start-scale", animation.scale);

		// Добавляем класс для анимации закрытия
		modalImg.classList.add("animate-out");
		modal.classList.remove("active");

		// Ждем завершения перехода перед скрытием
		setTimeout(() => {
			modal.style.display = "none";
			modalImg.classList.remove("animate-out");
			sourceElement = null;
		}, 500);
	}

	// Функция для перехода к предыдущему изображению
	function prevImage() {
		let newIndex = currentIndex - 1;
		if (newIndex < 0) newIndex = slides.length - 1;
		openModal(newIndex, false); // Без анимации при навигации
	}

	// Функция для перехода к следующему изображению
	function nextImage() {
		let newIndex = currentIndex + 1;
		if (newIndex >= slides.length) newIndex = 0;
		openModal(newIndex, false); // Без анимации при навигации
	}

	// Добавляем обработчик события клика для каждого слайда
	slides.forEach((slide, index) => {
		slide.addEventListener("click", function () {
			openModal(index, true); // С анимацией при первоначальном клике
		});
	});

	// Обработчики событий для кнопок навигации
	prevBtn.addEventListener("click", function (e) {
		e.stopPropagation(); // Предотвращаем закрытие модального окна
		prevImage();
	});

	nextBtn.addEventListener("click", function (e) {
		e.stopPropagation(); // Предотвращаем закрытие модального окна
		nextImage();
	});

	// Закрытие при клике в любом месте модального окна или на самом изображении
	modal.addEventListener("click", closeModal);

	// Также закрываем при клике на изображение
	modalImg.addEventListener("click", function (e) {
		e.stopPropagation(); // Предотвращаем двойное срабатывание события
		closeModal();
	});

	// Навигация с клавиатуры
	document.addEventListener("keydown", function (event) {
		if (modal.style.display !== "block") return;

		switch (event.key) {
			case "Escape":
				closeModal();
				break;
			case "ArrowLeft":
				prevImage();
				break;
			case "ArrowRight":
				nextImage();
				break;
		}
	});
}
