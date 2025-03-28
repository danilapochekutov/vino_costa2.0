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

        // Меняем картинку эмоджи в зависимости от значения
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

        // Отступы слева и справа
        const paddingOffset = 10;
        const leftOffset = leftValue.clientWidth + paddingOffset;
        const rightOffset = rightValueContainer.clientWidth + paddingOffset;
        const sliderWidth = sliderBlock.clientWidth;

        const availableWidth = sliderWidth - leftOffset - rightOffset - emojiContainer.clientWidth;

        const percentage = (sliderValue - min) / (max - min);
        const newPosition = leftOffset + (percentage * availableWidth);

        emojiContainer.style.transform = `translateX(${newPosition}px)`;
    }

    // Обновляем смайлик при изменении ползунка
    sliderInput.addEventListener("input", updateEmojiPosition);

    // Сразу устанавливаем смайлик при загрузке страницы
    updateEmojiPosition();
}

export default emojiSlider;
