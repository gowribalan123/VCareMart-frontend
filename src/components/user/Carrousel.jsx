import React from "react";
import { Carousel, Typography, Button } from "@material-tailwind/react";

export const Carrousel = () => {
    return (
        <div transition={{ duration: 2 }} className="carousel w-full ">
            <div id="slide1" className="carousel-item relative w-full">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                    alt="Slide 1"
                    className="w-full"
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide4" className="btn btn-circle" aria-label="Previous Slide">❮</a>
                    <a href="#slide2" className="btn btn-circle" aria-label="Next Slide">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                    alt="Slide 2"
                    className="w-full"
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide1" className="btn btn-circle" aria-label="Previous Slide">❮</a>
                    <a href="#slide3" className="btn btn-circle" aria-label="Next Slide">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                    alt="Slide 3"
                    className="w-full"
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide2" className="btn btn-circle" aria-label="Previous Slide">❮</a>
                    <a href="#slide4" className="btn btn-circle" aria-label="Next Slide">❯</a>
                </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
                    alt="Slide 4"
                    className="w-full"
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide3" className="btn btn-circle" aria-label="Previous Slide">❮</a>
                    <a href="#slide1" className="btn btn-circle" aria-label="Next Slide">❯</a>
                </div>
            </div>
        </div>
    );
};