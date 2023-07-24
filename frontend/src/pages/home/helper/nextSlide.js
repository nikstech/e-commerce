export const nextSlide = (totalSlides, slide, setSlide) => {
    if (slide === (totalSlides - 1)) {
        setSlide(0);
    } else {
        setSlide(slide + 1);
    }
};