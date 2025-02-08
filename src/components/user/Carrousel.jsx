import React from "react";
import { Carousel, Typography, Button,IconButton } from "@material-tailwind/react";

export const Carrousel = () => {
    return (
       

            <Carousel
              className="rounded-xl"
              prevArrow={({ handlePrev }) => (
                <IconButton
                  variant="text"
                  color="white"
                  size="lg"
                  onClick={handlePrev}
                  className="!absolute top-2/4 left-4 -translate-y-2/4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </IconButton>
              )}
              nextArrow={({ handleNext }) => (
                <IconButton
                  variant="text"
                  color="white"
                  size="lg"
                  onClick={handleNext}
                  className="!absolute top-2/4 !right-4 -translate-y-2/4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </IconButton>
              )}
            >
              <img
                src="https://res.cloudinary.com/dvvacfrz3/image/upload/v1739012823/gillori_1920x_o9qtct.jpg"
                alt="image 1"
                className="h-75 w-full object-cover"
              />
              <img
                src="https://res.cloudinary.com/dvvacfrz3/image/upload/v1739012811/banner-home-alexinternational-WOMENS-CLOTHING_vxltmd.jpg"
                alt="image 2"
                className="h-75 w-full object-cover"
              />
              <img
                src="https://res.cloudinary.com/dvvacfrz3/image/upload/v1739012801/WDDDD_vuebpf.jpg"
                alt="image 3"
                className="h-75 w-full object-cover"
              />
               <img
                src="https://res.cloudinary.com/dvvacfrz3/image/upload/v1739012764/Refurbished_Mobile_Phones_1_ldklox.jpg"
                alt="image 4"
                className="h-75 w-full object-cover"
              />
            </Carousel>
          );
        }
  