import { useEffect } from "react";
import confetti from "canvas-confetti";

export const useLaunchConfetti = () => {
  const launchConfetti = () => {
    confetti({
      particleCount: 1500, // Number of confetti particles
      spread: 1170, // Spread of the confetti
      origin: { y: 0.4 }, // Start position (y-axis)
      gravity: 0.6, // Lower gravity for slower fall (default is 1)
      ticks: 500, // Number of ticks (how long the confetti falls)
      scalar: 1, // Scale of particles
      shapes: ["square", "circle"], // You can specify shapes if you want
    });
  };

  launchConfetti();
};
