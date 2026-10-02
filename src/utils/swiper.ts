import type { Swiper } from "swiper";

export const restoreSlideOrder = (instance: Swiper) => {
  if (instance.params.loop || !instance.slides.some((slide) => slide.dataset.swiperSlideIndex))
    return;
  instance.params.loop = true;
  instance.loopDestroy();
  instance.params.loop = false;
};
