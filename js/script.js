"use strict";

import glitch from "./modules/glitch.js";
import headerNav from "./modules/header.js";
import counter from "./modules/counter.js";
import designer from "./modules/designer.js";
import initSliderLightbox from "./modules/modal.js";
import creativeSpace from "./modules/creative-space.js";
import slider from "./modules/slider.js";
import sliderIframe from "./modules/sliderIframe.js";
import emojiSlider from "./modules/offer.js";
import areasWork from "./modules/areas-work.js";
import reviews from "./modules/reviews.js";
import guarantee from "./modules/guarantee.js";
import animation from "./modules/wow.js";
import download from "./modules/download.js";
import topProjects from "./modules/topProjects.js";

document.addEventListener("DOMContentLoaded", () => {
	glitch();
	headerNav();
	animation();
	download(".download__wrapper");
	topProjects(".project-card");
	counter(".user-trust__count");
	designer(".designer__award__play");
	initSliderLightbox();
	creativeSpace(".creative-space__container");
	slider(".move-it.slider");
	slider(".nfts.slider", { changeColor: true });
	sliderIframe();
	emojiSlider();
	areasWork(".see-more");
	reviews(".reviews__view-more");
	guarantee(".guarantee__item__hide-768px");
});
