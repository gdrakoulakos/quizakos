import confetti from "canvas-confetti";
import { useEffect, useState } from "react";

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

export const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  return isDesktop;
};
