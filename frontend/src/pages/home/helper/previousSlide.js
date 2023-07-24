export const previousSlide = (totalSlides, slide, setSlide) => {
    if (slide === 0) {
        setSlide(totalSlides - 1);
    } else {
        setSlide(slide - 1);
    }
};