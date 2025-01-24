"use client";

import React, { useState, useEffect, useRef } from "react";
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
import IMAGES from "./images.json";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const touchStartRef = useRef(0);

  const isMobile = useMediaQuery("(max-width:600px)");

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((curr) => curr - 1);
    }
  };

  const next = () => {
    if (currentIndex < IMAGES.length - 1) {
      setCurrentIndex((curr) => curr + 1);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (currentIndex < IMAGES.length - 1) {
          next();
        } else {
          setIsPlaying(false);
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentIndex]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const isLastImage = currentIndex === IMAGES.length - 1;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchEnd = e.touches[0].clientX;
    const diff = touchStartRef.current - touchEnd;
    if (diff > 50) {
      next();
    } else if (diff < -50) {
      prev();
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current = 0;
  };

  return (
    <>
      <Box
        className="fixed w-screen h-screen opacity-15"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${IMAGES[currentIndex].src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundBlendMode: "overlay",
        }}
      ></Box>

      <Box className="p-4 sm:p-8 grid h-screen grid-rows-[80vh_auto] gap-4">
        <Box
          className="h-full w-full flex items-center justify-center relative overflow-hidden rounded"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className=" flex transition-transform ease-out duration-500"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {IMAGES.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.title}
                className="h-full shadow z-20 object-contain"
                loading="lazy"
              />
            ))}
          </div>
        </Box>

        <Box className="w-full flex gap-2 items-center justify-center">
          <Box className="h-full flex gap-2 items-center justify-center p-1">
            <IconButton
              onClick={prev}
              color="default"
              disabled={currentIndex === 0}
              sx={{
                opacity: currentIndex === 0 ? 0.5 : 1,
              }}
              size="large"
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            {!isMobile && (
              <ImageList
                cols={IMAGES.length}
                className="overflow-hidden h-full flex-1 max-w-[70rem] flex items-center"
              >
                {IMAGES.map((image, index) => {
                  const isActive = index === currentIndex;
                  return (
                    <img
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      src={image.src}
                      alt={image.title}
                      className={`object-cover overflow-hidden  h-5/6 rounded-lg cursor-pointer transition-all duration-600 ease-in-out ${
                        isActive
                          ? "flex-[3_1_60%] scale-[1.05] shadow-lg"
                          : "flex-[1_1_20%] scale-[0.9] shadow-none"
                      }`}
                    />
                  );
                })}
              </ImageList>
            )}
            <IconButton
              onClick={next}
              color="default"
              disabled={currentIndex === IMAGES.length - 1}
              sx={{
                opacity: currentIndex === IMAGES.length - 1 ? 0.5 : 1,
              }}
              size="large"
            >
              <ArrowForwardIosIcon />
            </IconButton>
            <Typography sx={{ fontSize: "1rem", color: "text.primary" }}>
              {currentIndex + 1}/{IMAGES.length}
            </Typography>
          </Box>

          <Box className="flex items-center justify-between w-full">
            <Box className="ml-auto">
              <IconButton
                onClick={togglePlayPause}
                color="default"
                size="large"
                disabled={isLastImage}
              >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
