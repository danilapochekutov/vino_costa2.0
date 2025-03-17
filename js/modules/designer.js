function designer(cardSelector) {
    const projectCards = document.querySelectorAll(cardSelector);
    const isRetina = window.devicePixelRatio > 1;

    projectCards.forEach(card => {
        const videos = card.querySelectorAll("video");
        if (!videos.length) return;

        videos.forEach(video => {
            let poster = video.getAttribute("poster");
            if (!poster) return;

            video.poster = isRetina 
                    ? poster.replace(".jpg", "@2x.jpg") 
                    : poster.replace(".jpg", "@1x.jpg");
            
        });
    });
}

export default designer;
