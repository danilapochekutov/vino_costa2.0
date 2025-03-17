function positionDownload(wrapper) {
    const downloadWrapper = document.querySelector(wrapper);
    const showThreshold = 400;

    function toggleVisibility() {
        const scrollY = window.scrollY;
        downloadWrapper.style.visibility = "visible";
        downloadWrapper.style.animationName = "";

        if (scrollY > showThreshold) {
            downloadWrapper.classList.add("visible");
        } else {
            downloadWrapper.classList.remove("visible");
        }
    }
    toggleVisibility();    
    // Отслеживаем скролл
    window.addEventListener("scroll", toggleVisibility);
}

export default positionDownload;
