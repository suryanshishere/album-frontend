"use client";

import React, { useState, useEffect } from "react";
import { Box, IconButton, Paper, Slide } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import IMAGES from "./images.json";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("left");

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        handleNext();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
  };

  const handlePrev = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? IMAGES.length - 1 : prevIndex - 1
    );
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        height: "100vh",
        width: "100vw",
        bgcolor: "background.default",
        color: "text.primary",
        overflow: "hidden",
      }}
    >
      {IMAGES.map((image, index) => (
          <Slide
            key={image.src}
            direction={direction}
            in={index === currentIndex}
            timeout={{ enter: 500, exit: 300 }}
            mountOnEnter
            unmountOnExit
          >
              <Paper
                elevation={4}
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${image.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "opacity 0.5s ease",
                }}
              />
           </Slide>
        ))}

      <Box
        sx={{
          position: "absolute",
          bottom: "1rem",
          display: "flex",
          direction: "column",
          alignItems: "center",
          gap: 2,
          width: "30rem",
          bgcolor: "white",
          padding: 0.5,
          borderRadius: 4,
          boxShadow: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "4rem",
            transition: "transform 0.6s ease-in-out",
          }}
        >
          {IMAGES.map((image, index) => {
            const isActive = index === currentIndex;
            return (
              <Box
                key={index}
                sx={{
                  flex: isActive ? "3 1 60%" : "1 1 20%",
                  transition:
                    "flex 0.6s ease-in-out, transform 0.6s ease-in-out",
                  transform: isActive ? "scale(1.05)" : "scale(0.9)",
                  backgroundImage: `url(${image.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100%",
                  margin: "0 5px",
                  borderRadius: 4,
                  boxShadow: isActive ? "0 8px 16px rgba(0,0,0,0.2)" : "none",
                }}
              />
            );
          })}
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <IconButton
            onClick={handlePrev}
            color="default"
            disabled={IMAGES.length === 1}
            size="large"
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <IconButton onClick={togglePlayPause} color="default" size="large">
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <IconButton
            color="default"
            onClick={handleNext}
            disabled={IMAGES.length === 1}
            size="large"
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
