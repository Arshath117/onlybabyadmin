import { useSpring, config } from '@react-spring/web';

const useProductAnimations = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.gentle,
  });

  const imageSpring = useSpring({
    from: { opacity: 0, transform: "scale(0.9)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: config.wobbly,
  });

  const buttonSpring = useSpring({
    from: { scale: 1 },
    to: async (next) => {
      while (true) {
        await next({ scale: 1.05 });
        await next({ scale: 1 });
      }
    },
    config: { tension: 300, friction: 10 },
  });

  return { fadeIn, imageSpring, buttonSpring };
};

export default useProductAnimations;