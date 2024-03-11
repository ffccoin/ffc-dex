import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";

const LoadingPage = () => {
  const text = "LOADING - FORCE FINANCE";
  const characters = text.split("");

  const radius = 80;
  const fontSize = "18px";
  const letterSpacing = 15;

  const [scope, animate] = useAnimate();

  useEffect(() => {
    const animateLoader = async () => {
      const letterAnimation = [];
      characters.forEach((_, i) => {
        letterAnimation.push([
          `.letter-${i}`,
          { opacity: 0 },
          { duration: 0.3, at: i === 0 ? "+0.8" : "-0.28" },
        ]);
      });
      characters.forEach((_, i) => {
        letterAnimation.push([
          `.letter-${i}`,
          { opacity: 1 },
          { duration: 0.3, at: i === 0 ? "+0.8" : "-0.28" },
        ]);
      });
      animate(letterAnimation, {
        ease: "linear",
        repeat: Infinity,
      });
      animate(
        scope.current,
        { rotate: 360 },
        { duration: 4, ease: "linear", repeat: Infinity },
      );
    };
    animateLoader();
  }, []);
  return (
    <div className="fixed top-0 left-0 z-50 h-screen w-full flex items-center justify-center backdrop-blur-md">
      <motion.div ref={scope} className="circle" style={{ width: radius * 2 }}>
        <p aria-label={text} />
        <p aria-hidden="true" className="text">
          {characters.map((ch, i) => (
            <motion.span
              key={i}
              className={`letter letter-${i}`}
              style={{
                transformOrigin: `0 ${radius}px`,
                transform: `rotate(${i * letterSpacing}deg)`,
                fontSize,
              }}
            >
              {ch}
            </motion.span>
          ))}
        </p>
      </motion.div>
    </div>
  );
};

export default LoadingPage;
