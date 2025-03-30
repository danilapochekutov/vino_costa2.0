function emojiSlider() {
	const sliderInput = document.getElementById("sliderInput");
	const rightValue = document.getElementById("rightValue");
	const emojiImage = document.getElementById("emojiImage");
	const emojiContainer = document.querySelector(".offer__slider__emoji");
	const sliderBlock = document.querySelector(".offer__slider__values");

	const leftValue = document.querySelector(".offer__slider__value-left");
	const rightValueContainer = document.querySelector(".offer__slider__value-right");

	function updateEmojiPosition() {
		const min = parseInt(sliderInput.min);
		const max = parseInt(sliderInput.max);
		const sliderValue = parseInt(sliderInput.value);

		// Обновляем картинку эмоджи
		if (sliderValue >= 1000 && sliderValue < 2000) {
			emojiImage.src = "./icons/offer/1-2.svg";
		} else if (sliderValue >= 2000 && sliderValue < 5000) {
			emojiImage.src = "./icons/offer/2-5.svg";
		} else if (sliderValue >= 5000 && sliderValue < 7000) {
			emojiImage.src = "./icons/offer/5-7.svg";
		} else if (sliderValue >= 7000 && sliderValue <= 10000) {
			emojiImage.src = "./icons/offer/7-10.svg";
		}

		rightValue.textContent = sliderValue.toLocaleString("en-US");

		// Рассчитываем позиции
		const paddingOffset = 10;
		const leftOffset = leftValue.clientWidth + paddingOffset;
		const rightOffset = rightValueContainer.clientWidth + paddingOffset;

		let emojiPosition;

		const emojiWidth = emojiImage.clientWidth;
		const sliderWidth = sliderBlock.clientWidth - emojiImage.clientWidth;

		// Позиция ползунка в пикселях
		const sliderRatio = (sliderValue - min) / (max - min);
		const thumbPosition = leftOffset + sliderRatio * sliderWidth;

		// Если ползунок еще не дошел до текущей позиции смайлика — оставляем смайлик на месте
		if (thumbPosition < leftOffset + emojiWidth * 2) {
			emojiPosition = leftOffset; // начальная позиция (можно изменить)
		}
		// Иначе двигаем смайлик вместе с ползунком
		else {
			emojiPosition = thumbPosition - leftOffset;
			console.log("emojiPosition", emojiPosition);
		}

		// Ограничиваем, чтобы смайлик не выходил за пределы
		const maxEmojiPosition = sliderWidth - rightOffset;
		emojiPosition = Math.min(emojiPosition, maxEmojiPosition);

		emojiContainer.style.transform = `translateX(${emojiPosition}px)`;
	}

	sliderInput.addEventListener("input", updateEmojiPosition);
	updateEmojiPosition(); // Инициализация
}

export default emojiSlider;
