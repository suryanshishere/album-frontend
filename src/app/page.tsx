"use client";

import React, { useState, useRef } from "react";
import {
  Box,
  IconButton,
  ImageList,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper as SwiperCore } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import IMAGES from "./images.json";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const swiperRef = useRef<SwiperCore | null>(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
    if (swiperRef.current) {
      if (isPlaying) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
    }
  };

  const goToPrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const goToNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <Box className="p-4 sm:p-8 grid h-screen grid-rows-[80vh_auto] gap-4">
      <Box className="h-full w-full relative overflow-hidden rounded">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="h-full w-full"
        >
          {IMAGES.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image.src}
                alt={image.title}
                className="h-full w-full object-cover rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Box className="flex items-center justify-center gap-2">
        <Box className="h-full max-w-[70rem] flex gap-2 items-center justify-center">
          <IconButton color="default" onClick={goToPrevSlide} size="large">
            <ArrowBackIosNewIcon />
          </IconButton>

          {!isMobile && (
            <ImageList
              cols={IMAGES.length}
              className="overflow-hidden h-full flex-1flex items-center"
            >
              {IMAGES.map((image, index) => {
                const isActive = index === currentIndex;
                return (
                  <img
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    src={image.src}
                    alt={image.title}
                    className={`object-cover overflow-hidden w-20 h-5/6 rounded-lg cursor-pointer transition-all duration-600 ease-in-out ${
                      isActive
                        ? "flex-[3_1_60%] scale-[1.05] shadow-lg"
                        : "flex-[1_1_20%] scale-[0.9] shadow-none"
                    }`}
                  />
                );
              })}
            </ImageList>
          )}
          <IconButton color="default" onClick={goToNextSlide} size="large">
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        <Box className="flex items-center justify-center gap-2">
          <IconButton onClick={togglePlayPause} color="default" size="large">
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>

          <Typography sx={{ fontSize: "1rem", color: "text.primary" }}>
            {currentIndex + 1}/{IMAGES.length}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
