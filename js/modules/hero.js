function hero(wrapperSelector, layerSelector) {
	const wrapper = document.querySelector(wrapperSelector);
	const layers = document.querySelectorAll(layerSelector);

	if (!wrapper || !layers.length) {
		console.warn("Элементы для параллакса не найдены.");
		return;
	}

	let targetX = 0,
		targetY = 0,
		currentX = 0,
		currentY = 0;
	const settings = { sensitivity: 50, smoothness: 0.1, depthMultiplier: 5 };

	const animate = () => {
		currentX += (targetX - currentX) * settings.smoothness;
		currentY += (targetY - currentY) * settings.smoothness;
		layers.forEach((layer, index) => {
			const depth = (index + 1) * settings.depthMultiplier;
			layer.style.transform = `translate3d(${currentX * depth}px, ${currentY * depth}px, 0)`;
		});
		requestAnimationFrame(animate);
	};

	animate();

	wrapper.addEventListener("mousemove", (e) => {
		const rect = wrapper.getBoundingClientRect();
		targetX = (e.clientX - rect.left - rect.width / 2) / settings.sensitivity;
		targetY = (e.clientY - rect.top - rect.height / 2) / settings.sensitivity;
	});

	wrapper.addEventListener("mouseleave", () => {
		targetX = targetY = 0;
	});
}

export default hero;
